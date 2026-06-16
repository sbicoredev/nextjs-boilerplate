import { BellIcon } from "lucide-react";
import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

import { AppBreadcrumbs } from "~/components/app-breadcrumb";
import { AppSidebar } from "~/components/dashboard-sidebar";
import { KBar } from "~/components/dashboard-sidebar/kbar";
import { UserMenu } from "~/components/dashboard-sidebar/user-menu";
import { LocaleSwitcher } from "~/components/locale-switcher";
import { ThemeToggle } from "~/components/theme-toggle";
import { Button } from "~/components/ui/button";
import { Separator } from "~/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "~/components/ui/sidebar";
import { UserAvatar } from "~/components/user-avatar";
import { authenticate } from "~/services/auth";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("metadata");

  return {
    title: `Dashboard | ${t("title")}`,
    description: t("desc"),
  };
}

type Props = {
  children: React.ReactNode;
};

export default async function DashboardLayout({ children }: Props) {
  const { user } = await authenticate();

  return (
    <div className="flex min-h-screen flex-col antialiased">
      <KBar>
        <SidebarProvider>
          <AppSidebar />
          <SidebarInset>
            <header className="sidebar sticky top-0 z-20 flex h-16 shrink-0 items-center gap-3 border-b bg-background transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
              <div className="inline-flex w-full items-center gap-3 px-4 lg:px-6">
                <SidebarTrigger className="-ml-1" />
                <Separator className="mr-2" orientation="vertical" />
                <AppBreadcrumbs />
                <div className="ml-auto inline-flex items-center gap-3">
                  <Button size="icon-sm" variant="ghost">
                    <BellIcon />
                  </Button>
                  <LocaleSwitcher size="icon-sm" variant="ghost" />
                  <ThemeToggle size="icon-sm" variant="ghost" />
                  <Separator className="mr-2" orientation="vertical" />
                  <UserMenu
                    menuSide="bottom"
                    trigger={
                      <Button
                        className="overflow-hidden rounded-full"
                        size="icon"
                        suppressHydrationWarning
                        variant="ghost"
                      >
                        <UserAvatar alt={user.name} src={user.image} />
                      </Button>
                    }
                    user={user}
                  />
                </div>
              </div>
            </header>
            <div className="@container/main">{children}</div>
          </SidebarInset>
        </SidebarProvider>
      </KBar>
    </div>
  );
}
