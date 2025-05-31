import type { PGlite } from "@electric-sql/pglite"
import type { NodePgDatabase } from "drizzle-orm/node-postgres"
import type { PgliteDatabase } from "drizzle-orm/pglite"
import type { Pool } from "pg"

import type * as schema from "./schema/index"

import env from "../../../../shared/env"
import { db as pgDb } from "./drivers/pg"

let db: (PgliteDatabase<typeof schema> & { $client: PGlite }) | (NodePgDatabase<typeof schema> & { $client: Pool })

async function setup() {
  // eslint-disable-next-line no-console
  console.log("🐘 Running database setup for:", env.NODE_ENV)
  // if (db) return db;

  // For local and testing, we use PgLite for easy local WASM'd postgres. We load it async, so it's removed during production build.
  if (env.DATABASE_USE_PGLITE) {
    const { db: pgliteDb, migrate: migratePglite } = await import("./drivers/pglite")
    db = pgliteDb
    await migratePglite()
  }
  else {
    db = pgDb
  }
  return db
}

export function useDb() {
  if (!db) {
    setup().then(() => {
      // eslint-disable-next-line no-console
      console.log("✅ Database setup complete.")
    })
  }
  return db
}
