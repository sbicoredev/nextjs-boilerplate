import "server-only";

import { headers } from "next/headers";
import { cache } from "react";

import { auth } from "./better-auth";
import { mapAuthSession, mapAuthUser } from "./utils";

export const getCurrentSession = cache(async () => {
  const result = await auth.api.getSession({ headers: await headers() });
  if (!result) {
    return null;
  }
  return {
    user: mapAuthUser(result.user),
    session: mapAuthSession(result.session),
  };
});
