import "server-only";

import { isAPIError } from "better-auth/api";
import { createSafeActionClient } from "next-safe-action";
import z from "zod";

import { ErrorMessaage } from "~/constants/error-message";
import { serverEnv } from "~/env/server";
import { reportError } from "~/lib/error-reporter";

import { getCurrentSession } from "../auth/get-current-session";
import { checkRateLimit } from "../rate-limit/check";
import { createUserRateLimit } from "../rate-limit/policies";
import { ActionError } from "./action-error";
import { loggerMiddleware } from "./middleware/logger";
import {
  authRoutesRateLimitMiddleware,
  generalRateLimitMiddleware,
} from "./middleware/rate-limit";

// Base client: error handling, logging, metadata
export const publicAction = createSafeActionClient({
  handleServerError(e) {
    if (isAPIError(e)) {
      return e.message;
    }
    // Expected, user-safe errors (not found / forbidden / rate limited /
    // unauthorized) are raised as ActionError specifically so they pass
    // through here unmasked — see action-error.ts for why this matters.
    if (e instanceof ActionError) {
      return e.message;
    }
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
}).use(loggerMiddleware);

/** Action client with rate limit configured */
export const rateLimitedPublicAction = publicAction.use(
  generalRateLimitMiddleware
);

/** Action client for auth routes with rate limit configured */
export const authRoutesActionClient = publicAction.use(
  authRoutesRateLimitMiddleware
);

/** Authenticated client: requires valid session */
export const authenticatedAction = publicAction.use(async ({ next }) => {
  const auth = await getCurrentSession();
  if (!auth?.user) {
    throw new ActionError(ErrorMessaage.auth.unauthorized);
  }
  return next({ ctx: { user: auth.user } });
});

/** Authenticated client with rate limit: requires valid session */
export const rateLimitedAuthenticatedAction = authenticatedAction.use(
  async ({ next, metadata, ctx }) => {
    if (serverEnv.RATE_LIMIT_ENABLED) {
      const outcome = await checkRateLimit(
        createUserRateLimit(ctx.user.id),
        metadata.actionName
      );
      if (!outcome.ok) {
        throw new ActionError(ErrorMessaage.rateLimit.tooManyRequest);
      }
    }
    return next();
  }
);

/** Admin client: requires admin role */
export const adminAction = authenticatedAction.use(({ next, ctx }) => {
  // ctx.user is available here (typed!) from the auth middleware
  if (ctx.user.role !== "admin") {
    throw new ActionError(ErrorMessaage.auth.forbidden);
  }
  return next({ ctx: { isAdmin: true } });
});
