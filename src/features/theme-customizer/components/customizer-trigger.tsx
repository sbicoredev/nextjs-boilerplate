"use client";

import { PaletteIcon } from "lucide-react";
import { useState } from "react";

import { Button } from "~/components/ui/button";

import { Customizer } from "./customizer";

type Props = {
  variant?: "outline" | "ghost" | "secondary";
  size?: "sm" | "lg" | "icon" | "icon-sm";
};

export const CustomizerTrigger = ({ variant, size }: Props) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button
        aria-label="Customize dashboard"
        onClick={() => setOpen(true)}
        size={size}
        variant={variant}
      >
        <PaletteIcon aria-hidden="true" />
      </Button>
      <Customizer onOpenChange={setOpen} open={open} />
    </>
  );
};
