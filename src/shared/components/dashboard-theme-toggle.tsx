"use client";

import { Moon, Sun } from "lucide-react";
import { useEffect } from "react";

import { Button } from "~/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { useThemeCustomizerStore } from "~/contexts/theme-context";
import { useCircularTransition } from "~/hooks/use-circular-transition";

type Props = {
  variant?: "outline" | "ghost" | "secondary" | "link";
  size?: "sm" | "lg" | "icon" | "icon-sm";
};

export const DashboardThemeToggle = ({ variant, size }: Props) => {
  const themeMode = useThemeCustomizerStore((s) => s.themeMode);
  const setThemeMode = useThemeCustomizerStore((s) => s.setThemeMode);
  const { trigger } = useCircularTransition(setThemeMode);

  useEffect(() => {
    if (themeMode !== "system") {
      setThemeMode(themeMode);
      const root = document.documentElement;
      root.classList.toggle("dark", themeMode === "dark");
      root.style.colorScheme = themeMode === "dark" ? "dark" : "light";
      return;
    }
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const handler = (e: MediaQueryListEvent) => {
      const isDark = e.matches;
      setThemeMode(isDark ? "dark" : "light");
      const root = document.documentElement;
      root.classList.toggle("dark", isDark);
      root.style.colorScheme = isDark ? "dark" : "light";
    };
    mq.addEventListener("change", handler);
    return () => {
      mq.removeEventListener("change", handler);
    };
  }, [themeMode, setThemeMode]);

  return (
    <DropdownMenu>
      <Button
        className="mode-toggle-button"
        render={<DropdownMenuTrigger />}
        size={size}
        variant={variant}
      >
        <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
        <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
        <span className="sr-only">Toggle theme</span>
      </Button>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={(e) => trigger(e, "dark")}>
          Dark
        </DropdownMenuItem>
        <DropdownMenuItem onClick={(e) => trigger(e, "light")}>
          Light
        </DropdownMenuItem>
        <DropdownMenuItem onClick={(e) => trigger(e, "system")}>
          System
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
