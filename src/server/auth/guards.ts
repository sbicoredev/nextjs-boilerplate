import "server-only";

import { redirect } from "next/navigation";

import { AUTH_ROUTES } from "~/constants/auth";

import { getCurrentSession } from "./get-current-session";

export const requireUser = async () => {
  const data = await getCurrentSession();
  if (!(data?.user && data.session)) {
    return redirect(AUTH_ROUTES.signIn);
  }
  return data.user;
};
