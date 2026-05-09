import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

import { authClient } from "~/services/auth/auth-client";

export const useSendVerificationOTP = () =>
  useMutation({
    mutationFn: async (input: {
      email: string;
      type: "sign-in" | "email-verification" | "forget-password";
    }) => {
      const { data, error } = await authClient.emailOtp.sendVerificationOtp({
        email: input.email,
        type: input.type,
      });
      if (error) {
        throw error;
      }
      return data;
    },
    onSuccess: () => {
      toast.success("OTP has been sent!");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
