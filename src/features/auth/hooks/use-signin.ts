import { useMutation } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";

import { toast } from "~/components/ui/toast";
import { CALLBACK_QUERY_NAME } from "~/constants/auth";

import { signInWithPasswordAction } from "../actions/auth-action";
import type { SignInPayload } from "../schemas";

export const useSignIn = () => {
  const searchParams = useSearchParams();
  return useMutation({
    mutationFn: async (input: SignInPayload) => {
      const rediretTo = searchParams.get(CALLBACK_QUERY_NAME) ?? undefined;
      return signInWithPasswordAction.bind(null, rediretTo)(input);
    },
    onError: (error) => {
      toast.add({ type: "error", description: error.message });
    },
  });
};
