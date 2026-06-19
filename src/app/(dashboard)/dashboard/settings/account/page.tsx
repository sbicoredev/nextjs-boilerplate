import type { Metadata } from "next";

import { AccountSettings } from "~/features/settings/components/account";

export const metadata: Metadata = {
  title: "Account",
};

export default function AccountSettingsPage() {
  return (
    <div className="faded-bottom h-full w-full overflow-y-auto scroll-smooth pe-4 pb-12">
      <div className="-mx-1 px-1.5 lg:max-w-xl">
        <AccountSettings />
      </div>
    </div>
  );
}
