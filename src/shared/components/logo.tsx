import Image from "next/image";

import { cn } from "~/lib/utils";

export const Logo = ({ className }: { className?: string }) => (
  <Image
    alt="Logo"
    className={cn("size-10", className)}
    height={100}
    src="/icon.svg"
    width={100}
  />
);
