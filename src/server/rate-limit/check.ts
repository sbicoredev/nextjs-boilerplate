import "server-only";

import { reportError } from "~/lib/error-reporter";

import type { RateLimiter, RateLimitResult } from "./client";

/**
 * Single, documented fail-mode for every rate-limited surface in the app
 * (public middleware in `proxy.ts` and the Server Action rate-limit
 * middleware). Previously these disagreed: `proxy.ts` failed closed (503)
 * if the Redis/Upstash call threw, but the action middleware had no
 * try/catch at all and would surface a raw, unhandled error instead.
 *
 * Policy: fail CLOSED. A rate-limit backend outage is rare and short; the
 * risk of unmetered abuse (credential stuffing on auth routes, scraping on
 * general routes) during that window outweighs the availability cost of a
 * brief 429/503 for legitimate users. If your project would rather fail
 * open, change `FAIL_MODE` here — it's the one place this decision lives.
 */
const FAIL_MODE: "open" | "closed" = "closed";

export type RateLimitOutcome =
  | { ok: true; result: RateLimitResult }
  | { ok: false; reason: "rate_limited"; result: RateLimitResult }
  | { ok: false; reason: "backend_unavailable" };

export async function checkRateLimit(
  limiter: RateLimiter,
  identifier: string
): Promise<RateLimitOutcome> {
  try {
    const result = await limiter.limit(identifier);
    if (!result.success) {
      return { ok: false, reason: "rate_limited", result };
    }
    return { ok: true, result };
  } catch (error) {
    reportError(error, { scope: "rate-limit", identifier });
    if (FAIL_MODE === "open") {
      return {
        ok: true,
        result: { success: true, limit: 0, remaining: 0, reset: 0 },
      };
    }
    return { ok: false, reason: "backend_unavailable" };
  }
}
