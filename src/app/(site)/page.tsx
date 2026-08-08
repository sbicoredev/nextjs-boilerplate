import Image from "next/image";
import Link from "next/link";

import { Footer } from "~/components/sections/footer";
import { Header } from "~/components/sections/header";
import { Button } from "~/components/ui/button";
import { siteConfig } from "~/configs/site-config";
import { AUTH_ROUTES } from "~/constants/auth";
import { cn } from "~/lib/utils";
import { getCurrentSession } from "~/server/auth/get-current-session";

export default async function HomePage() {
  const auth = await getCurrentSession();
  return (
    <div className="relative flex h-full min-h-screen w-full flex-col bg-card">
      <Header />
      <div className="z-10 mx-auto flex w-full max-w-5xl flex-col gap-4 px-6">
        <div className="z-10 flex h-full w-full flex-col items-center justify-center gap-4 p-12 md:p-24">
          <Button
            className={cn(
              "hidden h-8 rounded-full bg-white/40 px-3 font-bold text-sm backdrop-blur hover:text-primary md:flex dark:bg-secondary"
            )}
            variant="outline"
          >
            <span className="flex items-center font-medium text-primary/60">
              Introducing
              <svg
                aria-label="Site Logo"
                className="mx-1 h-3.5 w-3.5 text-primary"
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
            </span>
            {siteConfig.name}
          </Button>
          <h1 className="text-center font-bold text-6xl text-primary leading-tight md:text-7xl lg:leading-tight">
            Production Ready
            <br />
            Stack for Nextjs
          </h1>
          <p className="max-w-3xl text-center text-lg text-muted-foreground leading-normal md:text-xl">
            Launch in hours with a modern{" "}
            <span className="font-medium text-primary">
              Production-Ready Stack
            </span>
            <br className="hidden lg:inline-block" /> integration.
            Next.js-powered. Open Source.
          </p>
          <div className="mt-2 flex w-full items-center justify-center gap-2">
            <Button
              className="hidden sm:flex"
              nativeButton={false}
              render={
                <Link href={auth?.user ? "/dashboard" : AUTH_ROUTES.signIn} />
              }
              size="sm"
            >
              {auth?.user ? "Go To Dashboard" : "Get Started"}
            </Button>
            <Button
              className="hidden sm:flex dark:bg-secondary dark:hover:opacity-80"
              nativeButton={false}
              render={
                <Link
                  href={siteConfig.githubRepo}
                  rel="noreferrer"
                  target="_blank"
                />
              }
              size="sm"
              variant="outline"
            >
              Explore Documentation
            </Button>
          </div>
        </div>
      </div>
      <Footer />

      <Image
        alt="Hero"
        className="fixed top-0 left-0 z-0 h-full w-full opacity-60 dark:invert"
        height={500}
        src="/assets/shadow.png"
        width={500}
      />
      <div className="base-grid fixed h-screen w-screen opacity-40" />
      <div className="fixed bottom-0 h-screen w-screen bg-linear-to-t from-[hsl(var(--card))] to-transparent" />
    </div>
  );
}
