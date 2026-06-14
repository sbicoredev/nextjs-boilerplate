import type { Session, User } from "better-auth/types";

export function mapAuthUser(user: User): AuthUser {
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    image: user.image,
  };
}

export function mapAuthSession(session: Session): AuthSession {
  return {
    id: session.id,
    token: session.token,
    expiresAt: session.expiresAt,
  };
}
