import { useMutation, useQueryClient } from "@tanstack/react-query";

import { toast } from "~/components/ui/toast";
import { authClient } from "~/lib/auth/auth-client";

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
      toast.add({ type: "success", description: "Profile updated." });
      queryClient.invalidateQueries({ queryKey: ["session"] });
    },
  });
};
