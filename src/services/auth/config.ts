import type { SocialProviders } from "better-auth";
import "server-only";

import { serverEnv } from "~/env/server";

export const authConfig = {
  enableSignUp: true,
  email: {
    enabled: true,
    requiredVerification: true,
    otpExpiresIn: serverEnv.AUTH_OTP_EXPIRES,
    otpAllowedAttempts: serverEnv.AUTH_OTP_ALLOWED_ATTEMPT,
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
