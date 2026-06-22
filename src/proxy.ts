import { getSessionCookie } from "better-auth/cookies";
import { type NextRequest, NextResponse } from "next/server";

import {
  AUTH_URI,
  CALLBACK_QUERY_NAME,
  DEFAULT_LOGIN_REDIRECT,
} from "./constants/auth";

const authRoutes: string[] = Object.values(AUTH_URI);
const publicRoutes = ["/"];

export async function proxy(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const headers = new Headers(request.headers);
  const sessionCookie = getSessionCookie(request);

  if (publicRoutes.includes(path)) {
    return NextResponse.next({ headers });
  }

  if (authRoutes.includes(path) || path.startsWith(AUTH_URI.signin)) {
    // if already login prevent access to auth page
    if (sessionCookie) {
      return NextResponse.redirect(
        new URL(DEFAULT_LOGIN_REDIRECT, request.nextUrl)
      );
    }
    return NextResponse.next({ headers });
  }

  let callbackUrl = path;
  if (request.nextUrl.search) {
    callbackUrl += request.nextUrl.search;
  }

  if (!sessionCookie) {
    return NextResponse.redirect(
      new URL(
        `${AUTH_URI.signin}?${CALLBACK_QUERY_NAME}=${callbackUrl}`,
        request.nextUrl
      )
    );
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
