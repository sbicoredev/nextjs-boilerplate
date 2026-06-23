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
} from "~/constants/theme-customizer";
import { createCookieStorage } from "~/lib/zustand-cookie-storage";

type ThemeCustomizerStore = ThemeCustomizerField & {
  _hydrated: boolean;
  setThemeMode: (m: ThemeMode) => void;
  setThemePreset: (m: ThemePreset) => void;
  setFontPrimary: (f: FontKey) => void;
  setFontHeading: (f: FontKey) => void;
  setSidebarSide: (v: SidebarSide) => void;
  setSidebarVariant: (v: SidebarVariant) => void;
  setSidebarCollapsible: (c: SidebarCollapsible) => void;
  setHydrated: (v: boolean) => void;
  reset: () => void;
};

const createThemeCustomizerStore = (init: ThemeCustomizerField) =>
  createStore<ThemeCustomizerStore>()(
    persist(
      (set) => ({
        themeMode: init.themeMode,
        themePreset: init.themePreset,
        fontPrimary: init.fontPrimary,
        fontHeading: init.fontHeading,
        sidebarSide: init.sidebarSide,
        sidebarVariant: init.sidebarVariant,
        sidebarCollapsible: init.sidebarCollapsible,
        _hydrated: false,
        setThemeMode: (themeMode) => set({ themeMode }),
        setThemePreset: (themePreset) => set({ themePreset }),
        setFontPrimary: (fontPrimary) => set({ fontPrimary }),
        setFontHeading: (fontHeading) => set({ fontHeading }),
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
  themeStoreState: ThemeCustomizerField;
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
