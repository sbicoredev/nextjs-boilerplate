import { useQuery } from "@tanstack/react-query";

import { authClient } from "~/services/auth/auth-client";
import { mapAuthSession, mapAuthUser } from "~/services/auth/utils";

export const useSession = () =>
  useQuery<AuthResponse>({
    queryKey: ["session"],
    queryFn: async () => {
      const { data, error } = await authClient.getSession();
      if (error) {
        throw error;
      }

      return {
        user: data?.user ? mapAuthUser(data.user) : null,
        session: data?.session ? mapAuthSession(data.session) : null,
      };
    },
  });
