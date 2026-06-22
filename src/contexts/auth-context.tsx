"use client";

import { createContext, useContext } from "react";

type AuthContext = {
  user: AuthUser | null;
  session: AuthSession | null;
};

export const AuthContext = createContext<AuthContext>({
  user: null,
  session: null,
});

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("Lack of AuthContext");
  }
  return context;
};
