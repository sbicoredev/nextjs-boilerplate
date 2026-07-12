"use client";

import { PaletteIcon } from "lucide-react";

import { Button } from "~/components/ui/button";
import { useThemeCustomizerStore } from "~/contexts/theme-context";

type Props = {
  variant?: "outline" | "ghost" | "secondary";
  size?: "sm" | "lg" | "icon" | "icon-sm";
};

export const CustomizerTrigger = ({ variant, size }: Props) => {
  const setOpen = useThemeCustomizerStore((s) => s.setCustomizerOpen);

  return (
    <Button
      aria-label="Customize dashboard"
      onClick={() => setOpen(true)}
      size={size}
      variant={variant}
    >
      <PaletteIcon aria-hidden="true" />
    </Button>
  );
};
