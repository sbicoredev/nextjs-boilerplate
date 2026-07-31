import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

import { serverEnv } from "~/env/server";

export const redis = Redis.fromEnv();

// General API rate limit
export const generalRateLimit = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(
    serverEnv.RATE_LIMIT_MAX,
    `${serverEnv.RATE_LIMIT_TTL} s`
  ), // req / seconds
  analytics: true,
  prefix: "@ratelimit/general",
});

// Stricter for auth endpoints
export const authRoutesRateLimit = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(20, "10 m"), // 20 attempts / 10 min
  analytics: true,
  prefix: "@ratelimit/auth",
});

// Optional: Per-user (after auth)
export function createUserRateLimit(userId: string) {
  return new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(
      serverEnv.RATE_LIMIT_MAX,
      `${serverEnv.RATE_LIMIT_TTL} s`
    ),
    prefix: `@ratelimit/user/${userId}`,
  });
}
