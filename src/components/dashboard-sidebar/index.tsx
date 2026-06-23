"use client";

import { GalleryVerticalEndIcon } from "lucide-react";
import Link from "next/link";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "~/components/ui/sidebar";
import { useAuth } from "~/contexts/auth-context";
import { useThemeCustomizerStore } from "~/contexts/theme-customizer-context";

import { NavMain } from "./nav-main";
import { NavSecondary } from "./nav-secondary";
import { NavUser } from "./nav-user";

export const DashboardSidebar = ({
  collapsible,
  variant,
  side,
  ...props
}: React.ComponentProps<typeof Sidebar>) => {
  const { user } = useAuth();
  const hydrated = useThemeCustomizerStore((s) => s._hydrated);
  const sidebarSide = useThemeCustomizerStore((s) => s.sidebarSide);
  const sidebarVariant = useThemeCustomizerStore((s) => s.sidebarVariant);
  const sidebarCollapsible = useThemeCustomizerStore(
    (s) => s.sidebarCollapsible
  );

  return (
    <Sidebar
      collapsible={hydrated ? sidebarCollapsible : collapsible}
      side={hydrated ? sidebarSide : side}
      variant={hydrated ? sidebarVariant : variant}
      {...props}
    >
      <SidebarHeader>
        <Link
          className="flex gap-2 data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
          href="/dashboard"
        >
          <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
            <GalleryVerticalEndIcon className="size-4" />
          </div>
          <h3>Acme Inc</h3>
        </Link>
      </SidebarHeader>
      <SidebarContent>
        <NavMain />
        <NavSecondary />
      </SidebarContent>
      <SidebarFooter>{user && <NavUser user={user} />}</SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
};
