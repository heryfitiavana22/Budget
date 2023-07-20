import { FinanceAndTag, db, finance, financeTag, tag } from "@/database";
import { NextRequest, NextResponse } from "next/server";
import { addFinance, deleteFinanceTag } from "./finance";
import { eq, sql } from "drizzle-orm";

const ROWS = 2;
export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams;
    try {
        const page = Number(searchParams.get("page"));
        const data = db
            .select({
                id: financeTag.financeId,
                label: finance.label,
                amount: finance.amount,
                tags: sql<string>`GROUP_CONCAT(${tag.name})`,
                // count: sql<number>`COUNT(*)`
            })
            .from(financeTag)
            .leftJoin(finance, eq(financeTag.financeId, finance.id))
            .leftJoin(tag, eq(financeTag.tagId, tag.id))
            .groupBy(financeTag.financeId)
            .offset((page - 1) * ROWS)
            .limit(page * ROWS)
            .all();
        const finances = data.map((finance) => ({
            ...finance,
            tags: finance.tags.split(","),
        }));
        console.log("finances");
        console.log(finances);
        
        return NextResponse.json(finances);
    } catch (error) {
        return NextResponse.json([]);
    }
}

export async function POST(request: Request) {
    const currentFinance = (await request.json()) as FinanceAndTag;
    const financeAdded = db
        .insert(finance)
        .values({
            amount: currentFinance.amount,
            label: currentFinance.label,
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
        .set({ amount: currentFinance.amount, label: currentFinance.label })
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
