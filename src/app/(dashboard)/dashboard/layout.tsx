import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

import { AppBreadcrumbs } from "~/components/app-breadcrumb";
import { AppSidebar } from "~/components/dashboard-sidebar";
import { KBar } from "~/components/dashboard-sidebar/kbar";
import { ThemeToggle } from "~/components/theme-toggle";
import { Separator } from "~/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "~/components/ui/sidebar";
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
  await authenticate();

  return (
    <div className="flex min-h-screen flex-col antialiased">
      <KBar>
        <SidebarProvider>
          <AppSidebar />
          <SidebarInset>
            <header className="sidebar sticky top-0 z-20 flex h-16 shrink-0 items-center gap-2 border-b bg-background transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
              <div className="inline-flex w-full items-center gap-2 px-4 lg:px-6">
                <SidebarTrigger className="-ml-1" />
                <Separator
                  className="mr-2 data-[orientation=vertical]:h-4"
                  orientation="vertical"
                />
                <AppBreadcrumbs />
                <div className="ml-auto inline-flex items-center gap-2">
                  <ThemeToggle />
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
