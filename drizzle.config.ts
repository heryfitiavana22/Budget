import type { Config } from "drizzle-kit";

export default {
  schema: "./src/database/schema/*",
  out: "./drizzle",
  driver: "better-sqlite",
  dbCredentials: {
    url: "./database.db",
  },
} satisfies Config;
