import { useMutation } from "@tanstack/react-query";

import { toast } from "~/components/ui/toast";

import { requestPasswordResetOtpAction } from "../actions/auth-action";
import type { ForgotPasswordPayload } from "../schemas";

export const useForgotPassword = () =>
  useMutation({
    mutationFn: async (input: ForgotPasswordPayload) =>
      requestPasswordResetOtpAction(input),
    onError: (error) => {
      toast.add({ type: "error", description: error.message });
    },
  });
