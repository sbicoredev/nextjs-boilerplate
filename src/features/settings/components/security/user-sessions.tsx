"use client";

import { LaptopIcon, Loader2Icon, LogOutIcon, PhoneIcon } from "lucide-react";
import { UAParser } from "ua-parser-js";

import { ButtonSpinner } from "~/components/button-spinner";
import { Badge } from "~/components/ui/badge";
import { Separator } from "~/components/ui/separator";
import { useAuth } from "~/contexts/auth-context";

import { useListSessions } from "../../api/list-sessions";
import {
  useAllRevokeSession,
  useRevokeSession,
} from "../../api/revoke-session";

export const UserSessions = () => {
  const auth = useAuth();
  const { data: sessions, isPending } = useListSessions();

  const { mutate: revokeAllSession, isPending: isTerminatingAll } =
    useAllRevokeSession();
  const { mutate: revokeSession, isPending: isTerminating } =
    useRevokeSession();

  return (
    <div className="space-y-4">
      {isPending ? (
        <div className="flex min-h-20 items-center justify-center">
          <Loader2Icon className="size-10 animate-spin" />
        </div>
      ) : (
        sessions?.map((session) => {
          const ua = new UAParser(session.userAgent ?? "");
          return (
            <div key={session.id}>
              <div className="flex gap-4">
                {ua.getDevice().type === "mobile" ? (
                  <PhoneIcon className="size-10" />
                ) : (
                  <LaptopIcon className="size-10" />
                )}
                <div className="space-y-1 text-muted-foreground text-sm">
                  <p className="flex gap-2 font-semibold text-base text-foreground">
                    {ua.getOS().name} ({ua.getCPU().toString()})
                    {session.id === auth?.session?.id && (
                      <Badge>This Device</Badge>
                    )}
                  </p>
                  <p>
                    {ua?.getBrowser().name} • {ua?.getBrowser().version}
                  </p>
                  <p className="text-xs">
                    IP:
                    {`${session.ipAddress ?? "Unknown"} ${session.createdAt.toDateString()} ${session.createdAt.toLocaleTimeString()}`}
                  </p>
                </div>
                {session.id !== auth?.session?.id && (
                  <ButtonSpinner
                    className="ms-auto"
                    onClick={() => revokeSession({ token: session.token })}
                    size="sm"
                    spin={isTerminating}
                    variant="destructive"
                  >
                    <LogOutIcon className="mr-1 h-4 w-4" />
                    Revoke
                  </ButtonSpinner>
                )}
              </div>
              <Separator className="mt-4" />
            </div>
          );
        })
      )}
      <div className="flex justify-between">
        <p className="text-muted-foreground text-xs">
          Last checked: {new Date().toDateString()}
        </p>
        <ButtonSpinner
          disabled={sessions?.length === 0}
          onClick={() => revokeAllSession()}
          size="sm"
          spin={isTerminatingAll}
          variant="destructive"
        >
          Revoke All Sessions
        </ButtonSpinner>
      </div>
    </div>
  );
};
