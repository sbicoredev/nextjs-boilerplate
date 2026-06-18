import "server-only";

import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { AUTH_URI } from "~/constants/auth";

import { auth } from "./better-auth";
import { mapAuthSession, mapAuthUser } from "./utils";

export async function checkAuth() {
  const result = await auth.api.getSession({ headers: await headers() });
  if (!result) {
    return null;
  }
  return {
    user: mapAuthUser(result.user),
    session: mapAuthSession(result.session),
  };
}

export async function authenticate() {
  const data = await auth.api.getSession({ headers: await headers() });
  if (!(data?.user && data.session)) {
    return redirect(AUTH_URI.signin);
  }
  return {
    user: mapAuthUser(data.user),
    session: mapAuthSession(data.session),
  };
}
