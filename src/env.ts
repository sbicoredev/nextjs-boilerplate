import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  /**
   * Specify your server-side environment variables schema here. This way you can ensure the app
   * isn't built with invalid env vars.
   */
  server: {
    NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
    // db
    DB_URL: z.url(),
    POSTGRES_USER: z.string(),
    POSTGRES_DB: z.string(),
    POSTGRES_PASSWORD: z.string(),
    // auth
    AUTH_OTP_EXPIRES: z.coerce.number().default(300),
    AUTH_OTP_ALLOWED_ATTEMPT: z.coerce.number().default(3),
    // email
    SMTP_SERVER_HOST: z.string(),
    SMTP_SERVER_PORT: z.coerce.number(),
    SMTP_SERVER_USERNAME: z.string(),
    SMTP_SERVER_PASSWORD: z.string(),
    SUPPORT_MAIL_ADDRESS: z.string(),
    MAIL_FROM_ADDRESS: z.string(),
    MAIL_FROM_NAME: z.string(),
  },

  /**
   * Specify your client-side environment variables schema here. This way you can ensure the app
   * isn't built with invalid env vars. To expose them to the client, prefix them with
   * `NEXT_PUBLIC_`.
   */
  client: {
    NEXT_PUBLIC_APP_URL: z.url(),
    NEXT_PUBLIC_APP_NAME: z.string(),
  },
  // For Next.js >= 13.4.4, you only need to destructure client variables:
  experimental__runtimeEnv: {
    NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
    NEXT_PUBLIC_APP_NAME: process.env.NEXT_PUBLIC_APP_NAME,
  },
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
