"use server";

import { headers } from "next/headers";

import { rateLimitedAuthenticatedAction } from "~/server/actions/client";

import { tokenSchema } from "../schemas/session-schema";
import { revokeOtherSessions, revokeSession } from "../server/session-service";

export const revokeSessionAction = rateLimitedAuthenticatedAction
  .metadata({ actionName: "revokeSessionAction" })
  .inputSchema(tokenSchema)
  .action(
    async ({ parsedInput }) => await revokeSession(parsedInput, await headers())
  );

export const revokeOtherSessionsAction = rateLimitedAuthenticatedAction
  .metadata({ actionName: "revokeOtherSessionsAction" })
  .action(async () => await revokeOtherSessions(await headers()));
