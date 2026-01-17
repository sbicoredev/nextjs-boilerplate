import { NextIntlClientProvider } from "next-intl";
import { ThemeProvider } from "next-themes";
import type { PropsWithChildren } from "react";

type Props = PropsWithChildren & {
  locale: string;
};

export const Providers = ({ children, locale }: Props) => {
  return (
    <NextIntlClientProvider locale={locale}>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
        {children}
      </ThemeProvider>
    </NextIntlClientProvider>
  );
};
