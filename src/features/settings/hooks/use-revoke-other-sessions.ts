"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { toast } from "~/components/ui/toast";

import { revokeOtherSessionsAction } from "../actions/session-action";

export const useRevokeOtherSessions = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => revokeOtherSessionsAction(),
    onSuccess: () => {
      toast.add({ type: "success", description: "All Sessions terminated." });
      queryClient.invalidateQueries({ queryKey: ["sessions"] });
    },
  });
};
