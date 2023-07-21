import { InferModel, relations } from "drizzle-orm";
import { integer, text, sqliteTable } from "drizzle-orm/sqlite-core";

export const users = sqliteTable("users", {
    id: integer("id").primaryKey({ autoIncrement: true }),
    name: text("full_name"),
});

export const finance = sqliteTable("finances", {
    id: integer("id").primaryKey({ autoIncrement: true }),
    label: text("label").notNull(),
    amount: integer("amount").notNull(),
    type: text("type").notNull(),
});
export type NewFinance = InferModel<typeof finance, "insert">;
export type Finance = InferModel<typeof finance>;
export type FinanceAndTag = Finance & {
    tags: string[];
};

export const financeRelations = relations(finance, ({ many }) => ({
    financeTag: many(financeTag),
}));

export const tag = sqliteTable("tags", {
    id: integer("id").primaryKey({ autoIncrement: true }),
    name: text("name").notNull(),
});
export type Tag = InferModel<typeof tag>;

export const tagRelations = relations(tag, ({ many }) => ({
    financeTag: many(financeTag),
}));

// table intermediaire finance_tag
export const financeTag = sqliteTable("finance_tag", {
    financeId: integer("financeId")
        .notNull()
        .references(() => finance.id),
    tagId: integer("tagId")
        .notNull()
        .references(() => tag.id),
});

export const financeTagRelations = relations(financeTag, ({ one }) => ({
    finance: one(finance, {
        fields: [financeTag.financeId],
        references: [finance.id],
    }),
    tag: one(tag, {
        fields: [financeTag.tagId],
        references: [tag.id],
    }),
}));
export type FinanceTag = InferModel<typeof financeTag> & {
    finance: Finance;
    tag: Tag;
};
