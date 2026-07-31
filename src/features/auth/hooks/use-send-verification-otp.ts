import { useMutation } from "@tanstack/react-query";

import { sendVerificationOtpAction } from "../actions/auth-action";
import type { SendVerificationOtpPayload } from "../schemas";

export const useSendVerificationOTP = () =>
  useMutation({
    mutationFn: async (input: SendVerificationOtpPayload) =>
      sendVerificationOtpAction(input),
  });
