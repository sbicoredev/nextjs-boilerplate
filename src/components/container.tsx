import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";
import { cva, type VariantProps } from "class-variance-authority";
import type React from "react";

import { cn } from "~/lib/utils";

const containerVariants = cva("mx-auto p-4 lg:p-6", {
  variants: {
    variant: {
      constrained: "max-w-7xl",
      constrainedNoPadding: "max-w-7xl px-0 lg:px-0",
      constrainedNoPaddingOnPhone: "max-w-7xl px-0",
      narrowConstrained: "max-w-4xl",
      narrowConstrainedNoPadding: "max-w-4xl px-0 lg:px-0",
      narrowConstrainedNoPaddingOnPhone: "max-w-4xl px-0",
      fluid: "",
      fluidNoPadding: "px-0 lg:px-0",
      fluidNoPaddingOnPhone: "px-0",
      responsive: "!container",
      responsiveNoPadding: "!container px-0",
    },
  },
  defaultVariants: {
    variant: "constrained",
  },
});

export type ContainerProps = React.HTMLAttributes<HTMLDivElement> &
  VariantProps<typeof containerVariants> &
  useRender.ComponentProps<"div"> & {};

const Container = ({ className, variant, render, ...props }: ContainerProps) => {
  const containerClasses = cn(containerVariants({ variant }), className);

  return useRender({
    defaultTagName: "div",
    render,
    props: mergeProps<"div">({ className: containerClasses }, props),
  });
};

export { Container, containerVariants };
