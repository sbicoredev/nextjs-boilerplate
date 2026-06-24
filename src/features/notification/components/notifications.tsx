"use client";

import { BellIcon } from "lucide-react";
import { useRouter } from "next/navigation";

import { useNotificationStore } from "~/store/notification-store";

import { NotificationCard } from "./notification-card";

const actionRoutes: Record<string, string> = {
  view: "/dashboard/overview",
  billing: "/dashboard/overview",
  open: "/dashboard/kanban",
  "open-chat": "/dashboard/chat",
};

export const Notifications = () => {
  const { notifications, markAsRead } = useNotificationStore();
  const router = useRouter();

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
              onAction={(notifId, actionId) => {
                const route = actionRoutes[actionId];
                if (route) {
                  markAsRead(notifId);
                  router.push(route);
                }
              }}
              onMarkAsRead={markAsRead}
              status={notification.status}
              title={notification.title}
            />
          ))}
        </div>
      )}
    </>
  );
};
