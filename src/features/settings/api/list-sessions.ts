import { useQuery } from "@tanstack/react-query";

import { authClient } from "~/services/auth/auth-client";

export const useListSessions = () =>
  useQuery({
    queryKey: ["sessions"],
    queryFn: async () => {
      const { data, error } = await authClient.listSessions();
      if (error) {
        throw error;
      }
      return data;
    },
  });
