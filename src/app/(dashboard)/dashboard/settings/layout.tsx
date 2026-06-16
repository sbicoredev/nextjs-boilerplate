import { BellIcon, LockIcon, PaletteIcon, WrenchIcon } from "lucide-react";
import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

import { Container } from "~/components/container";
import { SettingsNav } from "~/features/settings/components/settings-nav";

const sidebarNavItems = [
  {
    title: "Account",
    href: "/dashboard/settings",
    icon: <WrenchIcon size={18} />,
  },
  {
    title: "Security",
    href: "/dashboard/settings/security",
    icon: <LockIcon size={18} />,
  },
  {
    title: "Appearance",
    href: "/dashboard/settings/appearance",
    icon: <PaletteIcon size={18} />,
  },
  {
    title: "Notifications",
    href: "/dashboard/settings/notifications",
    icon: <BellIcon size={18} />,
  },
];

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("metadata");

  return {
    title: `Settings - Dashboard | ${t("title")}`,
    description: t("desc"),
  };
}

type Props = {
  children: React.ReactNode;
};

export default async function SettingsLayout({ children }: Props) {
  return (
    <Container className="flex max-w-6xl grow flex-col overflow-hidden">
      <div className="mb-4 space-y-1">
        <h2 className="font-bold text-2xl tracking-tight">Settings</h2>
        <p className="text-muted-foreground">
          Manage your account settings and set e-mail preferences.
        </p>
      </div>
      <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-8 lg:space-y-0">
        <aside className="lg:w-1/5">
          <SettingsNav items={sidebarNavItems} />
        </aside>
        <div className="flex-1 lg:max-w-2xl">{children}</div>
      </div>
    </Container>
  );
}
