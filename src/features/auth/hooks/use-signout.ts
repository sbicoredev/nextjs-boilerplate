import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

import { authClient } from "~/server/auth/auth-client";

export const useSignOut = (rediretTo = "/") => {
  const router = useRouter();

  return useMutation({
    mutationFn: async () => {
      const { data, error } = await authClient.signOut({
        fetchOptions: {
          onSuccess: () => {
            router.push(rediretTo);
            router.refresh();
          },
        },
      });
      if (error) {
        throw error;
      }
      return data;
    },
  });
};
