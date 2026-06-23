"use client";

import { Moon, Sun } from "lucide-react";

import { Button } from "~/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { useThemeCustomizerStore } from "~/contexts/theme-customizer-context";
import { useCircularTransition } from "~/hooks/use-circular-transition";

type Props = {
  variant?: "outline" | "ghost" | "secondary";
  size?: "sm" | "lg" | "icon" | "icon-sm";
};

export const ThemeToggle = ({ variant, size }: Props) => {
  const setTheme = useThemeCustomizerStore((s) => s.setThemeMode);
  const { setThemeMode } = useCircularTransition(setTheme);

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
        <DropdownMenuItem onClick={(e) => setThemeMode(e, "dark")}>
          Dark
        </DropdownMenuItem>
        <DropdownMenuItem onClick={(e) => setThemeMode(e, "light")}>
          Light
        </DropdownMenuItem>
        <DropdownMenuItem onClick={(e) => setThemeMode(e, "system")}>
          System
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
