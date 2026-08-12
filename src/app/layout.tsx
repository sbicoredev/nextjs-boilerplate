import type { Metadata } from "next";

import { Providers } from "~/components/providers";
import { constructMetadata } from "~/lib/construct-metadata";

import "../styles/globals.css";

export const metadata: Metadata = constructMetadata({});

/**
 * Intentionally does NOT read `cookies()`/`headers()` or fetch the session.
 *
 * Reading request data (cookies/headers) in the root layout opts the ENTIRE
 * app out of static rendering, because Next.js determines a route's
 * static/dynamic status from its whole layout tree. Session- and
 * theme-cookie-dependent data now lives in the route-group layouts that
 * actually need it:
 *   - `(dashboard)/dashboard/layout.tsx` — real, DB-verified session check,
 *     already dynamic because it's an authenticated area.
 *   - `(site)` / `(auth)` — auth-aware UI (Header/Nav) reads the session
 *     client-side via `authClient.useSession()` instead, so these routes
 *     stay eligible for static rendering / ISR.
 *
 * `<Providers>` only sets up client-side context (TanStack Query, tooltips,
 * toasts) — it does not read any request data.
 */
export default function RootLayout({ children }: React.PropsWithChildren) {
  return <Providers>{children}</Providers>;
}
