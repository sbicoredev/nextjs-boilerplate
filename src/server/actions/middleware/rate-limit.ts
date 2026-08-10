import { createMiddleware } from "next-safe-action";

import { ErrorMessaage } from "~/constants/error-message";
import { serverEnv } from "~/env/server";
import { getIP } from "~/server/get-ip";
import { checkRateLimit } from "~/server/rate-limit/check";
import {
  authRoutesRateLimit,
  generalRateLimit,
} from "~/server/rate-limit/policies";

import { ActionError } from "../action-error";

export const generalRateLimitMiddleware = createMiddleware().define(
  async ({ next }) => {
    if (serverEnv.RATE_LIMIT_ENABLED) {
      const ip = await getIP();
      const outcome = await checkRateLimit(generalRateLimit, ip);
      if (!outcome.ok) {
        throw new ActionError(ErrorMessaage.rateLimit.tooManyRequest);
      }
    }
    return await next();
  }
);

export const authRoutesRateLimitMiddleware = createMiddleware().define(
  async ({ next }) => {
    if (serverEnv.RATE_LIMIT_ENABLED) {
      const ip = await getIP();
      const outcome = await checkRateLimit(authRoutesRateLimit, ip);
      if (!outcome.ok) {
        throw new ActionError(ErrorMessaage.rateLimit.tooManyRequest);
      }
    }
    return await next();
  }
);
