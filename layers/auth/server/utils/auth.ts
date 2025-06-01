import { betterAuth } from "better-auth"
import { drizzleAdapter } from "better-auth/adapters/drizzle"
import { openAPI } from "better-auth/plugins"

// Using relative paths so that `pnpm auth:generate` works, as it doesn't read our tsconfig.
import { db } from "../../../../layers/data/server/db/index"
import env from "../../../../shared/env"

const devOnlyPlugins = env.NODE_ENV === "development" ? [openAPI()] : []

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg",
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
