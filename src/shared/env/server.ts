import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const serverEnv = createEnv({
  server: {
    NODE_ENV: z
      .enum(["development", "test", "production"])
      .default("development"),
    // db
    DB_URL: z.url(),
    // auth
    BETTER_AUTH_URL: z.url(),
    BETTER_AUTH_SECRET: z.string(),
    AUTH_OTP_EXPIRES: z.coerce.number().default(300),
    AUTH_OTP_ALLOWED_ATTEMPT: z.coerce.number().default(3),
    // email
    SMTP_SERVER_HOST: z.string(),
    SMTP_SERVER_PORT: z.coerce.number(),
    SMTP_SERVER_USERNAME: z.string(),
    SMTP_SERVER_PASSWORD: z.string(),
    EMAIL_FROM: z.string(),
    RATE_LIMIT_ENABLED: z.string().transform((v) => v === "true"),
    /** Time window for rate limiting (seconds). */
    RATE_LIMIT_TTL: z.coerce.number().default(60),
    /** How many requests a user can make in each time window. */
    RATE_LIMIT_MAX: z.coerce.number().default(5),
    /** Time window for rate limiting (seconds). */
    AUTH_RATE_LIMIT_TTL: z.coerce.number().default(60),
    /** How many requests a user can make in each time window. */
    AUTH_RATE_LIMIT_MAX: z.coerce.number().default(5),
    UPSTASH_REDIS_REST_URL: z.url().optional(),
    UPSTASH_REDIS_REST_TOKEN: z.string().optional(),
    // oauth (all optional — social sign-in is disabled by default in
    // src/configs/auth-config.ts; set these and flip `enabled: true` there
    // to turn a provider on). Validated here so a misconfigured provider
    // fails at boot instead of at the first sign-in attempt.
    GOOGLE_CLIENT_ID: z.string().optional(),
    GOOGLE_CLIENT_SECRET: z.string().optional(),
    GOOGLE_CALLBACK_URL: z.url().optional(),
  },
  // If you're using Next.js < 13.4.4, you'll need to specify the runtimeEnv manually
  // runtimeEnv: {
  //   DATABASE_URL: process.env.DATABASE_URL,
  //   OPEN_AI_API_KEY: process.env.OPEN_AI_API_KEY,
  // },
  // For Next.js >= 13.4.4, you can just reference process.env:
  experimental__runtimeEnv: process.env,
  /**
   * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially
   * useful for Docker builds.
   */
  skipValidation: !!process.env.SKIP_ENV_VALIDATION,
  /**
   * Makes it so that empty strings are treated as undefined. `SOME_VAR: z.string()` and
   * `SOME_VAR=''` will throw an error.
   */
  emptyStringAsUndefined: true,
});

// Cross-field checks t3-env's per-field schema can't express: fail at boot
// (like everything else in this file) rather than at the first rate-limited
// request, when the upstash credentials missing.
if (
  serverEnv.RATE_LIMIT_ENABLED &&
  !(serverEnv.UPSTASH_REDIS_REST_URL && serverEnv.UPSTASH_REDIS_REST_TOKEN)
) {
  throw new Error(
    "RATE_LIMIT_ENABLED=true requires UPSTASH_REDIS_REST_URL and UPSTASH_REDIS_REST_TOKEN to be set."
  );
}
