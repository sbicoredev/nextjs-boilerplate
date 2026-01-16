import { cookies } from "next/headers";
import { getRequestConfig } from "next-intl/server";

import { DEFAULT_LOCALE, LOCALE_COOKIE } from "~/constants/i18n";

export default getRequestConfig(async (params) => {
  const store = await cookies();
  const locale = params.locale || store.get(LOCALE_COOKIE)?.value || DEFAULT_LOCALE;

  return {
    locale,
    messages: (await import(`./messages/${locale}.json`)).default,
  };
});
