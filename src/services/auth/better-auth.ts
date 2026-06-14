import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { createAuthMiddleware } from "better-auth/api";
import { admin, emailOTP } from "better-auth/plugins";

import { EMAIL_OTP_COOKIE, SIGNUP_EMAIL_COOKIE } from "~/constants/auth";
import { db } from "~/db/drizzle";
import { env } from "~/env";

import { sendEmail } from "../email/send-email";
import VerifyOTPEmail from "../email/templates/verify-otp";
import { authConfig } from "./config";

export const auth = betterAuth({
  database: drizzleAdapter(db, { provider: "pg", usePlural: false }),
  advanced: {
    useSecureCookies: env.NODE_ENV === "production",
  },
  emailAndPassword: {
    enabled: authConfig.email.enabled,
    requireEmailVerification: authConfig.email.requiredVerification,
  },
  socialProviders: authConfig.socialProviders,
  plugins: [
    emailOTP({
      overrideDefaultEmailVerification: true,
      sendVerificationOnSignUp: true,
      disableSignUp: true,
      allowedAttempts: authConfig.email.otpAllowedAttempts,
      expiresIn: authConfig.email.otpExpiresIn,
      async sendVerificationOTP({ email, otp }) {
        await sendEmail({
          sendTo: email,
          subject: `Verify your otp for ${env.NEXT_PUBLIC_APP_NAME}`,
          react: VerifyOTPEmail({
            code: otp,
            appUrl: env.NEXT_PUBLIC_APP_URL,
            appName: env.NEXT_PUBLIC_APP_NAME,
            expiration: authConfig.email.otpExpiresIn,
          }),
        });
      },
    }),
    admin(),
  ],
  hooks: {
    after: createAuthMiddleware(async (ctx) => {
      if (ctx.context.returned instanceof Error) {
        return;
      }
      console.log(ctx.path);

      // after successfull signup request set a cookie for unverified email
      if (ctx.path.startsWith("/sign-up")) {
        ctx.setCookie(SIGNUP_EMAIL_COOKIE, ctx.body.email, {
          httpOnly: true,
          expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
          secure: env.NODE_ENV === "production",
          path: "/",
        });
      }

      // after successfull forgot password request set a cookie for email
      if (ctx.path.startsWith("/email-otp")) {
        ctx.setCookie(EMAIL_OTP_COOKIE, ctx.body.email, {
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
});
