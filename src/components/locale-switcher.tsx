import { GlobeIcon } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";

import { setLocale } from "~/actions/locale";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { SUPPORTED_LOCALES } from "~/constants/i18n";

import { Button } from "./ui/button";

export const LocaleSwitcher = () => {
  const t = useTranslations("localeSwitcher");
  const locale = useLocale();

  return (
    <DropdownMenu>
      <Button variant="outline" size="sm" render={<DropdownMenuTrigger />}>
        <GlobeIcon />
      </Button>
      <DropdownMenuContent align="end">
        <DropdownMenuGroup>
          <DropdownMenuLabel>{t("label")}</DropdownMenuLabel>
          <DropdownMenuRadioGroup value={locale} onValueChange={(v) => setLocale(v)}>
            {SUPPORTED_LOCALES.map((cur) => (
              <DropdownMenuRadioItem key={cur} value={cur}>
                {t("locale", { locale: cur })}
              </DropdownMenuRadioItem>
            ))}
          </DropdownMenuRadioGroup>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
