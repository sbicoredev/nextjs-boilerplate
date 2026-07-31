import { useMutation } from "@tanstack/react-query";

import { resetPasswordAction } from "../actions/auth-action";
import type { ResetPasswordPayload } from "../schemas";

export const useResetPassword = () =>
  useMutation({
    mutationFn: async (input: ResetPasswordPayload) =>
      resetPasswordAction(input),
  });
