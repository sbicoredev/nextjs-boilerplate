import type { Metadata } from "next";
import { cookies } from "next/headers";
import { getTranslations } from "next-intl/server";
import type { StorageValue } from "zustand/middleware";

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
import {
  DASHBOARD_THEME_COOKIE_NAME,
  DEFAULT_THEME_PREFERENCE,
} from "~/constants/theme-customizer";
import { NotificationTrigger } from "~/features/notification/components/notification-trigger";
import { CustomizerTrigger } from "~/features/theme-customizer/components/customizer-trigger";
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
  const v = (await cookies()).get(DASHBOARD_THEME_COOKIE_NAME)?.value;
  const settings =
    (JSON.parse(v ?? "{}") as StorageValue<ThemeCustomizerField> | undefined)
      ?.state || DEFAULT_THEME_PREFERENCE;

  return (
    <SidebarProvider className="h-screen overflow-hidden">
      <DashboardSidebar
        collapsible={settings.sidebarCollapsible}
        side={settings.sidebarSide}
        variant={settings.sidebarVariant}
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
          data-page-layout={settings.pageLayout}
          data-slot="dashboard-main"
        >
          {children}
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
