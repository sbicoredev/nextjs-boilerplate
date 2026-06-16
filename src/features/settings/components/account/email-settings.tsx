"use client";

import { ButtonLoading } from "~/components/ui/button-loading";
import { Input } from "~/components/ui/input";
import { useSession } from "~/features/auth/api/session";

export const EmailSettingsForm = () => {
  const { data: auth } = useSession();

  return (
    <div className="grid gap-6 space-y-0 md:grid-cols-2">
      <div className="md:col-span-2">
        <Input disabled={true} value={auth?.user?.email} />
      </div>
      <div className="md:col-span-2">
        <ButtonLoading loading={false}>Update</ButtonLoading>
      </div>
    </div>
  );
};
