import { useLocale, useTranslations } from "next-intl";

import { SUPPORTED_LOCALES } from "~/constants/i18n";

import { LocaleSwitcherSelect } from "./locale-switcher-select";

export const LocaleSwitcher = () => {
  const t = useTranslations("localeSwitcher");
  const locale = useLocale();

  return (
    <LocaleSwitcherSelect defaultValue={locale} label={t("label")}>
      {SUPPORTED_LOCALES.map((cur) => (
        <option key={cur} value={cur}>
          {t("locale", { locale: cur })}
        </option>
      ))}
    </LocaleSwitcherSelect>
  );
};
