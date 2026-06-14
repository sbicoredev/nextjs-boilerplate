import type { ROLES } from "./constants/auth";
import type { table } from "./db/drizzle";

declare global {
  type UserRole = (typeof ROLES)[number];

  interface AuthUser {
    email: string;
    id: string;
    image?: string | null;
    name: string;
    role?: UserRole | null;
  }

  interface AuthSession {
    expiresAt: Date;
    id: string;
    token: string;
  }

  interface AuthResponse {
    session: AuthSession | null;
    user: AuthUser | null;
  }

  type User = typeof table.user.$inferSelect;
  type Account = typeof table.account.$inferSelect;
  type Session = typeof table.session.$inferSelect;
}
