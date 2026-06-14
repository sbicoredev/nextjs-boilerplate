import type { SocialProviders } from "better-auth";
import "server-only";

import { env } from "~/env";

export const authConfig = {
  enableSignup: true,
  email: {
    enabled: true,
    requiredVerification: true,
    otpExpiresIn: env.AUTH_OTP_EXPIRES,
    otpAllowedAttempts: env.AUTH_OTP_ALLOWED_ATTEMPT,
  },
  magicLink: {
    enabeld: false,
  },
  socialProviders: {
    google: {
      enabled: false,
      clientId: "", // from env,
      secret: "", // from env.
      redirectUri: "",
    },
    github: {
      enabled: false,
      clientId: "", // env
      secret: "", // env
      redirectUri: "",
    },
  } as SocialProviders,
};
