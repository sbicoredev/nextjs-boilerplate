"use client";

import { GalleryVerticalEnd } from "lucide-react";
import Link from "next/link";

import { Heading } from "~/components/ui/heading";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "~/components/ui/sidebar";
import { useSession } from "~/features/auth/api/session";

import { NavDocuments } from "./nav-documents";
import { NavMain } from "./nav-main";
import { NavSecondary } from "./nav-secondary";
import { NavUser } from "./nav-user";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { data } = useSession();

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <Link
          className="flex gap-2 data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
          href={"/dashboard"}
        >
          <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
            <GalleryVerticalEnd className="size-4" />
          </div>
          <Heading>Acme Inc</Heading>
        </Link>
      </SidebarHeader>
      <SidebarContent>
        <NavMain />
        <NavDocuments />
        <NavSecondary className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        {data?.user && <NavUser user={data.user} />}
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
