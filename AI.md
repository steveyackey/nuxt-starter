# AI Development Rules for Nuxt 4 Starter Project

## Project Architecture Overview

This project follows Nuxt 4 conventions using a **layer-based architecture** with no top-level `app/` or `server/` directories. All application code is organized into specialized layers and shared utilities.

## Directory Structure Rules

### Root Level Structure

```
├── layers/           # All application layers
├── shared/          # Shared utilities and environment config
├── public/          # Static assets
├── nuxt.config.ts   # Main Nuxt configuration
├── package.json     # Dependencies and scripts
└── tsconfig.json    # TypeScript configuration
```

### Layer Organization

#### 1. Base Layer (`layers/base/`)

- **Purpose**: Core UI components, layouts, pages, and styling
- **Contains**:
  - `app/app.vue` - Root Vue component
  - `app/layouts/` - Application layouts
  - `app/pages/` - Application pages/routes
  - `app/assets/css/` - Global styles and Tailwind imports
  - `app/app.config.ts` - App configuration (title, UI colors, etc.)
  - `nuxt.config.ts` - Base layer configuration

#### 2. Auth Layer (`layers/auth/`)

- **Purpose**: Authentication logic and stores
- **Contains**:
  - `app/stores/auth.ts` - Pinia store for authentication state
  - `server/api/auth/[...all].ts` - Better-Auth API handler
  - `server/utils/auth.ts` - Better-Auth configuration
  - `nuxt.config.ts` - Auth layer configuration

#### 3. Data Layer (`layers/data/`)

- **Purpose**: Database configuration, schemas, and migrations
- **Contains**:
  - `server/db/` - Database drivers, schemas, and migrations
  - `server/db/drivers/pg.ts` - PostgreSQL driver configuration
  - `server/db/schema/` - Drizzle ORM schemas
  - `drizzle.config.ts` - Drizzle Kit configuration
  - `nuxt.config.ts` - Data layer configuration

### Shared Directory (`shared/`)

- **Purpose**: Cross-layer utilities and environment configuration
- **Contains**:
  - `env.ts` - Environment variable validation with Zod
  - `try-parse-env.ts` - Environment parsing utility

## Development Rules

### 1. Vertical Slice Architecture with Layers

- **Features should be organized as vertical slices using dedicated layers**
- Each feature gets its own layer: `layers/feature-name/`
- Features should be self-contained with their own components, pages, stores, and server logic
- Example feature structure:

```
layers/feature-name/
├── app/
│   ├── components/feature-name/    # Feature-specific components
│   ├── pages/feature-name/         # Feature-specific pages
│   └── stores/feature-name.ts      # Feature-specific Pinia store
├── server/
│   ├── api/feature-name/           # API endpoints
│   └── feature-name/               # Services, repositories, business logic
│       ├── services/
│       ├── repositories/
│       └── types/
└── nuxt.config.ts                  # Feature layer configuration
```

### 2. Layer Isolation and Organization

- Each layer should have its own `nuxt.config.ts`
- Layers should be self-contained with minimal cross-dependencies
- Use the `~~/layers/` prefix when importing across layers
- **Stores should live in the layer they represent** (not in a shared stores directory)
- **Components specific to a feature should live in that feature's layer**
- **Pages specific to a feature should live in that feature's layer**

### 3. Environment Management

- All environment variables must be defined in `shared/env.ts` with Zod validation
- Import environment config at the top of root `nuxt.config.ts`
- Use `tryParseEnv()` utility for validation with clear error messages

### 4. Database Patterns

- Use Drizzle ORM for database operations
- Database schemas go in `layers/data/server/db/schema/`
- Export all schemas from `layers/data/server/db/schema/index.ts`
- Database drivers are in `layers/data/server/db/drivers/`
- Use `useDb()` function to get database instance

### 5. Feature Layer Server Organization

- **Server logic should be organized for maximum testability**
- Create a dedicated folder in `server/` matching the feature name
- Structure: `layers/feature-name/server/feature-name/`
- Include subdirectories for:
  - `services/` - Business logic and external integrations
  - `repositories/` - Data access layer abstractions
  - `types/` - Feature-specific TypeScript types
  - `utils/` - Feature-specific utilities
