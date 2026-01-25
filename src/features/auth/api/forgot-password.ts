import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { AUTH_URI } from "~/constants/auth";
import { authClient } from "~/services/auth/auth-client";

import type { ForgotPasswordPayload } from "../schemas";

export const useForgotPassword = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: async (input: ForgotPasswordPayload) => {
      const { data, error } = await authClient.emailOtp.sendVerificationOtp({
        email: input.email,
        type: "forget-password",
      });
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      toast.success("Reset password email sent!");
      router.push(AUTH_URI.resetPassword);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};
