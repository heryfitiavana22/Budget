import { FinanceAndTag, db, finance } from "@/database";
import { NextRequest, NextResponse } from "next/server";
import { ROWS, addFinance, deleteFinanceTag, getFinances } from "./finance.service";
import { eq } from "drizzle-orm";

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams;

    try {
        const page = searchParams.get("page");
        const tagsParams = searchParams.get("tags");
        const tags = tagsParams ? tagsParams.split(",") : [];
        const type = searchParams.get("type");

        const { finances, count } = getFinances({ page, tags, type });

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
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
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
            updatedAt: new Date().toISOString(),
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
