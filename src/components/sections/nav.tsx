"use client";

import Link from "next/link";

import { AUTH_URI } from "~/constants/auth";
import { cn } from "~/lib/utils";

import { LocaleSwitcher } from "../locale-switcher";
import { ThemeToggle } from "../theme-toggle";
import { Button } from "../ui/button";

const menuItems = [
  { name: "Features", href: "#link" },
  { name: "Solution", href: "#link" },
  { name: "Pricing", href: "#link" },
  { name: "About", href: "#link" },
];

type Props = {
  isScrolled: boolean;
};

export const Nav = ({ isScrolled }: Props) => {
  return (
    <>
      <nav className="absolute inset-0 m-auto hidden size-fit lg:block">
        <ul className="flex gap-8 text-sm">
          {menuItems.map((item, index) => (
            <li key={`${item.name}-${index}`}>
              <Link
                href={item.href}
                className="block text-muted-foreground duration-150 hover:text-accent-foreground"
              >
                <span>{item.name}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <div className="mb-6 in-data-[state=active]:block hidden w-full flex-wrap items-center justify-end space-y-8 rounded-3xl border bg-background p-6 shadow-2xl shadow-zinc-300/20 md:flex-nowrap lg:m-0 lg:flex lg:in-data-[state=active]:flex lg:w-fit lg:gap-6 lg:space-y-0 lg:border-transparent lg:bg-transparent lg:p-0 lg:shadow-none dark:shadow-none dark:lg:bg-transparent">
        <div className="lg:hidden">
          <ul className="space-y-6 text-base">
            {menuItems.map((item, index) => (
              <li key={`${item.name}-${index}`}>
                <Link
                  href={item.href}
                  className="block text-muted-foreground duration-150 hover:text-accent-foreground"
                >
                  <span>{item.name}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="flex w-full gap-3">
          <div className="hidden gap-2 lg:flex">
            <LocaleSwitcher />
            <ThemeToggle />
          </div>
          <Button
            variant="outline"
            size="sm"
            render={<Link href={AUTH_URI.signin} />}
            nativeButton={false}
          >
            Login
          </Button>
          <Button
            size="sm"
            className={cn(isScrolled && "lg:hidden")}
            render={<Link href={AUTH_URI.signup} />}
            nativeButton={false}
          >
            Sign Up
          </Button>
        </div>
      </div>
    </>
  );
};
