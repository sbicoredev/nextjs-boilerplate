"use server";

import { headers } from "next/headers";

import { rateLimitedAuthenticatedAction } from "~/server/actions/client";

import {
  deleteAccountSchema,
  updatePasswordSchema,
  updateProfileSchema,
} from "../schemas/profile-schema";
import {
  changePassword,
  deleteAccount,
  updateProfile,
} from "../server/profile-service";

export const updateProfileAction = rateLimitedAuthenticatedAction
  .metadata({ actionName: "updateProfileAction" })
  .inputSchema(updateProfileSchema)
  .action(
    async ({ parsedInput }) => await updateProfile(parsedInput, await headers())
  );

export const changePasswordAction = rateLimitedAuthenticatedAction
  .metadata({ actionName: "changePasswordAction" })
  .inputSchema(updatePasswordSchema)
  .action(
    async ({ parsedInput }) =>
      await changePassword(parsedInput, await headers())
  );

export const deleteAccountAction = rateLimitedAuthenticatedAction
  .metadata({ actionName: "deleteAccountAction" })
  .inputSchema(deleteAccountSchema)
  .action(
    async ({ parsedInput }) => await deleteAccount(parsedInput, await headers())
  );
