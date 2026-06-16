import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";

import { PasswordUpdateForm } from "./password-update-form";
import { UserSessions } from "./user-sessions";

export const SecuritySettings = () => (
  <div className="space-y-4">
    <Card>
      <CardHeader>
        <CardTitle>Password</CardTitle>
        <CardDescription>Update your current password</CardDescription>
      </CardHeader>
      <CardContent>
        <PasswordUpdateForm />
      </CardContent>
    </Card>

    <Card>
      <CardHeader>
        <CardTitle>Sessions</CardTitle>
        <CardDescription>
          Manage your active sessions across devices
        </CardDescription>
      </CardHeader>
      <CardContent>
        <UserSessions />
      </CardContent>
    </Card>
  </div>
);
