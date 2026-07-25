import "server-only";

import { createMiddleware, createSafeActionClient } from "next-safe-action";
import z from "zod";

import { ErrorMessaage } from "~/constants/error-message";
import { auth } from "~/services/auth/better-auth";

import { reportError } from "./error-reporter";

const loggingMiddleware = createMiddleware().define(
  async ({ next, metadata }) => {
    const start = Date.now();
    const result = await next();
    console.log(`Action took ${Date.now() - start}ms`, metadata);
    return result;
  }
);

// Base client: error handling, logging, metadata
export const actionClient = createSafeActionClient({
  handleServerError(e) {
    reportError(e);
    return ErrorMessaage.server.internal;
  },
  defineMetadataSchema() {
    return z.object({
      actionName: z.string(),
    });
  },
  // Change the default validation error shape
  defaultValidationErrorsShape: "flattened",
}).use(loggingMiddleware);

// Authenticated client: requires valid session
export const authActionClient = actionClient.use(async ({ next }) => {
  const session = await auth.api.getSession();
  if (!session?.user) {
    throw new Error(ErrorMessaage.auth.unauthorized);
  }
  return next({ ctx: { session } });
});

// Admin client: requires admin role
export const adminActionClient = authActionClient.use(async ({ next, ctx }) => {
  // ctx.user is available here (typed!) from the auth middleware
  if (ctx.session.user.role !== "admin") {
    throw new Error(ErrorMessaage.auth.forbidden);
  }
  return next({ ctx: { isAdmin: true } });
});
