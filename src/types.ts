import type { ROLES } from "./constants/auth";
import type {
  PAGE_DIRECTION,
  PAGE_LAYOUT,
  SIDEBAR_COLLAPSIBLE,
  SIDEBAR_SIDE,
  SIDEBAR_VARIANT,
  THEME_MODE,
  THEME_PRESETS,
} from "./constants/theme-customizer";
import type { table } from "./db/drizzle";
import type { fontRegistry } from "./lib/fonts";

declare global {
  type ThemeMode = (typeof THEME_MODE)[number];
  type ThemePreset = (typeof THEME_PRESETS)[number];
  type FontKey = keyof typeof fontRegistry;
  type PageDirection = (typeof PAGE_DIRECTION)[number];
  type PageLayout = (typeof PAGE_LAYOUT)[number];
  type SidebarSide = (typeof SIDEBAR_SIDE)[number];
  type SidebarVariant = (typeof SIDEBAR_VARIANT)[number];
  type SidebarCollapsible = (typeof SIDEBAR_COLLAPSIBLE)[number];

  type ThemeCustomizerField = {
    themeMode: ThemeMode;
    themePreset: ThemePreset;
    fontPrimary: FontKey;
    fontHeading: FontKey;
    pageLayout: PageLayout;
    pageDirection: PageDirection;
    sidebarSide: SidebarSide;
    sidebarVariant: SidebarVariant;
    sidebarCollapsible: SidebarCollapsible;
  };

  type UserRole = (typeof ROLES)[number];

  interface AuthUser {
    id: string;
    name: string;
    email: string;
    image: string | null;
    role: UserRole;
    banned: boolean | null;
  }

  interface AuthSession {
    id: string;
    token: string;
    expiresAt: Date;
  }

  interface AuthResponse {
    session: AuthSession | null;
    user: AuthUser | null;
  }

  type User = typeof table.user.$inferSelect;
  type Account = typeof table.account.$inferSelect;
  type Session = typeof table.session.$inferSelect;
}
