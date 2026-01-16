export const LOCALE_COOKIE = "locale";
export const SUPPORTED_LOCALES = ["en", "bn", "fr"] as const;
export const DEFAULT_LOCALE: (typeof SUPPORTED_LOCALES)[number] = "en";
