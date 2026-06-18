import {
  CheckCircleIcon,
  type LucideIcon,
  LucideLayoutDashboard,
  SettingsIcon,
  UsersIcon,
} from "lucide-react";

type NavItem = {
  title: string;
  url?: string;
  icon?: LucideIcon;
  label?: string;
  disabled?: boolean;
  external?: boolean;
  description?: string;
};

type NavItemWithChildren = NavItem & {
  items: NavItemWithChildren[];
};

type NavItemWithOptionalChildren = NavItem & {
  items?: NavItemWithChildren[];
};

export const dashboardNav = {
  mainNav: [
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
  ] as NavItemWithOptionalChildren[],
  secondary: [
    {
      title: "Settings",
      icon: SettingsIcon,
      url: "/dashboard/settings",
    },
  ] as NavItemWithOptionalChildren[],
};
