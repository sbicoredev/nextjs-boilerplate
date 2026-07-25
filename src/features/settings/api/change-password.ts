import { useMutation } from "@tanstack/react-query";

import { toast } from "~/components/ui/toast";
import { authClient } from "~/services/auth/auth-client";

type Input = {
  currentPassword: string;
  newPassword: string;
};

export const useChangePassword = () =>
  useMutation({
    mutationFn: async ({ currentPassword, newPassword }: Input) => {
      const { data, error } = await authClient.changePassword({
        currentPassword,
        newPassword,
        revokeOtherSessions: true,
      });
      if (error) {
        throw error;
      }
      return data;
    },
    onSuccess: () => {
      toast.add({ type: "success", description: "Password updated." });
    },
  });
