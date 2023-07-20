import { FinanceAndTag, db, finance } from "@/database";
import { NextResponse } from "next/server";
import { addFinance } from "./finance";

export async function GET(request: Request) {
    return NextResponse.json({ ok: true });
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

    return NextResponse.json({ ok: true });
}
