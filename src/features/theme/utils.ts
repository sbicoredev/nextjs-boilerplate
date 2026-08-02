import "server-only";

import { cookies } from "next/headers";
import { cache } from "react";
import type { StorageValue } from "zustand/middleware";

import {
  DASHBOARD_THEME_COOKIE_NAME,
  DEFAULT_THEME_PREFERENCE,
} from "~/constants/theme";
import type { ThemePreference } from "~/contexts/theme-context";

export const getThemePreference = cache(async () => {
  const v = (await cookies()).get(DASHBOARD_THEME_COOKIE_NAME)?.value;
  if (!v) {
    return DEFAULT_THEME_PREFERENCE;
  }
  return (
    (JSON.parse(v) as Nullable<StorageValue<ThemePreference>>)?.state ||
    DEFAULT_THEME_PREFERENCE
  );
});
