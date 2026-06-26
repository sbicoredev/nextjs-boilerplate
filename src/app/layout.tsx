import type { Metadata } from "next";
import { cookies } from "next/headers";
import { NextIntlClientProvider } from "next-intl";
import { getLocale, getTranslations } from "next-intl/server";
import type { StorageValue } from "zustand/middleware";

import { Providers } from "~/components/providers";
import {
  DASHBOARD_THEME_COOKIE_NAME,
  DEFAULT_THEME_PREFERENCE,
} from "~/constants/theme-customizer";
import { AuthContext } from "~/contexts/auth-context";
import { ThemeCustomizerContext } from "~/contexts/theme-customizer-context";
import { fontRegistry, fontVars } from "~/lib/fonts";
import { checkAuth } from "~/services/auth";

import "../styles/globals.css";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("metadata");

  return {
    title: t("title"),
    description: t("desc"),
  };
}

export default async function RootLayout({
  children,
}: React.PropsWithChildren) {
  const locale = await getLocale();
  const auth = await checkAuth();
  const v = (await cookies()).get(DASHBOARD_THEME_COOKIE_NAME)?.value;
  const settings =
    (JSON.parse(v ?? "{}") as StorageValue<ThemeCustomizerField> | undefined)
      ?.state || DEFAULT_THEME_PREFERENCE;

  const allowedFonts = Object.entries(fontRegistry).map(([key, f]) => ({
    value: key as keyof typeof fontRegistry,
    label: f.label,
  }));

  return (
    <html
      className={settings.themeMode === "light" ? "" : "dark"}
      data-theme-preset={settings.themePreset}
      lang={locale}
      style={{
        // @ts-expect-error
        "--font-sans": settings.fontPrimary,
        "--font-heading": settings.fontHeading,
      }}
    >
      <body className={fontVars}>
        <NextIntlClientProvider locale={locale}>
          <ThemeCustomizerContext
            allowedFonts={allowedFonts}
            themeStoreState={settings}
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
