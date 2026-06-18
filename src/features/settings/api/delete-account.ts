import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { authClient } from "~/services/auth/auth-client";

type Input = {
  password?: string;
  token: string;
};

export const useDeleteAccount = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ token, password }: Input) => {
      const { data, error } = await authClient.deleteUser({ token, password });
      if (error) {
        throw error;
      }
      return data;
    },
    onSuccess: () => {
      toast.success("Account deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["sessions"] });
    },
  });
};
