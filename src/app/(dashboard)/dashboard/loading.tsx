import { Loader2Icon } from "lucide-react";

export default function DashboardLoading() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center">
      <div className="flex flex-col items-center gap-3">
        <Loader2Icon className="size-8 animate-spin text-muted-foreground" />
        <p className="text-muted-foreground text-sm">Loading dashboard…</p>
      </div>
    </div>
  );
}
