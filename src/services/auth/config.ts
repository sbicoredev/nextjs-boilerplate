import "server-only";

import { env } from "~/env";

export const authConfig = {
  enableSignup: true,
  email: {
    enabled: true,
    requiredVerification: true,
    confirmationExpires: env.EMAIL_CONFIRMATION_EXPIRES * 1000,
  },
  magicLink: {
    enabeld: false,
  },
  google: {
    enabled: true,
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
};
