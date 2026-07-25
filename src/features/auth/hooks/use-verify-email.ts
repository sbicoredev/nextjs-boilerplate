import { useMutation } from "@tanstack/react-query";

import { toast } from "~/components/ui/toast";

import { verifyEmailOtpAction } from "../actions/auth-action";
import type { VerifyEmailPayload } from "../schemas";

export const useVerifyEmail = () =>
  useMutation({
    mutationFn: async (input: VerifyEmailPayload) =>
      verifyEmailOtpAction(input),
    onError: (error) => {
      toast.add({ type: "error", description: error.message });
    },
  });
