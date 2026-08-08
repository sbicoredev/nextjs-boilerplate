import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
} from "~/components/ui/sidebar";

import { CommandMenu } from "./command-menu";

type Props = React.ComponentPropsWithoutRef<typeof SidebarGroup>;

export const NavSecondary = (props: Props) => (
  <SidebarGroup {...props}>
    <SidebarGroupLabel>Tools</SidebarGroupLabel>
    <SidebarMenu>
      <SidebarMenuItem>
        <CommandMenu />
      </SidebarMenuItem>
    </SidebarMenu>
  </SidebarGroup>
);
