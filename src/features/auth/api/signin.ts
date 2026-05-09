import { useMutation } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import { toast } from "sonner";

import { DEFAULT_LOGIN_REDIRECT } from "~/constants/auth";
import { authClient } from "~/services/auth/auth-client";

import type { SigninPayload } from "../schemas";

export const useSignin = () => {
  const searchParams = useSearchParams();
  return useMutation({
    mutationFn: async (input: SigninPayload) => {
      const { data, error } = await authClient.signIn.email({
        email: input.email,
        password: input.password,
        rememberMe: false,
        callbackURL: searchParams.get("callback-url") ?? DEFAULT_LOGIN_REDIRECT,
      });
      if (error) {
        throw error;
      }
      return data;
    },
    onSuccess: () => {
      toast.success("Signin successfull!");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};
