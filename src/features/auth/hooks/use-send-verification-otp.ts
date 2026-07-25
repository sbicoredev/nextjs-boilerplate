import { useMutation } from "@tanstack/react-query";

import { toast } from "~/components/ui/toast";

import { sendVerificationOtpAction } from "../actions/auth-action";
import type { SendVerificationOtpPayload } from "../schemas";

export const useSendVerificationOTP = () =>
  useMutation({
    mutationFn: async (input: SendVerificationOtpPayload) =>
      sendVerificationOtpAction(input),
    onError: (error) => {
      toast.add({ type: "error", description: error.message });
    },
  });
