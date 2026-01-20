import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { admin, createAuthMiddleware, emailOTP } from "better-auth/plugins";

import { SIGNUP_EMAIL_COOKIE } from "~/constants/auth";
import { db } from "~/db/drizzle";
import { env } from "~/env";

import { sendEmail } from "../email/send-email";
import VerifyOTPEmail from "../email/templates/verify-otp";
import { authConfig } from "./config";

export const auth = betterAuth({
  database: drizzleAdapter(db, { provider: "pg", usePlural: false }),
  hooks: {
    after: createAuthMiddleware(async (ctx) => {
      if (ctx.context.returned instanceof Error) return;

      // after successfull signup request set a cookie for unverified email
      if (ctx.path.startsWith("/sign-up")) {
        ctx.setCookie(SIGNUP_EMAIL_COOKIE, ctx.body.email, {
          httpOnly: true,
          expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
          secure: env.NODE_ENV === "production",
          path: "/",
        });
      }

      // after email verification delete the unverified email
      if (ctx.path.includes("/verify-email")) {
        ctx.setCookie(SIGNUP_EMAIL_COOKIE, "", {
          httpOnly: true,
          maxAge: 0,
          secure: env.NODE_ENV === "production",
          path: "/",
        });
      }
    }),
  },
  advanced: {
    useSecureCookies: env.NODE_ENV === "production",
  },
  emailAndPassword: {
    enabled: authConfig.email.enabled,
    requireEmailVerification: authConfig.email.requiredVerification,
  },
  socialProviders: {
    google: {
      enabled: authConfig.google.enabled,
      clientId: authConfig.google.clientId,
      clientSecret: authConfig.google.secret,
    },
  },
  plugins: [
    emailOTP({
      sendVerificationOnSignUp: true,
      disableSignUp: true,
      async sendVerificationOTP({ email, otp, type }) {
        if (type === "email-verification" || type === "forget-password") {
          await sendEmail({
            sendTo: email,
            subject: `Verify your email for ${env.NEXT_PUBLIC_APP_NAME}`,
            react: VerifyOTPEmail({
              code: otp,
              appUrl: env.NEXT_PUBLIC_APP_URL,
              appName: env.NEXT_PUBLIC_APP_NAME,
              expiration: authConfig.email.confirmationExpires,
            }),
          });
        }
      },
    }),
    admin(),
  ],
});
