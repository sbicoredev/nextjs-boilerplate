import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";

import { AccountDetailsForm } from "./account-details-form";
import { DeleteAccountDialog } from "./delete-account-dialog";
import { EmailSettingsForm } from "./email-settings";

export const AccountSettings = () => (
  <div className="space-y-4">
    <Card>
      <CardHeader>
        <CardTitle>Profile</CardTitle>
        <CardDescription>
          This is how others will see you on the site.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <AccountDetailsForm />
      </CardContent>
    </Card>

    <Card>
      <CardHeader>
        <CardTitle>Email</CardTitle>
        <CardDescription>Add or Update your email</CardDescription>
      </CardHeader>
      <CardContent>
        <EmailSettingsForm />
      </CardContent>
    </Card>

    <Card className="border border-destructive">
      <CardHeader>
        <CardTitle>Delete Account</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="mb-4 text-sm">
          Account deletion is non-reversible. Please proceed with caution.
        </p>
        <DeleteAccountDialog />
      </CardContent>
    </Card>
  </div>
);
