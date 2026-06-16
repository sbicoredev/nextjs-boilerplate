"use client";

import { createContext, useContext } from "react";

type Context = {
  user: AuthUser | null;
};

export const AuthContext = createContext<Context>({ user: null });

export const useAuth = () => useContext(AuthContext);
