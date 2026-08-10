"use client";

import Link from "next/link";

import { Button } from "~/components/ui/button";
import { AUTH_ROUTES } from "~/constants/auth";
import { authClient } from "~/server/auth/auth-client";

const menuItems = [
  { name: "Features", href: "#link" },
  { name: "Solution", href: "#link" },
  { name: "Pricing", href: "#link" },
  { name: "About", href: "#link" },
];

// See Header.tsx for why this reads the session client-side rather than
// from the server-injected AuthContext used inside (dashboard).
export const Nav = () => {
  const { data } = authClient.useSession();
  const user = data?.user ?? null;
  return (
    <>
      <nav className="absolute inset-0 m-auto hidden size-fit lg:block">
        <ul className="flex gap-8 text-sm">
          {menuItems.map((item) => (
            <li key={`nav-item-${item.name}`}>
              <Link
                className="block text-muted-foreground duration-150 hover:text-accent-foreground"
                href={item.href}
              >
                <span>{item.name}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <div className="mb-6 in-data-[state=active]:block hidden w-full flex-wrap items-center justify-end space-y-8 rounded-3xl border bg-background p-6 shadow-2xl shadow-zinc-300/20 md:flex-nowrap lg:m-0 lg:flex lg:in-data-[state=active]:flex lg:w-fit lg:gap-6 lg:space-y-0 lg:border-transparent lg:bg-transparent lg:p-0 lg:shadow-none dark:shadow-none dark:lg:bg-transparent">
        <nav className="lg:hidden">
          <ul className="space-y-6 text-base">
            {menuItems.map((item) => (
              <li key={`nav-item-${item.name}`}>
                <Link
                  className="block text-muted-foreground duration-150 hover:text-accent-foreground"
                  href={item.href}
                >
                  <span>{item.name}</span>
                </Link>
              </li>
            ))}
            <li className="flex gap-2">
              {user ? (
                <Button
                  nativeButton={false}
                  render={<Link href="/dashboard" />}
                  size="sm"
                  variant="outline"
                >
                  Dashboard
                </Button>
              ) : (
                <>
                  <Button
                    nativeButton={false}
                    render={<Link href={AUTH_ROUTES.signIn} />}
                    size="sm"
                  >
                    Login
                  </Button>
                  <Button
                    nativeButton={false}
                    render={<Link href={AUTH_ROUTES.signUp} />}
                    size="sm"
                  >
                    Sign Up
                  </Button>
                </>
              )}
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
};
