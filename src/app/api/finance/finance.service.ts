import { FinanceAndTag, Tag, db, finance, financeTag, tag } from "@/database";
import { and, eq, or, sql } from "drizzle-orm";

// ON UPDATE no action ON DELETE no action
export const ROWS = 25;
export function getFinances({ page, tags, type }: GetFinances) {
    const select = db
        .select({
            id: finance.id,
            label: finance.label,
            amount: finance.amount,
            type: finance.type,
            tags: sql<string>`GROUP_CONCAT(${tag.name})`,
        })
        .from(finance)
        .fullJoin(financeTag, eq(financeTag.financeId, finance.id))
        .fullJoin(tag, eq(financeTag.tagId, tag.id))
        .groupBy(finance.id);

    const count = select.all().length; //  count: sql<number>`COUNT(*)`

    let selectFinances = select;
    if (type) selectFinances = select.where(eq(finance.type, type));
    if (tags.length > 0) {
        if (type)
            selectFinances = select.where(
                and(
                    eq(finance.type, type),
                    or(...tags.map((name) => eq(tag.name, name)))
                )
            );
        else
            selectFinances = select.where(
                or(...tags.map((name) => eq(tag.name, name)))
            );
    }
    if (page) {
        const p = Number(page);
        selectFinances = selectFinances.offset((p - 1) * ROWS).limit(p * ROWS);
    }
    const data = selectFinances.all();

    const finances = data.map((finance) => ({
        ...finance,
        tags: finance.tags ? finance.tags.split(",") : [],
    }));
    
    return { finances, count };
}

type GetFinances = {
    page: string | null;
    tags: string[];
    type: string | null;
};

export function addFinance(finance: FinanceAndTag) {
    const tags: Tag[] = db.query.tag.findMany();
    const tagsName = tags.map((tag) => tag.name);
    const tagsToAdded = finance.tags.filter((tag) => !tagsName.includes(tag));
    // add tag to database if there's new
    tagsToAdded.forEach((name) => {
        const tagAdded = db
            .insert(tag)
            .values({
                name,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
            })
            .returning()
            .get();
        tags.push(tagAdded);
    });
    const tagsOfFinance = tags.filter((tag) => finance.tags.includes(tag.name));
    // add financeTag to database
    if (tagsOfFinance.length > 0)
        tagsOfFinance.forEach((tag) => {
            const financeTagAdded = db
                .insert(financeTag)
                .values({ financeId: finance.id, tagId: tag.id })
                .returning()
                .get();
        });
    // else {
    //     const financeTagAdded = db
    //         .insert(financeTag)
    //         .values({ financeId: finance.id, tagId: null })
    //         .returning()
    //         .get();
    // }
    return finance;
}

export function deleteFinanceTag(idFinance: number) {
    db.delete(financeTag)
        .where(eq(financeTag.financeId, idFinance))
        .returning()
        .get();
}
