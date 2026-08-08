import { getSessionCookie } from "better-auth/cookies";
import { type NextRequest, NextResponse } from "next/server";

import {
  AUTH_REDIRECT_PATHS,
  AUTH_ROUTES,
  CALLBACK_QUERY_NAME,
} from "~/constants/auth";
import { serverEnv } from "~/env/server";

import { generalRateLimit } from "./server/rate-limit/policies";

const authRoutes: string[] = Object.values(AUTH_ROUTES);
const protectedUrl = ["/dashboard"];

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  // request.ip is set by the trusted upstream proxy (Vercel, Cloudflare, etc.)
  // and can't be spoofed by the client. x-forwarded-for can be spoofed when
  // there's no trusted proxy, so we only use it as a secondary signal.
  const forwardedFor = request.headers.get("x-forwarded-for")?.split(",")[0];
  // @ts-expect-error - request.ip is available on Vercel/Node runtimes
  const ip = request.ip ?? forwardedFor ?? "anonymous";

  if (serverEnv.RATE_LIMIT_ENABLED) {
    try {
      const { success, limit, remaining, reset } =
        await generalRateLimit.limit(ip);
      if (!success) {
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
    } catch (error) {
      console.error("Rate limit check failed, blocking request:", error);
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
