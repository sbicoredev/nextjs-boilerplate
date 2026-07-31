import { useMutation } from "@tanstack/react-query";

import { requestPasswordResetOtpAction } from "../actions/auth-action";
import type { ForgotPasswordPayload } from "../schemas";

export const useForgotPassword = () =>
  useMutation({
    mutationFn: async (input: ForgotPasswordPayload) =>
      requestPasswordResetOtpAction(input),
  });
