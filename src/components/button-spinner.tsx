import type { VariantProps } from "class-variance-authority";

import { Button, type buttonVariants } from "./ui/button";
import { Spinner } from "./ui/spinner";

type Props = {
  spin: boolean;
  children: React.ReactNode;
} & React.ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants>;

export const ButtonSpinner = ({
  spin,
  children,
  type = "submit",
  ...props
}: Props) => (
  <Button disabled={spin} type={type} {...props}>
    {spin && <Spinner data-icon="inline-start" />}
    {children}
  </Button>
);
