import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { authClient } from "~/services/auth/auth-client";

interface Input {
  token: string;
}

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
      toast.success("All Sessions terminated successfully");
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
      toast.success("Session terminated successfully");
      queryClient.invalidateQueries({ queryKey: ["sessions"] });
    },
  });
};
