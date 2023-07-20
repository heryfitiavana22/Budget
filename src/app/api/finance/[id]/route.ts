import { Finance, db, finance } from "@/database";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";
import { deleteFinanceTag } from "../finance";

export async function DELETE(request: Request, { params }: Params) {
    let financeDeleted: Finance | undefined;
    db.transaction((tx) => {
        // delete finance in financeTag
        deleteFinanceTag(Number(params.id));
        // delete finance
        financeDeleted = tx
            .delete(finance)
            .where(eq(finance.id, Number(params.id)))
            .returning()
            .get();
    });

    return NextResponse.json(financeDeleted);
}

type Params = {
    params: { id: string };
};
