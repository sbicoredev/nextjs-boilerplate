import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { AUTH_URI } from "~/constants/auth";
import { authClient } from "~/services/auth/auth-client";

import type { SignupPayload } from "../schemas";

export const useSignup = () => {
  const router = useRouter();
  return useMutation({
    mutationFn: async (input: SignupPayload) => {
      const { data, error } = await authClient.signUp.email({
        name: input.name,
        email: input.email,
        password: input.password,
        // callbackURL: "/",
      });
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      toast.success("Signup successfull!");
      router.push(AUTH_URI.verifyEmail);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};
