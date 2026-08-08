import { getSessionCookie } from "better-auth/cookies";
import type { Metadata } from "next";
import { headers } from "next/headers";

import { Providers } from "~/components/providers";
import { AuthContext } from "~/contexts/auth-context";
import { ThemeCustomizerContext } from "~/contexts/theme-context";
import { getThemePreference } from "~/features/theme";
import { constructMetadata } from "~/lib/construct-metadata";
import { getCurrentSession } from "~/server/auth/get-current-session";

import "../styles/globals.css";

export async function generateMetadata(): Promise<Metadata> {
  return constructMetadata({
    keywords: ["Next.js", "React", "Shadcn", "Better Auth"],
  });
}

export default async function RootLayout({
  children,
}: React.PropsWithChildren) {
  // incase db session revoked and session cookies left in browser
  let needSignOut = false;
  const auth = await getCurrentSession();
  const sessionCookie = getSessionCookie(await headers());
  if (!auth?.user && sessionCookie) {
    needSignOut = true;
  }
  const preference = await getThemePreference();

  return (
    <AuthContext
      value={{
        user: auth?.user || null,
        session: auth?.session || null,
        needSignOut,
      }}
    >
      <ThemeCustomizerContext allowedFonts={[]} themeStoreState={preference}>
        <Providers>{children}</Providers>
      </ThemeCustomizerContext>
    </AuthContext>
  );
}
