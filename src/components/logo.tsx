import Image from "next/image";

import { cn } from "~/lib/utils";

export const Logo = ({ className }: { className?: string }) => (
  <Image
    alt="Logo"
    className={cn(className, "w-40")}
    height={40}
    loading="eager"
    src="/assets/logo.svg"
    width={150}
  />
);
