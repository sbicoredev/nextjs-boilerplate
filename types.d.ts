type Prettify<T> = {
  [K in keyof T]: T[K];
} & {};

interface NavItem {
  description?: string;
  disabled?: boolean;
  external?: boolean;
  href?: string;
  icon?: LucideIcon;
  label?: string;
  title: string;
}

interface NavItemWithChildren extends NavItem {
  items: NavItemWithChildren[];
}

interface NavItemWithOptionalChildren extends NavItem {
  items?: NavItemWithChildren[];
}

type MainNavItem = NavItemWithOptionalChildren;

type SidebarNavItem = NavItemWithChildren;

interface FooterItem {
  items: {
    title: string;
    href: string;
    external?: boolean;
  }[];
  title: string;
}
