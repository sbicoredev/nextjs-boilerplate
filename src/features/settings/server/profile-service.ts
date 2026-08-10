import "server-only";

import { auth } from "~/server/auth/better-auth";

import type {
  DeleteAccountInput,
  UpdatePasswordInput,
  UpdateProfileInput,
} from "../schemas/profile-schema";

export async function updateProfile(
  input: UpdateProfileInput,
  headers: Headers
) {
  return await auth.api.updateUser({
    headers,
    body: input,
  });
}

export async function changePassword(
  input: UpdatePasswordInput,
  headers: Headers
) {
  return await auth.api.changePassword({
    headers,
    body: { ...input, revokeOtherSessions: true },
  });
}

export async function deleteAccount(
  input: DeleteAccountInput,
  headers: Headers
) {
  return await auth.api.deleteUser({
    headers,
    body: input,
  });
}
