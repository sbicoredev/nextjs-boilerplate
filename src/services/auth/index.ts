import "server-only";

import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { cache } from "react";

import { AUTH_URI } from "~/constants/auth";

import { auth } from "./better-auth";
import { mapAuthSession, mapAuthUser } from "./utils";

export const checkAuth = cache(async () => {
  const result = await auth.api.getSession({ headers: await headers() });
  if (!result) {
    return null;
  }
  return {
    user: mapAuthUser(result.user),
    session: mapAuthSession(result.session),
  };
});

export const authenticate = cache(async () => {
  const data = await auth.api.getSession({ headers: await headers() });
  if (!(data?.user && data.session)) {
    return redirect(AUTH_URI.signin);
  }
  return {
    user: mapAuthUser(data.user),
    session: mapAuthSession(data.session),
  };
});
