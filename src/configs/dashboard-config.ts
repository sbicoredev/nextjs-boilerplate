import {
  CheckCircleIcon,
  type LucideIcon,
  LucideLayoutDashboard,
  SettingsIcon,
  UsersIcon,
} from "lucide-react";

export type SidebarNav = {
  label: string;
  items: Array<
    | {
        title: string;
        icon: LucideIcon;
        parentUrl: string;
        items: { title: string; url: string }[];
      }
    | {
        title: string;
        icon: LucideIcon;
        url: string;
        disabled?: boolean;
        external?: boolean;
        description?: string;
      }
  >;
};

export const dashboardNav: SidebarNav[] = [
  {
    label: "Main Menus",
    items: [
      {
        title: "Dashboard",
        icon: LucideLayoutDashboard,
        url: "/dashboard",
      },
      {
        title: "Users",
        icon: UsersIcon,
        url: "/dashboard/users",
      },
      {
        title: "Permissions",
        icon: CheckCircleIcon,
        url: "/dashboard/permissions",
      },
      {
        title: "Settings",
        icon: SettingsIcon,
        parentUrl: "/dashboard/settings",
        items: [
          { title: "Account", url: "/dashboard/settings/account" },
          { title: "Security", url: "/dashboard/settings/security" },
          { title: "Notification", url: "/dashboard/settings/notification" },
        ],
      },
    ],
  },
];
