# Next.js Boilerplate

Production-ready Next.js 16 starter with better-auth, Drizzle ORM,
next-safe-action, Tailwind CSS 4, shadcn/ui, Vitest, and Docker.

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 16 (App Router, RSC) |
| Language | TypeScript 6 (strict) |
| Auth | better-auth (email + Google OAuth) |
| Database | PostgreSQL + Drizzle ORM |
| Validation | Zod 4 |
| Server Actions | next-safe-action (middleware chain) |
| Styling | Tailwind CSS 4 + shadcn/ui |
| State | Zustand + TanStack Query |
| Rate Limiting | Upstash Redis |
| Email | Nodemailer |
| Lint | Biome + Ultracite |
| Testing | Vitest + Testing Library |
| Dev Infra | Docker Compose (PG 18 + Mailpit) |

## Quick Start

```bash
cp .env.example .env        # fill in values
docker compose up -d        # postgres + mailpit
pnpm install
pnpm db:push                # create tables
pnpm db:seed                # admin@example.com / Admin123!
pnpm dev                    # http://localhost:3000
```

## Scripts

| Command | Description |
|---------|-------------|
| `pnpm dev` | Dev server (Turbopack) |
| `pnpm build` | Production build |
| `pnpm start` | Production server |
| `pnpm lint` | Lint check |
| `pnpm lint:fix` | Auto-fix lint |
| `pnpm typecheck` | tsc --noEmit |
| `pnpm test` | Vitest run |
| `pnpm test:watch` | Vitest watch |
| `pnpm test:coverage` | Vitest + coverage |
| `pnpm db:generate` | Drizzle migrations |
| `pnpm db:migrate` | Run migrations |
| `pnpm db:push` | Push schema (dev) |
| `pnpm db:studio` | Drizzle Studio |
| `pnpm db:seed` | Seed database |
| `pnpm docker:build` | Build Docker image |
| `pnpm docker:run` | Run Docker container |

## Project Structure

```
src/
  app/              Routing (thin layer)
  features/         Business logic (auth, dashboard, settings, theme)
  components/       Shared UI (shadcn + layout)
  lib/              Infrastructure (safe-action, rate-limit, error-reporter)
  lib/utils/        Focused utilities (date, string, timing, format, cookie, form)
  db/               Drizzle schemas, client, seed
  configs/          App configuration
  constants/        App-wide constants
  contexts/         React contexts (auth, theme)
  hooks/            Shared hooks
  store/            Zustand stores
  env.ts            Validated env vars (@t3-oss/env-nextjs)
  middleware.ts     Edge middleware (rate-limit + auth guard)
  types.ts          Shared types (explicit exports)
```

## Architecture

### Server Action Middleware Chain

```
baseActionClient       -> logging + error handling
  authActionClient     -> + per-user rate limiting
    adminActionClient  -> + admin role check
```

### Adding a New Feature

1. Create `src/features/<name>/` with `actions/`, `components/`, `hooks/`, `services/`
2. Define Zod schemas in `schemas.ts`
3. Use `authActionClient` from `@/lib/safe-action`
4. Add routes under `src/app/`

## Docker (Production)

```bash
docker build -t nextjs-boilerplate .
docker run -p 3000:3000 --env-file .env nextjs-boilerplate
```

Multi-stage build, non-root user, healthcheck, standalone output.

## CI/CD

Every push/PR runs: lint -> typecheck -> test -> build.
See `.github/workflows/ci.yml`.

## Security

- [x] Security headers (HSTS, X-Frame-Options, nosniff, Permissions-Policy)
- [x] poweredByHeader: false
- [x] Non-root Docker user
- [x] .env excluded from image and git
- [x] Rate limiting (edge + server actions)
- [x] Zod validation on all server actions
- [x] scrypt password hashing
- [ ] CSP header (tailor per-project)
- [ ] Sentry / error tracking (add per-project)

## License

MIT
