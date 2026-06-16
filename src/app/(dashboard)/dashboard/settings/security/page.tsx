import type { Metadata } from "next";

import { SecuritySettings } from "~/features/settings/components/security";

export const metadata: Metadata = {
  title: "Security",
};

export default function SecuritySettingsPage() {
  return (
    <div className="faded-bottom h-full w-full overflow-y-auto scroll-smooth pe-4 pb-12">
      <div className="-mx-1 px-1.5 lg:max-w-xl">
        <SecuritySettings />
      </div>
    </div>
  );
}
