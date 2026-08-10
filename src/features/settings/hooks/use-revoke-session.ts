"use client";

import { useMutation } from "@tanstack/react-query";

import { toast } from "~/components/ui/toast";
import { getQueryClient } from "~/lib/query-client";

import { revokeSessionAction } from "../actions/session-action";
import type { TokenInput } from "../schemas/session-schema";

export const useRevokeSession = () =>
  useMutation({
    mutationFn: (input: TokenInput) => revokeSessionAction(input),
    onSuccess: () => {
      const queryClient = getQueryClient();
      toast.add({ type: "success", description: "Session terminated." });
      queryClient.invalidateQueries({ queryKey: ["sessions"] });
    },
  });
