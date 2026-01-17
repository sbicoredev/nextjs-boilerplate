import Link from "next/link";

import { Logo } from "~/components/logo";
import { Gemini, GooglePaLM, MagicUI, MediaWiki, Replit, VSCodium } from "~/components/logos";
import { Button } from "~/components/ui/button";
import { cn } from "~/lib/utils";

export function IntegrationsSection() {
  return (
    <section>
      <div className="bg-muted py-24 md:py-32">
        <div className="mx-auto max-w-5xl px-6">
          <div className="relative mx-auto flex max-w-sm items-center justify-between">
            <div className="space-y-6">
              <IntegrationCard position="left-top">
                <Gemini />
              </IntegrationCard>
              <IntegrationCard position="left-middle">
                <Replit />
              </IntegrationCard>
              <IntegrationCard position="left-bottom">
                <MagicUI />
              </IntegrationCard>
            </div>
            <div className="mx-auto my-2 flex w-fit justify-center gap-2">
              <div className="relative z-20 rounded-2xl border bg-muted p-1">
                <IntegrationCard
                  className="size-16 border-black/25 shadow-black-950/10 shadow-xl dark:border-white/25 dark:bg-background dark:shadow-white/10"
                  isCenter={true}
                >
                  <Logo />
                </IntegrationCard>
              </div>
            </div>
            <div
              role="presentation"
              className="absolute inset-1/3 bg-[radial-gradient(var(--dots-color)_1px,transparent_1px)] opacity-50 [--dots-color:black] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)] dark:[--dots-color:white]"
            ></div>

            <div className="space-y-6">
              <IntegrationCard position="right-top">
                <VSCodium />
              </IntegrationCard>
              <IntegrationCard position="right-middle">
                <MediaWiki />
              </IntegrationCard>
              <IntegrationCard position="right-bottom">
                <GooglePaLM />
              </IntegrationCard>
            </div>
          </div>
          <div className="mx-auto mt-12 max-w-lg space-y-6 text-center">
            <h2 className="text-balance font-semibold text-3xl md:text-4xl">
              Integrate with your favorite tools
            </h2>
            <p className="text-muted-foreground">
              Connect seamlessly with popular platforms and services to enhance your workflow.
            </p>

            <Button variant="outline" size="sm" render={<Link href="#" />} nativeButton={false}>
              Get Started
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

const IntegrationCard = ({
  children,
  className,
  position,
  isCenter = false,
}: {
  children: React.ReactNode;
  className?: string;
  position?:
    | "left-top"
    | "left-middle"
    | "left-bottom"
    | "right-top"
    | "right-middle"
    | "right-bottom";
  isCenter?: boolean;
}) => {
  return (
    <div
      className={cn(
        "relative flex size-12 rounded-xl border bg-background dark:bg-transparent",
        className,
      )}
    >
      <div className={cn("relative z-20 m-auto size-fit *:size-6", isCenter && "*:size-8")}>
        {children}
      </div>
      {position && !isCenter && (
        <div
          className={cn(
            "absolute z-10 h-px bg-linear-to-r to-muted-foreground/25",
            position === "left-top" && "top-1/2 left-full w-32 origin-left rotate-25",
            position === "left-middle" && "top-1/2 left-full w-30 origin-left",
            position === "left-bottom" && "top-1/2 left-full w-32 origin-left rotate-[-25deg]",
            position === "right-top" &&
              "top-1/2 right-full w-32 origin-right rotate-[-25deg] bg-linear-to-l",
            position === "right-middle" && "top-1/2 right-full w-30 origin-right bg-linear-to-l",
            position === "right-bottom" &&
              "top-1/2 right-full w-32 origin-right rotate-25 bg-linear-to-l",
          )}
        />
      )}
    </div>
  );
};
