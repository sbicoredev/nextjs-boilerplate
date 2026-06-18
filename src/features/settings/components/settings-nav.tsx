"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { JSX } from "react";

import { buttonVariants } from "~/components/ui/button";
import { ScrollArea, ScrollBar } from "~/components/ui/scroll-area";
import { cn } from "~/lib/utils";

type Props = React.HTMLAttributes<HTMLElement> & {
  items: {
    href: string;
    title: string;
    icon: JSX.Element;
  }[];
};

export const SettingsNav = ({ className, items, ...props }: Props) => {
  const pathname = usePathname();

  return (
    <ScrollArea className="w-full min-w-40 bg-background">
      <nav
        className={cn(
          "flex space-x-2 rounded-md p-2 lg:flex-col lg:space-x-0 lg:space-y-1",
          className
        )}
        {...props}
      >
        {items.map((item) => (
          <Link
            className={cn(
              buttonVariants({ variant: "ghost" }),
              pathname === item.href
                ? "bg-muted hover:bg-accent"
                : "hover:bg-accent",
              "justify-start"
            )}
            href={item.href}
            key={item.href}
          >
            <span className="me-2">{item.icon}</span>
            {item.title}
          </Link>
        ))}
      </nav>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  );
};
