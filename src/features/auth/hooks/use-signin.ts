import { useMutation } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";

import { CALLBACK_QUERY_NAME } from "~/constants/auth";

import { signInWithPasswordAction } from "../actions/auth-action";
import type { SignInInput } from "../schemas";

export const useSignIn = () => {
  const searchParams = useSearchParams();
  return useMutation({
    mutationFn: (input: SignInInput) => {
      const rediretTo = searchParams.get(CALLBACK_QUERY_NAME) ?? undefined;
      return signInWithPasswordAction.bind(null, rediretTo)(input);
    },
  });
};
