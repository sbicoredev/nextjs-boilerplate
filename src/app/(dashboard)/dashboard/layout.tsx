import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

import { AppBreadcrumbs } from "~/components/app-breadcrumb";
import { DashboardSidebar } from "~/components/dashboard-sidebar";
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
import { NotificationTrigger } from "~/features/notification/components/notification-trigger";
import { CustomizerTrigger } from "~/features/theme/components/customizer-trigger";
import { ThemeCustomizer } from "~/features/theme/components/theme-customizer";
import { getThemePreference } from "~/features/theme/utils";
import { constructMetadata } from "~/lib/construct-metadata";
import { authenticate } from "~/services/auth";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("metadata");
  return constructMetadata({
    title: `Dashboard | ${t("title")}`,
  });
}

type Props = {
  children: React.ReactNode;
};

export default async function DashboardLayout({ children }: Props) {
  const { user } = await authenticate();
  const preference = await getThemePreference();

  return (
    <SidebarProvider className="h-screen overflow-hidden">
      <DashboardSidebar
        collapsible={preference.sidebarCollapsible}
        side={preference.sidebarSide}
        variant={preference.sidebarVariant}
      />
      <SidebarInset className="overflow-hidden transition-all duration-200">
        <header className="sidebar sticky top-0 z-20 flex h-16 shrink-0 items-center gap-3 border-b bg-background transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
          <div className="inline-flex w-full items-center gap-3 px-4 lg:px-6">
            <SidebarTrigger className="-ms-1" />
            <Separator className="me-2" orientation="vertical" />
            <AppBreadcrumbs />
            <div className="ms-auto inline-flex items-center gap-2">
              <LocaleSwitcher size="icon-sm" variant="ghost" />
              <NotificationTrigger size="icon-sm" variant="ghost" />
              <ThemeToggle size="icon-sm" variant="ghost" />
              <CustomizerTrigger size="icon-sm" variant="ghost" />
              <Separator className="me-2" orientation="vertical" />
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
        <div
          className="@container/main overflow-auto"
          data-page-layout={preference.pageLayout}
          data-slot="dashboard-main"
        >
          {children}
        </div>
      </SidebarInset>
      <ThemeCustomizer />
    </SidebarProvider>
  );
}
