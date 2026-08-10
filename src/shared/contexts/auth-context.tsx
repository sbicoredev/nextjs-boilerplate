"use client";

import { createContext, useContext } from "react";

import type { AuthSession, AuthUser } from "~/features/auth";

type AuthContextValue = {
  user: AuthUser;
  session: AuthSession;
};

/**
 * Only provided inside `(dashboard)` (see `dashboard/layout.tsx`), which
 * already does a real, DB-verified session check. Public `(site)`/`(auth)`
 * pages do NOT provide this context — components rendered there (Header,
 * Nav) read the session client-side via `authClient.useSession()` instead,
 * so those routes don't need to read cookies server-side. See
 * `src/app/layout.tsx` for the full rationale.
 */
export const AuthContext = createContext<AuthContextValue | null>(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("Lack of AuthContext");
  }
  return context;
};
