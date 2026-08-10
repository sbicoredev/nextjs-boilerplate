import { getSessionCookie } from "better-auth/cookies";
import { type NextRequest, NextResponse } from "next/server";

import {
  AUTH_REDIRECT_PATHS,
  AUTH_ROUTES,
  CALLBACK_QUERY_NAME,
} from "~/constants/auth";
import { serverEnv } from "~/env/server";

import { resolveIp } from "./server/get-ip";
import { checkRateLimit } from "./server/rate-limit/check";
import { generalRateLimit } from "./server/rate-limit/policies";

const authRoutes: string[] = Object.values(AUTH_ROUTES);
const protectedUrl = ["/dashboard"];

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  // @ts-expect-error - request.ip is available on Vercel/Node runtimes
  const ip = resolveIp(request.headers, request.ip);

  if (serverEnv.RATE_LIMIT_ENABLED) {
    const outcome = await checkRateLimit(generalRateLimit, ip);
    if (!outcome.ok && outcome.reason === "rate_limited") {
      const { limit, remaining, reset } = outcome.result;
      return new NextResponse("Too Many Requests, Please try again later.", {
        status: 429,
        headers: {
          "X-RateLimit-Limit": limit.toString(),
          "X-RateLimit-Remaining": remaining.toString(),
          "X-RateLimit-Reset": reset.toString(),
          "Retry-After": Math.ceil((reset - Date.now()) / 1000).toString(),
        },
      });
    }
    if (!outcome.ok && outcome.reason === "backend_unavailable") {
      // checkRateLimit already reported the error; fail-closed policy is
      // decided once, in one place — see server/rate-limit/check.ts.
      return new NextResponse("Service Unavailable", { status: 503 });
    }
  }

  const headers = new Headers(request.headers);
  const sessionCookie = getSessionCookie(request);

  if (authRoutes.includes(pathname) || pathname.startsWith("/auth")) {
    // if already login prevent access to auth page
    if (sessionCookie) {
      return NextResponse.redirect(
        new URL(AUTH_REDIRECT_PATHS.afterSignIn, request.nextUrl)
      );
    }
    return NextResponse.next({ headers });
  }

  if (protectedUrl.includes(pathname) || pathname.startsWith("/dashboard")) {
    let callbackUrl = pathname;
    if (request.nextUrl.search) {
      callbackUrl += request.nextUrl.search;
    }
    if (!sessionCookie) {
      return NextResponse.redirect(
        new URL(
          `${AUTH_ROUTES.signIn}?${CALLBACK_QUERY_NAME}=${callbackUrl}`,
          request.nextUrl
        )
      );
    }
  }

  return NextResponse.next({ headers });
}

/**
 * Matcher runs for all routes.
 * To skip assets or APIs, use a negative matcher from docs.
 */
export const config = {
  matcher: [
    {
      // match all routes except static files and APIs
      source: "/((?!api|_next/static|_next/image|favicon.ico|assets).*)",
      missing: [
        { type: "header", key: "next-router-prefetch" },
        { type: "header", key: "next-action" },
        { type: "header", key: "purpose", value: "prefetch" },
      ],
    },
  ],
};
