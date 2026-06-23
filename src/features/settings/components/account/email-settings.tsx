"use client";

import { ButtonSpinner } from "~/components/button-spinner";
import { Input } from "~/components/ui/input";
import { useAuth } from "~/contexts/auth-context";

export const EmailSettingsForm = () => {
  const auth = useAuth();

  return (
    <div className="grid gap-6 space-y-0 md:grid-cols-2">
      <div className="md:col-span-2">
        <Input disabled={true} value={auth?.user?.email} />
      </div>
      <div className="md:col-span-2">
        <ButtonSpinner spin={false}>Update</ButtonSpinner>
      </div>
    </div>
  );
};
