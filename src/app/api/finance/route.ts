import { FinanceAndTag, db, finance, financeTag, tag } from "@/database";
import { NextRequest, NextResponse } from "next/server";
import { addFinance, deleteFinanceTag } from "./finance.service";
import { eq, or, sql } from "drizzle-orm";

const ROWS = 25;
export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams;

    try {
        const page = Number(searchParams.get("page"));
        const tagsParams = searchParams.get("tags");
        const tags = tagsParams ? tagsParams.split(",") : [];
        const type = searchParams.get("type");
        const select = db
            .select({
                id: financeTag.financeId,
                label: finance.label,
                amount: finance.amount,
                type: finance.type,
                tags: sql<string>`GROUP_CONCAT(${tag.name})`,
            })
            .from(financeTag)
            .leftJoin(finance, eq(financeTag.financeId, finance.id))
            .leftJoin(tag, eq(financeTag.tagId, tag.id))
            .groupBy(financeTag.financeId);
        const count = select.all().length; //  count: sql<number>`COUNT(*)`
        let selectFinances = select;
        if (tags.length > 0) {
            selectFinances = select.where(
                or(...tags.map((name) => eq(tag.name, name)))
            );
        }
        if (type) selectFinances = selectFinances.where(eq(finance.type, type));

        const data = selectFinances
            .offset((page - 1) * ROWS)
            .limit(page * ROWS)
            .all();
        const finances = data.map((finance) => ({
            ...finance,
            tags: finance.tags.split(","),
        }));
        return NextResponse.json({
            finances,
            pageCounter: Math.ceil(count / ROWS),
        });
    } catch (error) {
        return NextResponse.json({
            finances: [],
            pageCounter: 0,
        });
    }
}

export async function POST(request: Request) {
    const currentFinance = (await request.json()) as FinanceAndTag;
    const financeAdded = db
        .insert(finance)
        .values({
            amount: currentFinance.amount,
            label: currentFinance.label,
            type: currentFinance.type,
        })
        .returning()
        .get();
    const newFinance: FinanceAndTag = { ...currentFinance, ...financeAdded };

    addFinance(newFinance);

    return NextResponse.json(newFinance);
}

export async function PUT(request: Request) {
    const currentFinance = (await request.json()) as FinanceAndTag;
    const financeUpdated = db
        .update(finance)
        .set({
            amount: currentFinance.amount,
            label: currentFinance.label,
            type: currentFinance.type,
        })
        .where(eq(finance.id, currentFinance.id))
        .returning()
        .get();
    // effacer d'abord tous les financetag du finances courant
    deleteFinanceTag(currentFinance.id);
    const newFinance: FinanceAndTag = { ...currentFinance, ...financeUpdated };
    // ajouter à nouveau les tag
    addFinance(newFinance);
    return NextResponse.json(newFinance);
}
