import { drizzle } from "drizzle-orm/node-postgres"
import { Pool } from "pg"

import env from "../../../../../shared/env"
import * as schema from "../schema/index"

const pool = new Pool({
  connectionString: env.DATABASE_URL,
})

export const useDb = () => drizzle({ client: pool, schema })
