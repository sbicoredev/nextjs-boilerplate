import "server-only";

import { Ratelimit } from "@upstash/ratelimit";
import { Redis as UpstashRedis } from "@upstash/redis";
import IORedis from "ioredis";

import { serverEnv } from "~/env/server";

import type { RateLimiter } from "./client";
import { createRedisLimiter } from "./redis-limiter";

// Single shared connection per backend, reused by every limiter below —
// created once at module load, not per request.
const ioredisConnection =
  serverEnv.RATE_LIMIT_BACKEND === "redis" && serverEnv.REDIS_URL
    ? new IORedis(serverEnv.REDIS_URL)
    : null;

const upstashConnection =
  serverEnv.RATE_LIMIT_BACKEND === "upstash" &&
  serverEnv.UPSTASH_REDIS_REST_URL &&
  serverEnv.UPSTASH_REDIS_REST_TOKEN
    ? new UpstashRedis({
        url: serverEnv.UPSTASH_REDIS_REST_URL,
        token: serverEnv.UPSTASH_REDIS_REST_TOKEN,
      })
    : null;

function buildLimiter(options: {
  max: number;
  windowSeconds: number;
  prefix: string;
}): RateLimiter {
  const { max, windowSeconds, prefix } = options;

  if (serverEnv.RATE_LIMIT_BACKEND === "redis") {
    if (!ioredisConnection) {
      throw new Error(
        "RATE_LIMIT_BACKEND=redis but REDIS_URL is missing (see src/shared/env/server.ts)."
      );
    }
    return createRedisLimiter({
      redis: ioredisConnection,
      windowSeconds,
      max,
      prefix,
    });
  }

  if (!upstashConnection) {
    throw new Error(
      "RATE_LIMIT_BACKEND=upstash but UPSTASH_REDIS_REST_URL/TOKEN are missing (see src/shared/env/server.ts)."
    );
  }
  // Ratelimit's `.limit()` return shape is a superset of RateLimiter's —
  // structurally compatible, no adapter needed.
  return new Ratelimit({
    redis: upstashConnection,
    limiter: Ratelimit.slidingWindow(max, `${windowSeconds} s`),
    analytics: true,
    prefix,
  });
}

// General API rate limit
export const generalRateLimit = buildLimiter({
  max: serverEnv.RATE_LIMIT_MAX,
  windowSeconds: serverEnv.RATE_LIMIT_TTL,
  prefix: "@ratelimit/general",
});

// Stricter for auth endpoints
export const authRoutesRateLimit = buildLimiter({
  max: serverEnv.AUTH_RATE_LIMIT_MAX,
  windowSeconds: serverEnv.AUTH_RATE_LIMIT_TTL,
  prefix: "@ratelimit/auth",
});

// Optional: per-user (after auth)
export function createUserRateLimit(userId: string) {
  return buildLimiter({
    max: serverEnv.RATE_LIMIT_MAX,
    windowSeconds: serverEnv.RATE_LIMIT_TTL,
    prefix: `@ratelimit/user/${userId}`,
  });
}
