import type { Metadata } from "next";
import { Libre_Franklin, Roboto } from "next/font/google";
import { getLocale, getTranslations } from "next-intl/server";

import { Providers } from "~/components/providers";
import { cn } from "~/lib/utils";
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

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const locale = await getLocale();

  return (
    <html lang={locale}>
      <body
        className={cn(
          "flex min-h-screen w-full flex-col antialiased",
          libre_franklin.variable,
          roboto.variable,
        )}
      >
        <Providers locale={locale}>{children}</Providers>
      </body>
    </html>
  );
}
