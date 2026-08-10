import "server-only";

import { auth } from "~/server/auth/better-auth";

import type { TokenInput } from "../schemas/session-schema";

export async function revokeSession(input: TokenInput, headers: Headers) {
  return await auth.api.revokeSession({
    headers,
    body: input,
  });
}

export async function revokeOtherSessions(headers: Headers) {
  return await auth.api.revokeOtherSessions({ headers });
}
