import { PGlite } from "@electric-sql/pglite"
import env from "~~/shared/env"
import { drizzle } from "drizzle-orm/pglite"
import { migrate as migratePglite } from "drizzle-orm/pglite/migrator"

import * as schema from "../schema"

const client = new PGlite(env.DATABASE_URL)

export const db = drizzle({
  client,
  schema,
})

export async function migrate() {
  // eslint-disable-next-line no-console
  console.log("🟡 Migrating pglite...")
  try {
    await migratePglite(db, { migrationsFolder: "server/db/migrations" })
    // eslint-disable-next-line no-console
    console.log("🟢 Migration complete")
  }
  catch (error) {
    console.error(error)
  }
}
