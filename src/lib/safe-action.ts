import "server-only";

import { isAPIError } from "better-auth/api";
import { createMiddleware, createSafeActionClient } from "next-safe-action";
import z from "zod";

import { ErrorMessaage } from "~/constants/error-message";
import { serverEnv } from "~/env/server";
import { checkAuth } from "~/services/auth";

import { reportError } from "./error-reporter";
import { getIP } from "./get-ip";
import {
  authRoutesRateLimit,
  createUserRateLimit,
  generalRateLimit,
} from "./rate-limit";

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
    if (isAPIError(e)) {
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
}).use(loggingMiddleware);

/** Action client with rate limit configured */
export const actionClientWithRateLimit = actionClient.use(
  createMiddleware().define(async ({ next }) => {
    if (serverEnv.RATE_LIMIT_ENABLED) {
      const ip = await getIP();
      const { success } = await generalRateLimit.limit(ip);
      if (!success) {
        throw new Error(ErrorMessaage.rateLimit.tooManyRequest);
      }
      return await next();
    }
    return await next();
  })
);

/** Action client for auth routes with rate limit configured */
export const authRoutesActionClient = actionClient.use(
  createMiddleware().define(async ({ next }) => {
    if (serverEnv.RATE_LIMIT_ENABLED) {
      const ip = await getIP();
      const { success } = await authRoutesRateLimit.limit(ip);
      if (!success) {
        throw new Error(ErrorMessaage.rateLimit.tooManyRequest);
      }
      return await next();
    }
    return await next();
  })
);

/** Authenticated client: requires valid session */
export const authnActionClient = actionClient.use(
  async ({ next, metadata }) => {
    const auth = await checkAuth();
    if (!auth?.user) {
      throw new Error(ErrorMessaage.auth.unauthorized);
    }
    if (serverEnv.RATE_LIMIT_ENABLED) {
      const { success } = await createUserRateLimit(auth.user.id).limit(
        metadata.actionName
      );
      if (!success) {
        throw new Error(ErrorMessaage.rateLimit.tooManyRequest);
      }
    }
    return next({ ctx: { user: auth.user } });
  }
);

/** Admin client: requires admin role */
export const adminActionClient = authnActionClient.use(
  async ({ next, ctx }) => {
    // ctx.user is available here (typed!) from the auth middleware
    if (ctx.user.role !== "admin") {
      throw new Error(ErrorMessaage.auth.forbidden);
    }
    return next({ ctx: { isAdmin: true } });
  }
);
