"use client";

import { ChevronsUpDownIcon } from "lucide-react";

import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "~/components/ui/sidebar";

import { UserAvatar } from "../user-avatar";
import { UserMenu } from "./user-menu";

export function NavUser({ user }: { user: AuthUser }) {
  const { isMobile } = useSidebar();

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <UserMenu
          menuSide={isMobile ? "bottom" : "right"}
          trigger={
            <SidebarMenuButton
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
              size="lg"
            >
              <UserAvatar alt={user.name} src={user.image} />
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">{user.name}</span>
                <span className="truncate text-muted-foreground text-xs">
                  {user.email}
                </span>
              </div>
              <ChevronsUpDownIcon className="ml-auto size-4" />
            </SidebarMenuButton>
          }
          user={user}
        />
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
