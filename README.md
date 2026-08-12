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
| Rate Limiting | Upstash Redis or self-hosted Redis (swappable, see `RATE_LIMIT_BACKEND`) |
| Email | Nodemailer |
| Lint | Biome + Ultracite |
| Testing | Vitest + Testing Library |
| Dev Infra | Docker Compose (PG 18 + Mailpit) |

## Quick Start

```bash
cp .env.example .env        # fill in values
docker compose up -d        # postgres + mailpit (+ redis, if RATE_LIMIT_BACKEND=redis)
pnpm install
pnpm db:push                # create tables
pnpm dev                    # http://localhost:3000 — leave this running
```

In another terminal, once the dev server is up:

```bash
pnpm db:seed                # admin@example.com / Admin123!
```

`db:seed` signs up through the real `/api/auth/sign-up/email` endpoint
(better-auth's cookie plugin needs an actual request context), so the dev
server has to already be running — see `scripts/seed.ts`.

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
  app/                  Routing only (thin — pages/layouts call into features/server)
  features/
    auth/                 sign-in, sign-up, session
    settings/             account/security settings
    projects/             reference feature — the ownership/repository
                          pattern, see features/projects/README.md
  server/
    actions/client.ts     next-safe-action client hierarchy
    auth/                 better-auth instance, session helpers
    db/                   Drizzle client + schema aggregator
    rate-limit/           swappable Upstash/self-hosted-Redis rate limiter
    email/                 nodemailer + react-email templates
  shared/
    components/           shadcn/ui primitives + shared layout components
    env/                   validated env vars (@t3-oss/env-nextjs)
    contexts/               React contexts (dashboard-only AuthContext)
    hooks/ lib/ stores/ utils/
  proxy.ts                 Next.js middleware (rate limit + optimistic
                          auth redirect — never the real security gate,
                          see features/auth/server for that)
migrations/                Drizzle SQL migrations
scripts/seed.ts             Creates the admin@example.com account
```

## Architecture

### Server Action client hierarchy (`src/server/actions/client.ts`)

```
publicAction                    -> logging + error handling (base)
  rateLimitedPublicAction       -> + general IP rate limit
  authRoutesActionClient        -> + stricter auth-route rate limit
  authenticatedAction           -> + requires a valid session
    rateLimitedAuthenticatedAction -> + per-user rate limit
    adminAction                 -> + requires role === "admin"
```

Errors: throw a better-auth `APIError`, or `ActionError` (`src/server/actions/action-error.ts`)
for anything else you want shown to the user verbatim (not found, forbidden,
etc). Any other thrown error is masked to a generic message and reported —
see the comment in `action-error.ts` for why that distinction exists.

### Adding a new feature

Use `src/features/projects/` as the template — it demonstrates the full
pattern end-to-end (schema → repository → service → action → UI), including
the ownership check that keeps one user from touching another's data.

1. `src/features/<name>/server/db-schema.ts` — table, with an indexed FK
   back to `user` if it's user-owned.
2. `src/features/<name>/server/repository.ts` — queries, each taking the
   scoping id (`userId`, later `organizationId`) as an explicit parameter.
3. `src/features/<name>/server/<name>-service.ts` — business logic, calls
   the repository.
4. `src/features/<name>/schemas.ts` — Zod schemas, no `userId` field (it
   comes from `ctx.user.id`, never from client input).
5. `src/features/<name>/actions/<name>-action.ts` — `next-safe-action`
   actions using `authenticatedAction` / `rateLimitedAuthenticatedAction`.
6. Server Components read via the service directly; only mutations go
   through actions (see `(dashboard)/dashboard/projects/page.tsx`).

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
- [x] Non-root Docker user + container healthcheck (`/api/health`)
- [x] .env excluded from image and git
- [x] Rate limiting (edge + server actions), swappable Upstash/self-hosted Redis backend
- [x] Zod validation on all server actions
- [x] scrypt password hashing (via better-auth)
- [ ] CSP header (tailor per-project)

## License

MIT
