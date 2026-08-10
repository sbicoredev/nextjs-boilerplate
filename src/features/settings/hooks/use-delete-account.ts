"use client";

import { useMutation } from "@tanstack/react-query";

import { toast } from "~/components/ui/toast";
import { getQueryClient } from "~/lib/query-client";

import { deleteAccountAction } from "../actions/profile-action";
import type { DeleteAccountInput } from "../schemas/profile-schema";

export const useDeleteAccount = () =>
  useMutation({
    mutationFn: (input: DeleteAccountInput) => deleteAccountAction(input),
    onSuccess: () => {
      const queryClient = getQueryClient();
      toast.add({ type: "success", description: "Account deleted." });
      queryClient.invalidateQueries({ queryKey: ["sessions"] });
    },
  });
