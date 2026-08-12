import { redirect } from "next/navigation";

import { AppBreadcrumbs } from "~/components/app-breadcrumb";
import { DashboardSidebar } from "~/components/dashboard-sidebar";
import { UserMenu } from "~/components/dashboard-sidebar/user-menu";
import { DashboardThemeToggle } from "~/components/dashboard-theme-toggle";
import { Button } from "~/components/ui/button";
import { Separator } from "~/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "~/components/ui/sidebar";
import { UserAvatar } from "~/components/user-avatar";
import { AUTH_ROUTES } from "~/constants/auth";
import { AuthContext } from "~/contexts/auth-context";
import { NotificationTrigger } from "~/features/notification";
import {
  CustomizerTrigger,
  getThemePreference,
  ThemeCustomizer,
} from "~/features/theme";
import { getCurrentSession } from "~/server/auth/get-current-session";

type Props = {
  children: React.ReactNode;
};

export default async function DashboardLayout({ children }: Props) {
  const auth = await getCurrentSession();
  if (!auth?.user) {
    return redirect(AUTH_ROUTES.signIn);
  }
  const preference = await getThemePreference();

  return (
    <AuthContext value={{ user: auth.user, session: auth.session }}>
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
                <NotificationTrigger size="icon-sm" variant="ghost" />
                <DashboardThemeToggle size="icon-sm" variant="ghost" />
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
                      <UserAvatar alt={auth.user.name} src={auth.user.image} />
                    </Button>
                  }
                  user={auth.user}
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
    </AuthContext>
  );
}
