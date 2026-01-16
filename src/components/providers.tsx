import { NextIntlClientProvider } from "next-intl";
import type { PropsWithChildren } from "react";

import { LocaleSwitcher } from "./locale-switcher";

type Props = PropsWithChildren & {
  locale: string;
};

export const Providers = ({ children, locale }: Props) => {
  return (
    <NextIntlClientProvider locale={locale}>
      <LocaleSwitcher />
      {children}
    </NextIntlClientProvider>
  );
};
