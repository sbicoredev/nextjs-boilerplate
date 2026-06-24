"use client";

import { BellIcon, ChevronRightIcon } from "lucide-react";
import Link from "next/link";

import { Button } from "~/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover";
import { ScrollArea } from "~/components/ui/scroll-area";
import { Separator } from "~/components/ui/separator";
import { useNotificationStore } from "~/store/notification-store";

import { Notifications } from "./notifications";

type Props = {
  variant?: "outline" | "ghost" | "secondary";
  size?: "sm" | "lg" | "icon" | "icon-sm";
};

export const NotificationTrigger = ({ variant, size }: Props) => {
  const { unreadCount, markAllAsRead } = useNotificationStore();
  const count = unreadCount();

  return (
    <Popover>
      <PopoverTrigger
        render={
          <Button className="relative" size={size} variant={variant}>
            <BellIcon />
            {count > 0 && (
              <span className="absolute -top-0.5 -right-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-destructive px-1 font-medium text-destructive-foreground text-xs leading-0">
                {count > 9 ? "9+" : count}
              </span>
            )}
            <span className="sr-only">Notifications</span>
          </Button>
        }
      />
      <PopoverContent
        align="end"
        className="w-[calc(100vw-2rem)] gap-1 p-0 sm:w-95"
        sideOffset={8}
      >
        <div className="flex items-center justify-between px-4 pt-3 pb-2">
          <Link
            className="group flex items-center gap-1"
            href="/dashboard/notifications"
          >
            <h4 className="font-semibold text-sm group-hover:underline">
              Notifications
            </h4>
            <ChevronRightIcon className="h-3.5 w-3.5 text-muted-foreground transition-transform group-hover:translate-x-0.5" />
          </Link>
          <div className="flex items-center gap-2">
            {count > 0 && (
              <span className="rounded-full bg-muted px-2 py-0.5 text-muted-foreground text-xs">
                {count} new
              </span>
            )}
            {count > 0 && (
              <Button
                className="h-5 cursor-pointer text-muted-foreground"
                onClick={markAllAsRead}
                size="xs"
                variant="ghost"
              >
                Mark all as read
              </Button>
            )}
          </div>
        </div>
        <Separator />
        <ScrollArea className="h-100">
          <Notifications />
        </ScrollArea>
      </PopoverContent>
    </Popover>
  );
};
