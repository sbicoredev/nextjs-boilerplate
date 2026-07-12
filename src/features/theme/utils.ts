import "server-only";

import { cookies } from "next/headers";
import type { StorageValue } from "zustand/middleware";

import {
  DASHBOARD_THEME_COOKIE_NAME,
  DEFAULT_THEME_PREFERENCE,
} from "~/constants/theme";

export const getThemePreference = async () => {
  const v = (await cookies()).get(DASHBOARD_THEME_COOKIE_NAME)?.value;
  if (!v) {
    return DEFAULT_THEME_PREFERENCE;
  }
  return (JSON.parse(v) as StorageValue<ThemePreference>).state;
};
