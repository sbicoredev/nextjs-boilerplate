import {
  CheckCircleIcon,
  LucideLayoutDashboard,
  SettingsIcon,
  UsersIcon,
} from "lucide-react";

export const dashboardConfig = {
  mainNav: [
    {
      title: "Dashboard",
      icon: LucideLayoutDashboard,
      href: "/dashboard",
    },
    {
      title: "Users",
      icon: UsersIcon,
      href: "/dashboard/users",
    },
    {
      title: "Permissions",
      icon: CheckCircleIcon,
      href: "/dashboard/permissions",
    },
  ] as NavItemWithOptionalChildren[],
  secondary: [
    {
      title: "Settings",
      icon: SettingsIcon,
      href: "/dashboard/settings",
    },
  ] as NavItemWithOptionalChildren[],
};
