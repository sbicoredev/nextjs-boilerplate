import { useMutation } from "@tanstack/react-query";

import { verifyEmailOtpAction } from "../actions/auth-action";
import type { VerifyEmailPayload } from "../schemas";

export const useVerifyEmail = () =>
  useMutation({
    mutationFn: async (input: VerifyEmailPayload) =>
      verifyEmailOtpAction(input),
  });
