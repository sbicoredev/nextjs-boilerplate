import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { AUTH_URI } from "~/constants/auth";
import { authClient } from "~/services/auth/auth-client";

import type { ResetPasswordPayload } from "../schemas";

export const useResetPassword = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: async (input: ResetPasswordPayload) => {
      const { data, error } = await authClient.emailOtp.resetPassword({
        otp: input.otp,
        email: input.email,
        password: input.password,
      });
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      toast.success("Password updated!");
      router.push(AUTH_URI.signin);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};
