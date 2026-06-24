"use client";

import {
  AlertCircleIcon,
  CheckIcon,
  ClockIcon,
  ExternalLinkIcon,
} from "lucide-react";

import { ButtonSpinner } from "~/components/button-spinner";
import { cn } from "~/lib/utils";

export type NotificationStatus = "unread" | "read" | "archived";
export type ActionType = "redirect" | "api_call" | "workflow" | "modal";
export type ActionStyle = "primary" | "danger" | "default";

export type NotificationAction = {
  id: string;
  label: string;
  type: ActionType;
  style?: ActionStyle;
  executed?: boolean;
};

type Props = {
  id: string;
  title: string;
  body: string;
  status: NotificationStatus;
  createdAt?: string | Date;
  actions?: NotificationAction[];
  onMarkAsRead?(id: string): void;
  onAction?(
    notificationId: string,
    actionId: string,
    actionType: ActionType
  ): void;
  loadingActionId?: string;
  className?: string;
};

export const NotificationCard = ({
  id,
  title,
  body,
  status = "unread",
  createdAt,
  actions = [],
  onMarkAsRead,
  onAction,
  loadingActionId,
  className,
}: Props) => {
  const isUnread = status === "unread";

  return (
    <div
      className={cn(
        "group relative w-full rounded-md transition-all",
        isUnread ? "bg-muted" : "bg-muted/40",
        className
      )}
    >
      <div className="px-4 py-3.5">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0 flex-1 space-y-1">
            <div className="flex items-center gap-2">
              <h3
                className={cn(
                  "font-semibold text-sm leading-tight",
                  isUnread ? "text-foreground" : "text-muted-foreground"
                )}
              >
                {title}
              </h3>
              {isUnread && (
                <div className="size-2 shrink-0 rounded-full bg-sky-500" />
              )}
            </div>
            <p className="text-muted-foreground text-xs">{body}</p>
          </div>

          {isUnread && onMarkAsRead && (
            <button
              aria-label="Mark as read"
              className={cn(
                "rounded-lg p-1.5 transition-colors",
                "text-muted-foreground hover:bg-accent hover:text-foreground"
              )}
              onClick={() => onMarkAsRead(id)}
              type="button"
            >
              <CheckIcon size={16} />
            </button>
          )}
        </div>

        <div className="mt-3 flex items-end justify-between">
          {actions.length > 0 && (
            <div className="flex flex-wrap items-center gap-2">
              {actions.map((action) => {
                const isLoading = loadingActionId === action.id;
                const isExecuted = action.executed;
                const showLoading = isLoading && action.type !== "modal";

                return (
                  <ButtonSpinner
                    className={cn(
                      showLoading && "opacity-50",
                      isExecuted && "cursor-not-allowed opacity-60"
                    )}
                    disabled={isLoading || isExecuted}
                    key={action.id}
                    onClick={() => onAction?.(id, action.id, action.type)}
                    size="xs"
                    spin={showLoading}
                    type="button"
                    variant={
                      action.style === "primary"
                        ? "default"
                        : action.style === "danger"
                          ? "destructive"
                          : action.style === "default"
                            ? "outline"
                            : "outline"
                    }
                  >
                    <span>{action.label}</span>
                    {isExecuted ? (
                      <CheckIcon size={12} strokeWidth={2.5} />
                    ) : (
                      getActionIcon(action.type)
                    )}
                  </ButtonSpinner>
                );
              })}
            </div>
          )}
          {createdAt && (
            <span
              className="inline-block text-[11px] text-muted-foreground/60"
              suppressHydrationWarning
            >
              {formatDate(createdAt)}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

function getActionIcon(actionType: ActionType) {
  const iconProps = { size: 12, strokeWidth: 2.5 };
  switch (actionType) {
    case "redirect":
      return <ExternalLinkIcon {...iconProps} />;
    case "api_call":
      return <CheckIcon {...iconProps} />;
    case "workflow":
      return <ClockIcon {...iconProps} />;
    case "modal":
      return <AlertCircleIcon {...iconProps} />;
    default:
      return null;
  }
}

function formatDate(date: string | Date): string {
  const d = new Date(date);
  const now = new Date();
  const diffMs = now.getTime() - d.getTime();
  const diffMins = Math.floor(diffMs / (1000 * 60));
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffMins < 1) {
    return "Just now";
  }
  if (diffMins < 60) {
    return `${diffMins}m ago`;
  }
  if (diffHours < 24) {
    return `${diffHours}h ago`;
  }
  if (diffDays < 7) {
    return `${diffDays}d ago`;
  }

  return d.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });
}
