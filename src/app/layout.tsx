import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getLocale, getTranslations } from "next-intl/server";

import { Providers } from "~/components/providers";
import { AuthContext } from "~/contexts/auth-context";
import { ThemeCustomizerContext } from "~/contexts/theme-customizer-context";
import { getThemePreference } from "~/features/theme-customizer/utils";
import { constructMetadata } from "~/lib/construct-metadata";
import { fontRegistry, fontVars } from "~/lib/fonts";
import { checkAuth } from "~/services/auth";

import "../styles/globals.css";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("metadata");
  return constructMetadata({
    title: t("title"),
    description: t("desc"),
    keywords: ["Next.js", "React", "Shadcn", "Better Auth"],
  });
}

export default async function RootLayout({
  children,
}: React.PropsWithChildren) {
  const locale = await getLocale();
  const auth = await checkAuth();
  const preference = await getThemePreference();
  const allowedFonts = Object.entries(fontRegistry).map(([key, f]) => ({
    value: key as keyof typeof fontRegistry,
    label: f.label,
  }));

  return (
    <html
      className={preference.themeMode === "light" ? "" : "dark"}
      data-theme-preset={preference.themePreset}
      dir={preference.pageDirection}
      lang={locale}
      style={{
        // @ts-expect-error
        "--font-sans": preference.fontPrimary,
        "--font-heading": preference.fontHeading,
      }}
    >
      <body className={fontVars}>
        <NextIntlClientProvider locale={locale}>
          <ThemeCustomizerContext
            allowedFonts={allowedFonts}
            themeStoreState={preference}
          >
            <AuthContext
              value={{
                user: auth?.user ?? null,
                session: auth?.session ?? null,
              }}
            >
              <Providers>{children}</Providers>
            </AuthContext>
          </ThemeCustomizerContext>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
