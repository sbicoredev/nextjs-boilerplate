"use client";

import { MenuIcon, XIcon } from "lucide-react";
import Link from "next/link";
import React from "react";

import { Logo } from "~/components/logo";
import { cn } from "~/lib/utils";

import { LocaleSwitcher } from "../locale-switcher";
import { ThemeToggle } from "../theme-toggle";
import { Nav } from "./nav";

export const Header = () => {
  const [menuState, setMenuState] = React.useState(false);
  const [isScrolled, setIsScrolled] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header>
      <div data-state={menuState && "active"} className="fixed z-50 w-full px-2">
        <div
          className={cn(
            "mx-auto mt-2 max-w-6xl px-6 transition-all duration-300 lg:px-12",
            isScrolled && "max-w-4xl rounded-2xl border bg-background/50 backdrop-blur-lg lg:px-5",
          )}
        >
          <div className="relative flex flex-wrap items-center justify-between gap-6 py-3 lg:gap-0 lg:py-4">
            <div className="flex w-full justify-between lg:w-auto">
              <Link href="/" aria-label="home" className="flex items-center space-x-2">
                <Logo />
              </Link>

              <div className="flex gap-3">
                <div className="flex gap-2 lg:hidden">
                  <LocaleSwitcher />
                  <ThemeToggle />
                </div>

                <button
                  type="button"
                  onClick={() => setMenuState(!menuState)}
                  aria-label={menuState === true ? "Close Menu" : "Open Menu"}
                  className="relative z-20 -m-2.5 -mr-4 block cursor-pointer p-2.5 lg:hidden"
                >
                  <MenuIcon className="m-auto size-6 in-data-[state=active]:rotate-180 in-data-[state=active]:scale-0 in-data-[state=active]:opacity-0 duration-200" />
                  <XIcon className="absolute inset-0 m-auto size-6 -rotate-180 in-data-[state=active]:rotate-0 in-data-[state=active]:scale-100 scale-0 in-data-[state=active]:opacity-100 opacity-0 duration-200" />
                </button>
              </div>
            </div>
            <Nav isScrolled={isScrolled} />
          </div>
        </div>
      </div>
    </header>
  );
};
