import { adminClient, emailOTPClient } from "better-auth/client/plugins";
import { createAuthClient } from "better-auth/react";

import { clientEnv } from "~/env/client";

export const authClient = createAuthClient({
  baseURL: clientEnv.NEXT_PUBLIC_APP_URL,
  plugins: [emailOTPClient(), adminClient()],
  fetchOptions: {
    onError: (ctx) => {
      console.error(ctx.error.message);
    },
  },
});
