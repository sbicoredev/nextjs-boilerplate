import { NextIntlClientProvider } from "next-intl";
import type { PropsWithChildren } from "react";

type Props = PropsWithChildren & {
  locale: string;
};

export const Providers = ({ children, locale }: Props) => {
  return <NextIntlClientProvider locale={locale}>{children}</NextIntlClientProvider>;
};
