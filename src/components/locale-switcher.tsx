"use client";

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
import { useThemeCustomizerStore } from "~/contexts/theme-customizer-context";

import { Button } from "./ui/button";

type Props = {
  variant?: "outline" | "ghost" | "secondary";
  size?: "sm" | "lg" | "icon" | "icon-sm";
};

export const LocaleSwitcher = ({ variant, size }: Props) => {
  const t = useTranslations("localeSwitcher");
  const locale = useLocale();
  const setDir = useThemeCustomizerStore((s) => s.setPageDirection);

  const handleLocaleChange = (locale: LocaleConfig) => {
    setDir(locale.dir);
    setLocale(locale.code);
  };

  return (
    <DropdownMenu>
      <Button render={<DropdownMenuTrigger />} size={size} variant={variant}>
        <GlobeIcon />
      </Button>
      <DropdownMenuContent align="end">
        <DropdownMenuGroup>
          <DropdownMenuLabel>{t("label")}</DropdownMenuLabel>
          <DropdownMenuRadioGroup
            onValueChange={handleLocaleChange}
            value={locale}
          >
            {SUPPORTED_LOCALES.map((item) => (
              <DropdownMenuRadioItem key={item.code} value={item}>
                {t("locale", { locale: item.code })}
              </DropdownMenuRadioItem>
            ))}
          </DropdownMenuRadioGroup>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
