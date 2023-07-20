import { drizzle } from "drizzle-orm/better-sqlite3";
import { migrate } from "drizzle-orm/better-sqlite3/migrator";
import Database from "better-sqlite3";
import * as schema from "./schema";

const sqlite = new Database("database.db");

export const db = drizzle(sqlite, { schema });
migrate(db, { migrationsFolder: "drizzle" });

let isInserted = false;
export function fntest() {
    if (isInserted) return console.log("déjà insertred");
    // console.log(
    //     db
    //         .insert(schema.finance)
    //         .values({ amount: 1000, label: "crédit" })
    //         .returning()
    //         .get()
    // );
    // console.log(
    //     db
    //         .insert(schema.financeTag)
    //         .values({
    //             financeId: 1,
    //             tagId: 1,
    //         })
    //         .returning()
    //         .get()
    // );
    console.log(db.select().from(schema.financeTag));
    

    console.log("inserted");
    isInserted = true
}
