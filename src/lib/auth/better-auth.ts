import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { nextCookies } from "better-auth/next-js";
import { admin, emailOTP } from "better-auth/plugins";

import { authConfig } from "~/configs/auth-config";
import { siteConfig } from "~/configs/site-config";
import { db } from "~/db/drizzle";
import { serverEnv } from "~/env/server";

import { sendEmail } from "../email/send-email";
import VerifyOTPEmail from "../email/templates/verify-otp";

export const auth = betterAuth({
  database: drizzleAdapter(db, { provider: "pg", usePlural: false }),
  advanced: {
    useSecureCookies: serverEnv.NODE_ENV === "production",
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
          subject: `Verify your otp for ${siteConfig.name}`,
          react: VerifyOTPEmail({
            code: otp,
            appUrl: siteConfig.url,
            appName: siteConfig.name,
            expiration: authConfig.email.otpExpiresIn,
          }),
        });
      },
    }),
    admin(),
    nextCookies(),
  ],
});
