# Nuxt 3 Starter

```bash
pnpm dlx giget@latest gh:steveyackey/nuxt-starter <repoName>
```

## Overview

- [x] env and eslint based on rules by [@w3cj](https://gist.github.com/w3cj/3d331e23c17df1dbeaa55342f230f3ee)
- [x] sets up husky with lint-staged to run `pnpm lint` on commit
- [x] Better-Auth and auth store w/pinia
- [x] Drizzle
- [x] Nuxt UI Pro
- [x] Layers + Shared

## Setup

Make sure to install the dependencies:

```bash
# pnpm
pnpm install
```

## Development Server

Start the development server on `http://localhost:3000`:

```bash
# pnpm
docker compose up -d
pnpm run dev
```

## Production

Build the application for production:

```bash
# pnpm
pnpm run build
```

Locally preview production build:

```bash
# pnpm
pnpm run preview
```

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.
