import { FinanceAndTag, Tag, db, financeTag, tag } from "@/database";

export function addFinance(finance: FinanceAndTag) {
    const tags: Tag[] = db.query.tag.findMany();
    const tagsName = tags.map((tag) => tag.name);
    const tagsToAdded = finance.tags.filter((tag) => !tagsName.includes(tag));
    // add tag to database if there's new
    tagsToAdded.forEach((name) => {
        const tagAdded = db.insert(tag).values({ name }).returning().get();
        tags.push(tagAdded);
    });
    const tagsOfFinance = tags.filter((tag) => finance.tags.includes(tag.name));
    // add financeTag to database
    tagsOfFinance.forEach((tag) => {
        const financeTagAdded = db
            .insert(financeTag)
            .values({ financeId: finance.id, tagId: tag.id })
            .returning()
            .get();
    });
    return finance;
}
