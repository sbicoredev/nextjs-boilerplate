"use client";

import { AlertTriangleIcon, RefreshCcwIcon } from "lucide-react";
import { useEffect } from "react";

interface DashboardErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function DashboardError({ error, reset }: DashboardErrorProps) {
  useEffect(() => {
    console.error("Dashboard error:", error);
  }, [error]);

  return (
    <div className="flex min-h-[60vh] items-center justify-center px-4">
      <div className="flex max-w-md flex-col items-center gap-4 text-center">
        <AlertTriangleIcon className="size-10 text-destructive" />
        <div className="space-y-1">
          <h2 className="font-semibold text-foreground text-lg">
            Something went wrong
          </h2>
          <p className="text-muted-foreground text-sm">
            An unexpected error occurred while loading the dashboard. Please try
            again.
          </p>
        </div>
        {error.digest ? (
          <p className="text-muted-foreground/60 text-xs">
            Error ID: {error.digest}
          </p>
        ) : null}
        <button
          className="inline-flex h-9 items-center justify-center gap-2 rounded-md bg-primary px-4 font-medium text-primary-foreground text-sm transition-colors hover:bg-primary/90"
          onClick={reset}
          type="button"
        >
          <RefreshCcwIcon className="size-4" />
          Try again
        </button>
      </div>
    </div>
  );
}
