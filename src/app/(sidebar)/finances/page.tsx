import { db, FinanceTag, Tag } from "@/database";
import { Finances } from "@/features";
import { groupByFinance } from "./finance.helper";

export default async function Page({}: PageProps) {
    const finances: FinanceTag[] = db.query.financeTag.findMany({
        with: {
            finance: true,
            tag: true,
        },
    });
    const tags: Tag[] = db.query.tag.findMany();

    return <Finances finances={groupByFinance(finances)} optionsTag={tags} />;
}

type PageProps = {};
