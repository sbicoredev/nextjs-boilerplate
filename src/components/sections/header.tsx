"use client";

import {
  BellIcon,
  CreditCardIcon,
  LogOutIcon,
  StarIcon,
  UserIcon,
} from "lucide-react";
import Link from "next/link";
import { useEffect } from "react";

import { Logo } from "~/components/logo";
import { ThemeToggle } from "~/components/theme-toggle";
import { Button } from "~/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { UserAvatar } from "~/components/user-avatar";
import { siteConfig } from "~/configs/site-config";
import { AUTH_ROUTES } from "~/constants/auth";
import { useAuth } from "~/contexts/auth-context";
import { useSignOut } from "~/features/auth/hooks/use-signout";

export const Header = () => {
  const { user, needSignOut } = useAuth();
  const { mutate: signOut } = useSignOut();

  // incase db session revoked and session cookies left in browser
  useEffect(() => {
    if (needSignOut) {
      signOut();
    }
  }, [needSignOut]);

  return (
    <header>
      <div className="sticky top-0 z-50 mx-auto flex w-full max-w-5xl items-center justify-between p-6 py-3">
        <Link className="flex h-10 items-center gap-1" href="/">
          <Logo />
        </Link>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-6">
            <Button
              className="group flex gap-3 px-0 text-primary/80 hover:text-primary hover:no-underline"
              nativeButton={false}
              render={
                <Link
                  href={siteConfig.githubRepo}
                  rel="noreferrer"
                  target="_blank"
                />
              }
              size="sm"
              variant="link"
            >
              <svg
                className="size-6"
                fill="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
              <span className="hidden select-none items-center gap-1 rounded-full bg-green-500/5 px-2 py-1 pr-2.5 font-medium text-green-600 text-xs tracking-tight ring-1 ring-green-600/20 ring-inset backdrop-blur-sm md:flex dark:bg-yellow-800/40 dark:text-yellow-100 dark:ring-yellow-200/50">
                <StarIcon
                  className="h-3 w-3 text-green-600 dark:text-yellow-100"
                  fill="currentColor"
                />
                Star on GitHub
              </span>
            </Button>
          </div>
          <Button
            nativeButton={false}
            render={
              <Link
                href={siteConfig.author.x}
                rel="noreferrer"
                target="_blank"
              />
            }
            size="icon-sm"
            variant="link"
          >
            <svg
              className="size-4 text-primary"
              strokeLinejoin="round"
              viewBox="0 0 16 16"
            >
              <path
                clipRule="evenodd"
                d="M0.5 0.5H5.75L9.48421 5.71053L14 0.5H16L10.3895 6.97368L16.5 15.5H11.25L7.51579 10.2895L3 15.5H1L6.61053 9.02632L0.5 0.5ZM12.0204 14L3.42043 2H4.97957L13.5796 14H12.0204Z"
                fill="currentColor"
                fillRule="evenodd"
              />
            </svg>
          </Button>
          <ThemeToggle size="icon-sm" variant="link" />
          <Button
            nativeButton={false}
            render={<Link href={user ? "/dashboard" : AUTH_ROUTES.signIn} />}
            size="sm"
          >
            {user ? "Dashboard" : "Get Started"}
          </Button>
          {user && (
            <DropdownMenu>
              <DropdownMenuTrigger>
                <UserAvatar alt={user.name} src={user.image} />
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                className="min-w-56 rounded-lg"
                side="bottom"
                sideOffset={4}
              >
                <DropdownMenuGroup>
                  <DropdownMenuLabel className="p-0 font-normal">
                    <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                      <UserAvatar alt={user.name} src={user?.image || null} />
                      <div className="grid flex-1 text-left text-sm leading-tight">
                        <span className="truncate font-medium">
                          {user.name}
                        </span>
                        <span className="truncate text-muted-foreground text-xs">
                          {user.email}
                        </span>
                      </div>
                    </div>
                  </DropdownMenuLabel>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuItem>
                    <UserIcon />
                    Account
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <CreditCardIcon />
                    Billing
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    nativeButton={false}
                    render={<Link href="/dashboard/notifications" />}
                  >
                    <BellIcon />
                    Notifications
                  </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => signOut()}>
                  <LogOutIcon />
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </div>
    </header>
  );
};
