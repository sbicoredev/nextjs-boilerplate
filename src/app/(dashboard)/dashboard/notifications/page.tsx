import type { Metadata } from "next";

import { Container } from "~/components/container";
import { Notifications } from "~/features/notification/components/notifications";

export const metadata: Metadata = {
  title: "Notifications | Dashboard",
};

export default function NotificationsPage() {
  return (
    <Container>
      <div className="mb-4 space-y-1">
        <h3>Notificaton</h3>
        <p className="text-muted-foreground">All Notifications</p>
      </div>
      <Notifications />
    </Container>
  );
}
