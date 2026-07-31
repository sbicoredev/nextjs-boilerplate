import "server-only";

import { headers } from "next/headers";
import { createMiddleware, createSafeActionClient } from "next-safe-action";
import z from "zod";

import { ErrorMessaage } from "~/constants/error-message";
import { auth } from "~/services/auth/better-auth";

import { reportError } from "./error-reporter";
import { createUserRateLimit, generalRateLimit } from "./rate-limit";

const loggingMiddleware = createMiddleware().define(
  async ({ next, metadata }) => {
    const start = Date.now();
    const result = await next();
    console.log(`Action took ${Date.now() - start}ms`, metadata);
    return result;
  }
);

const generalRatelimitMiddleware = createMiddleware().define(
  async ({ next }) => {
    const headersList = await headers();
    const forwardedFor = headersList.get("x-forwarded-for")?.split(",")[0];
    const ip = forwardedFor ?? "anonymous";
    const { success } = await generalRateLimit.limit(ip);
    if (!success) {
      throw new Error(ErrorMessaage.rateLimit.tooManyRequest);
    }
    return await next();
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

// Action client with rate limit middleware
export const rateLimitActionClient = actionClient.use(
  generalRatelimitMiddleware
);

// Authenticated client: requires valid session
export const authActionClient = actionClient.use(async ({ next, metadata }) => {
  const session = await auth.api.getSession();
  if (!session?.user) {
    throw new Error(ErrorMessaage.auth.unauthorized);
  }
  const { success } = await createUserRateLimit(session.user.id).limit(
    metadata.actionName
  );
  if (!success) {
    throw new Error(ErrorMessaage.rateLimit.tooManyRequest);
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
