import type { Metadata } from "next";
import { Libre_Franklin, Roboto } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { getLocale, getTranslations } from "next-intl/server";

import { Providers } from "~/components/providers";
import { AuthContext } from "~/contexts/auth-context";
import { cn } from "~/lib/utils";
import { getAuthUser } from "~/services/auth";
import "./globals.css";

const libre_franklin = Libre_Franklin({
  subsets: ["latin"],
  weight: ["300", "400", "700", "900"],
  variable: "--font-libre_franklin",
});

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["300", "400", "700", "900"],
  variable: "--font-roboto",
});

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("metadata");

  return {
    title: t("title"),
    description: t("desc"),
  };
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const locale = await getLocale();
  const user = await getAuthUser();

  return (
    <html lang={locale} suppressHydrationWarning>
      <body className={cn(libre_franklin.variable, roboto.variable)}>
        <NextIntlClientProvider locale={locale}>
          <AuthContext value={{ user: user ?? null }}>
            <Providers>{children}</Providers>
          </AuthContext>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
