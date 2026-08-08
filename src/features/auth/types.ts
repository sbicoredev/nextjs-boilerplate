import type { ROLES } from "~/constants/auth";

export type UserRole = (typeof ROLES)[number];

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  image: string | null;
  role: UserRole;
  banned: boolean | null;
}

export interface AuthSession {
  id: string;
  token: string;
  expiresAt: Date;
}
