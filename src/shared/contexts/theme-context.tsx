"use client";

import {
  createContext,
  type PropsWithChildren,
  useContext,
  useState,
} from "react";
import { createStore, type StoreApi, useStore } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

import {
  DASHBOARD_THEME_COOKIE_NAME,
  DEFAULT_THEME_PREFERENCE,
  type PAGE_DIRECTION,
  type PAGE_LAYOUT,
  type SIDEBAR_COLLAPSIBLE,
  type SIDEBAR_SIDE,
  type SIDEBAR_VARIANT,
  type THEME_MODE,
  type THEME_PRESETS,
} from "~/constants/theme";
import type { fontRegistry } from "~/lib/fonts";
import { createCookieStorage } from "~/lib/zustand-cookie-storage";

export type ThemeMode = (typeof THEME_MODE)[number];
export type ThemePreset = (typeof THEME_PRESETS)[number];
export type FontKey = keyof typeof fontRegistry;
export type PageDirection = (typeof PAGE_DIRECTION)[number];
export type PageLayout = (typeof PAGE_LAYOUT)[number];
export type SidebarSide = (typeof SIDEBAR_SIDE)[number];
export type SidebarVariant = (typeof SIDEBAR_VARIANT)[number];
export type SidebarCollapsible = (typeof SIDEBAR_COLLAPSIBLE)[number];

export type ThemePreference = {
  isCustomizerOpen: boolean;
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

type ThemeCustomizerStore = ThemePreference & {
  _hydrated: boolean;
  setCustomizerOpen: (v: boolean) => void;
  setThemeMode: (v: ThemeMode) => void;
  setThemePreset: (v: ThemePreset) => void;
  setFontPrimary: (v: FontKey) => void;
  setFontHeading: (v: FontKey) => void;
  setPageDirection: (v: PageDirection) => void;
  setPageLayout: (v: PageLayout) => void;
  setSidebarSide: (v: SidebarSide) => void;
  setSidebarVariant: (v: SidebarVariant) => void;
  setSidebarCollapsible: (v: SidebarCollapsible) => void;
  setHydrated: (v: boolean) => void;
  reset: () => void;
};

const createThemeCustomizerStore = (init: ThemePreference) =>
  createStore<ThemeCustomizerStore>()(
    persist(
      (set) => ({
        isCustomizerOpen: false,
        themeMode: init.themeMode,
        themePreset: init.themePreset,
        fontPrimary: init.fontPrimary,
        fontHeading: init.fontHeading,
        pageDirection: init.pageDirection,
        pageLayout: init.pageLayout,
        sidebarSide: init.sidebarSide,
        sidebarVariant: init.sidebarVariant,
        sidebarCollapsible: init.sidebarCollapsible,
        _hydrated: false,
        setCustomizerOpen: (open) => set({ isCustomizerOpen: open }),
        setThemeMode: (themeMode) => set({ themeMode }),
        setThemePreset: (themePreset) => set({ themePreset }),
        setFontPrimary: (fontPrimary) => set({ fontPrimary }),
        setFontHeading: (fontHeading) => set({ fontHeading }),
        setPageDirection: (pageDirection) => set({ pageDirection }),
        setPageLayout: (pageLayout) => set({ pageLayout }),
        setSidebarSide: (sidebarSide) => set({ sidebarSide }),
        setSidebarVariant: (sidebarVariant) => set({ sidebarVariant }),
        setSidebarCollapsible: (sidebarCollapsible) =>
          set({ sidebarCollapsible }),
        setHydrated: (_hydrated) => set({ _hydrated }),
        reset: () => set(DEFAULT_THEME_PREFERENCE),
      }),
      {
        name: DASHBOARD_THEME_COOKIE_NAME,
        storage: createJSONStorage(() =>
          createCookieStorage({
            sameSite: "strict",
            expires: Date.now() + 24 * 60 * 60 * 1000, // 24 hours
          })
        ),
        onRehydrateStorage: () => (state) => {
          state?.setHydrated(true);
        },
      }
    )
  );

type ContextState = {
  store: StoreApi<ThemeCustomizerStore>;
  allowedFonts: { value: string; label: string }[];
};

const Context = createContext<ContextState | null>(null);

export const ThemeCustomizerContext = ({
  children,
  allowedFonts,
  themeStoreState,
}: PropsWithChildren<{
  themeStoreState: ThemePreference;
  allowedFonts: { value: string; label: string }[];
}>) => {
  const [store] = useState(() => createThemeCustomizerStore(themeStoreState));

  return <Context value={{ store, allowedFonts }}>{children}</Context>;
};

export const useThemeCustomizer = () => {
  const context = useContext(Context);
  if (!context) {
    throw new Error("Lack of ThemeCustomizerContext");
  }
  return context;
};

export function useThemeCustomizerStore(): ThemeCustomizerStore;
export function useThemeCustomizerStore<T>(
  selector: (s: ThemeCustomizerStore) => T
): T;
export function useThemeCustomizerStore<T>(
  selector?: (s: ThemeCustomizerStore) => T
) {
  const context = useContext(Context);
  if (!context) {
    throw new Error("Lack of ThemeCustomizerContext");
  }
  // biome-ignore lint/style/noNonNullAssertion: explain
  return useStore(context.store, selector!);
}
