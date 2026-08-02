import { useMutation, useQueryClient } from "@tanstack/react-query";

import { toast } from "~/components/ui/toast";
import { authClient } from "~/lib/auth/auth-client";

type Input = {
  token: string;
};

export const useAllRevokeSession = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async () => {
      const { data, error } = await authClient.revokeOtherSessions();
      if (error) {
        throw error;
      }
      return data;
    },
    onSuccess: () => {
      toast.add({ type: "success", description: "All Sessions terminated." });
      queryClient.invalidateQueries({ queryKey: ["sessions"] });
    },
  });
};

export const useRevokeSession = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ token }: Input) => {
      const { data, error } = await authClient.revokeSession({ token });
      if (error) {
        throw error;
      }
      return data;
    },
    onSuccess: () => {
      toast.add({ type: "success", description: "Session terminated." });
      queryClient.invalidateQueries({ queryKey: ["sessions"] });
    },
  });
};
