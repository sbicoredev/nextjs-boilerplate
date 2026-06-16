import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { authClient } from "~/services/auth/auth-client";

type Input = {
  image?: string;
  name?: string;
};

export const useUpdateProfile = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ name, image }: Input) => {
      const { data, error } = await authClient.updateUser({
        name,
        image,
      });
      if (error) {
        throw error;
      }
      return data;
    },
    onSuccess: () => {
      toast.success("Profile updated!");
      queryClient.invalidateQueries({ queryKey: ["session"] });
    },
  });
};
