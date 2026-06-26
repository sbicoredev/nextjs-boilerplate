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
      constrainedNoPaddingOnPhone: "max-w-7xl px-0 md:px-4 lg:px-6",
      narrow: "max-w-4xl",
      narrowNoPadding: "max-w-4xl px-0 lg:px-0",
      narrowNoPaddingOnPhone: "max-w-4xl px-0 md:px-4 lg:px-6",
      fluid: "",
      fluidNoPadding: "px-0 lg:px-0",
      fluidNoPaddingOnPhone: "px-0 md:px-4 lg:px-6",
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

const Container = ({
  className,
  variant,
  render,
  ...props
}: ContainerProps) => {
  const containerClasses = cn(containerVariants({ variant }), className);

  return useRender({
    defaultTagName: "div",
    render,
    props: mergeProps<"div">(
      // @ts-expect-error
      { className: containerClasses, "data-slot": "container" },
      props
    ),
  });
};

export { Container, containerVariants };
