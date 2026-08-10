"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "~/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { useCircularTransition } from "~/hooks/use-circular-transition";

type Props = {
  variant?: "outline" | "ghost" | "secondary" | "link";
  size?: "sm" | "lg" | "icon" | "icon-sm";
};

/**
 * Public-site equivalent of `~/components/theme-toggle.tsx`.
 *
 * The dashboard's `ThemeToggle` reads/writes the cookie-persisted
 * `ThemeCustomizerContext` Zustand store, which requires that context to be
 * present — fine inside `(dashboard)`, which is already dynamic. Public
 * marketing/auth pages don't have (and shouldn't need) that context, so this
 * component uses `next-themes` instead: it's a small client-only
 * light/dark/system toggle with no cookie read, which keeps `(site)`/`(auth)`
 * eligible for static rendering.
 */
export const SiteThemeToggle = ({ variant, size }: Props) => {
  const { setTheme } = useTheme();
  const { trigger } = useCircularTransition(setTheme);

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
