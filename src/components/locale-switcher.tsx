import { useLocale, useTranslations } from "next-intl";

import { SUPPORTED_LOCALES } from "~/constants/i18n";

import { LocaleSwitcherSelect } from "./locale-switcher-select";
import { SelectItem } from "./ui/select";

export const LocaleSwitcher = () => {
  const t = useTranslations("localeSwitcher");
  const locale = useLocale();

  return (
    <LocaleSwitcherSelect defaultValue={locale} label={t("label")}>
      {SUPPORTED_LOCALES.map((cur) => (
        <SelectItem key={cur} value={cur}>
          {t("locale", { locale: cur })}
        </SelectItem>
      ))}
    </LocaleSwitcherSelect>
  );
};
