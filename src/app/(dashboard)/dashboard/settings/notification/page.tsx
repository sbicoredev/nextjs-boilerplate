import type { Metadata } from "next";

import { NotificationSettings } from "~/features/settings/components/notification-settings";

export const metadata: Metadata = {
  title: "Notification",
};

export default function NotificationSettingsPage() {
  return (
    <div className="faded-bottom h-full w-full overflow-y-auto scroll-smooth pe-4 pb-12">
      <div className="-mx-1 px-1.5 lg:max-w-xl">
        <NotificationSettings />
      </div>
    </div>
  );
}
