import { createMiddleware } from "next-safe-action";

export const loggerMiddleware = createMiddleware().define(
  async ({ next, metadata }) => {
    const start = Date.now();
    const result = await next();
    console.log(`Action took ${Date.now() - start}ms`, metadata);
    return result;
  }
);