- API endpoints in `server/api/feature-name/` should be thin and delegate to services
- This structure enables easy unit testing of business logic separate from API routes

### 6. Authentication Patterns

- Use Better-Auth for authentication
- Auth configuration in `layers/auth/server/utils/auth.ts`
- Auth state management via Pinia store in `layers/auth/app/stores/auth.ts`
- API routes handled by `layers/auth/server/api/auth/[...all].ts`

#### Server-side Authentication Utility

- Use the `requireAuth` utility to enforce authentication on server API endpoints.
- Location: `layers/auth/server/auth/utils/require-auth.ts`
- Usage: Import and call `requireAuth(event)` in any server API handler to require a valid session. If the user is not authenticated, a 401 Unauthorized error is thrown.
- Example:

```ts
import { requireAuth } from "~~/layers/auth/server/auth/utils/require-auth"

export default defineEventHandler(async (event) => {
  const session = await requireAuth(event)
  // ...protected logic...
  return { user: session.user }
})
```

- When to use: Any server API route that should only be accessible to authenticated users.

#### App Middleware for Client-side Route Protection

- Use Nuxt route middleware to protect client-side routes based on authentication state.
- Example middleware location: `layers/auth/app/middleware/auth.global.ts`
- Usage: Use the `authClient.useSession` composable to check session state and redirect if not authenticated.
- Example:

```ts
import { authClient } from "~/lib/auth-client"
export default defineNuxtRouteMiddleware(async (to, from) => {
  const { data: session } = await authClient.useSession(useFetch)
  if (!session.value) {
    if (to.path === "/dashboard") {
      return navigateTo("/")
    }
  }
})
```

- When to use: Any page or route that should only be accessible to authenticated users on the client side.

### 7. Styling and UI

- Use Nuxt UI Pro for components
- Global styles in `layers/base/app/assets/css/main.css`
- Import Tailwind and Nuxt UI Pro in CSS
- Configure UI colors in `layers/base/app/app.config.ts`

### 8. Package Management

- Use pnpm as package manager
- Database scripts target layer-specific configs
- Auth generation script outputs to data layer schema

### 9. Code Quality

- ESLint configuration extends @antfu/eslint-config
- Husky + lint-staged for pre-commit linting
- TypeScript strict mode enabled
- No top-level process.env access (use shared/env.ts)

### 10. File Naming Conventions

- Use kebab-case for file names
- Layer configs always named `nuxt.config.ts`
- Database schemas use descriptive names (e.g., `auth.ts`)
- API routes follow Nuxt conventions

### 11. Import Patterns

- Use `~~/layers/` prefix for cross-layer imports
- Relative imports within same layer
- Import from `shared/` for environment and utilities
- Auto-imports enabled for Nuxt composables

### 12. Configuration Management

- Main config in root `nuxt.config.ts` with global modules
- Layer-specific configs for layer-specific modules
- Compatibility version set to 4 in all configs
- Development tools enabled in all environments

## Scripts and Commands

### Database Operations

```bash
pnpm db:generate  # Generate migrations
pnpm db:migrate   # Run migrations
pnpm db:push      # Push schema changes
pnpm db:studio    # Open Drizzle Studio
```

### Authentication

```bash
pnpm auth:generate  # Generate auth schema
```

### Development

```bash
pnpm dev           # Start development server
pnpm build         # Build for production
pnpm lint          # Run ESLint
pnpm lint:fix      # Fix ESLint issues
```

## Key Dependencies

- **Nuxt**: ^3.17.4 (with v4 compatibility)
- **Better-Auth**: ^1.2.8 (authentication)
- **Drizzle ORM**: ^0.44.1 (database)
- **Nuxt UI Pro**: ^3.1.3 (UI components)
- **Pinia**: ^3.0.2 (state management)
- **Zod**: ^3.25.32 (validation)

## Important Notes

- No top-level `app/` or `server/` directories
- All application code lives in layers
- Environment variables are strictly validated
- Database and auth are separate concerns in different layers
- Cross-layer communication should be minimal and explicit
