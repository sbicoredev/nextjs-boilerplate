import "server-only";

export type RateLimitResult = {
  success: boolean;
  limit: number;
  remaining: number;
  /** epoch ms when the current window resets */
  reset: number;
};

/**
 * Backend-agnostic rate limiter shape. `@upstash/ratelimit`'s `Ratelimit`
 * class already satisfies this structurally (its `.limit()` returns a
 * superset of `RateLimitResult`), so it's used directly as one
 * implementation; `createRedisLimiter` (./redis-limiter.ts) is the other.
 *
 * This exists so `proxy.ts` and the Server Action rate-limit middleware
 * don't need to know which backend is configured — see policies.ts, which
 * picks one based on `RATE_LIMIT_BACKEND`.
 */
export type RateLimiter = {
  limit: (identifier: string) => Promise<RateLimitResult>;
};
