import "server-only";

import type Redis from "ioredis";

import type { RateLimiter, RateLimitResult } from "./client";

type Options = {
  redis: Redis;
  windowSeconds: number;
  max: number;
  prefix: string;
};

/**
 * Fixed-window counter, for the plain `redis` service in
 * docker-compose.yaml (a TCP redis instance — not REST, so `@upstash/redis`
 * can't talk to it).
 *
 * This is simpler than the sliding-window algorithm `@upstash/ratelimit`
 * uses for the Upstash backend: a client can get up to ~2x `max` requests
 * through if it times requests right at a window boundary (e.g. one burst
 * at 0:59 and another at 1:00 for a 60s window). That's an acceptable
 * trade-off for a boilerplate reference implementation — swap in a
 * sliding-window Lua script (`redis.eval`) if your project needs tighter
 * guarantees.
 */
export function createRedisLimiter(options: Options): RateLimiter {
  const { redis, windowSeconds, max, prefix } = options;

  return {
    async limit(identifier: string): Promise<RateLimitResult> {
      const key = `${prefix}:${identifier}`;
      const count = await redis.incr(key);
      if (count === 1) {
        await redis.expire(key, windowSeconds);
      }
      const ttl = await redis.ttl(key);
      const reset = Date.now() + Math.max(ttl, 0) * 1000;

      return {
        success: count <= max,
        limit: max,
        remaining: Math.max(max - count, 0),
        reset,
      };
    },
  };
}
