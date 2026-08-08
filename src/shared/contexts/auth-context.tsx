"use client";

import { createContext, useContext } from "react";

import type { AuthSession, AuthUser } from "~/features/auth";

type AuthContext = {
  user: AuthUser | null;
  session: AuthSession | null;
  needSignOut?: boolean;
};

export const AuthContext = createContext<AuthContext>({
  user: null,
  session: null,
  needSignOut: false,
});

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("Lack of AuthContext");
  }
  return context;
};
