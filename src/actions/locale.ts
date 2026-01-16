"use server";

import { cookies } from "next/headers";

import { LOCALE_COOKIE } from "~/constants/i18n";

export const setLocale = async (locale: string) => {
  const store = await cookies();
  store.set(LOCALE_COOKIE, locale);
};
