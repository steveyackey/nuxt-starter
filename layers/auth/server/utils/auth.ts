import { betterAuth } from "better-auth"
import { drizzleAdapter } from "better-auth/adapters/drizzle"
import { openAPI } from "better-auth/plugins"

import env from "../../../../shared/env"
import { useDb } from "../../../data/server/db/index"

const devOnlyPlugins = env.NODE_ENV === "development" ? [openAPI()] : []

export const auth = betterAuth({
  database: drizzleAdapter(useDb(), {
    provider: "pg", // or "mysql", "sqlite"
  }),
  plugins: [
    ...devOnlyPlugins,
  ],
  socialProviders: {
    github: {
      clientId: env.AUTH_GITHUB_CLIENT_ID,
      clientSecret: env.AUTH_GITHUB_CLIENT_SECRET,
    },
  },
})
