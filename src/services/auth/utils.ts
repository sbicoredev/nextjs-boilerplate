import type { UserWithRole } from "better-auth/plugins";
import type { Session } from "better-auth/types";

export function mapAuthUser(user: Nullish<UserWithRole>): AuthUser {
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    image: user.image ?? null,
    role: (user.role as UserRole) ?? null,
    banned: user.banned ?? null,
  };
}

export function mapAuthSession(session: Session): AuthSession {
  return {
    id: session.id,
    token: session.token,
    expiresAt: session.expiresAt,
  };
}
