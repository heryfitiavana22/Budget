import { db, Tag } from "@/database";
import { Finances } from "@/features";

export default async function Page({}: PageProps) {
    const tags: Tag[] = db.query.tag.findMany();

    return <Finances optionsTag={tags} />;
}

type PageProps = {};
