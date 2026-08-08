"use client";

import { BellIcon } from "lucide-react";

import { useNotificationStore } from "~/stores/notification-store";

import { NotificationCard } from "./notification-card";

export const Notifications = () => {
  const notifications = useNotificationStore((s) => s.notifications);

  return (
    <>
      {notifications.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12">
          <BellIcon className="mb-2 h-8 w-8 text-muted-foreground/40" />
          <p className="text-muted-foreground text-sm">No notifications yet</p>
        </div>
      ) : (
        <div className="flex flex-col gap-1 p-2">
          {notifications.map((notification) => (
            <NotificationCard
              actions={notification.actions}
              body={notification.body}
              createdAt={notification.createdAt}
              id={notification.id}
              key={notification.id}
              status={notification.status}
              title={notification.title}
            />
          ))}
        </div>
      )}
    </>
  );
};
