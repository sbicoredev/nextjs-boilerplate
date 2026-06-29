export const LOCALE_COOKIE = "locale";

export const SUPPORTED_LOCALES: LocaleConfig[] = [
  { code: "en", name: "English", dir: "ltr" },
  { code: "bn", name: "Bangla", dir: "ltr" },
];

export const DEFAULT_LOCALE: (typeof SUPPORTED_LOCALES)[number]["code"] = "en";
