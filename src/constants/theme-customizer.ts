export const DASHBOARD_THEME_COOKIE_NAME = "dashboard-theme";

export const THEME_MODE = ["system", "dark", "light"] as const;

export const THEME_PRESETS = [
  "default",
  "caffeine",
  "catppuccin",
  "elegant-luxury",
  "modern-minimal",
  "ocean-breeze",
  "solar-dusk",
] as const;

export const PAGE_LAYOUT = ["full-width", "centered"] as const;

export const SIDEBAR_SIDE = ["left", "right"] as const;
export const SIDEBAR_VARIANT = ["sidebar", "floating", "inset"] as const;
export const SIDEBAR_COLLAPSIBLE = ["offcanvas", "icon", "none"] as const;

export const DEFAULT_THEME_PREFERENCE: ThemeCustomizerField = {
  themeMode: "system",
  themePreset: "default",
  fontPrimary: "geist",
  fontHeading: "montserrat",
  pageLayout: "full-width",
  sidebarSide: "left",
  sidebarVariant: "sidebar",
  sidebarCollapsible: "icon",
};
