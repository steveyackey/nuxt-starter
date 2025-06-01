import { defineConfig } from "drizzle-kit"
import "dotenv/config"

import env from "../../shared/env"

export default defineConfig({
  out: "./layers/data/server/db/migrations",
  schema: "./layers/data/server/db/schema/index.ts",
  dialect: "postgresql",
  dbCredentials: {
    url: env.DATABASE_URL,
  },
})
