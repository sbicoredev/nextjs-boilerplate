import { createMiddleware } from "next-safe-action";

import { ErrorMessaage } from "~/constants/error-message";
import { serverEnv } from "~/env/server";
import { getIP } from "~/server/get-ip";
import {
  authRoutesRateLimit,
  generalRateLimit,
} from "~/server/rate-limit/policies";

export const generalRateLimitMiddleware = createMiddleware().define(
  async ({ next }) => {
    if (serverEnv.RATE_LIMIT_ENABLED) {
      const ip = await getIP();
      const { success } = await generalRateLimit.limit(ip);
      if (!success) {
        throw new Error(ErrorMessaage.rateLimit.tooManyRequest);
      }
      return await next();
    }
    return await next();
  }
);

export const authRoutesRateLimitMiddleware = createMiddleware().define(
  async ({ next }) => {
    if (serverEnv.RATE_LIMIT_ENABLED) {
      const ip = await getIP();
      const { success } = await authRoutesRateLimit.limit(ip);
      if (!success) {
        throw new Error(ErrorMessaage.rateLimit.tooManyRequest);
      }
      return next();
    }
    return next();
  }
);
