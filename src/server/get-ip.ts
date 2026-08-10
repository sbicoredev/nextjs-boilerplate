import "server-only";

import { headers } from "next/headers";

/**
 * Single source of truth for client-IP resolution, used by both
 * `proxy.ts` (middleware, has a `NextRequest` with header access) and the
 * Server Action rate-limit middleware (`server/actions/middleware/rate-limit.ts`,
 * only has `next/headers`). Previously these had two separate, slightly
 * different implementations that could disagree for the same request.
 *
 * `trustedIp` is `request.ip`, set by a trusted upstream proxy (Vercel,
 * Cloudflare, etc.) on platforms that provide it — pass it when available,
 * since `x-forwarded-for` alone can be spoofed by the client when there's
 * no trusted proxy in front of the app.
 */
export function resolveIp(requestHeaders: Headers, trustedIp?: string): string {
  const forwardedFor = requestHeaders
    .get("x-forwarded-for")
    ?.split(",")[0]
    ?.trim();
  return trustedIp || forwardedFor || "anonymous";
}

/** Convenience wrapper for call sites (e.g. Server Actions) that don't have
 * a `NextRequest`/`trustedIp` handy and only need the header-based signal. */
export async function getIP(): Promise<string> {
  return resolveIp(await headers());
}
