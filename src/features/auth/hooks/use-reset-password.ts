import { useMutation } from "@tanstack/react-query";

import { toast } from "~/components/ui/toast";

import { resetPasswordAction } from "../actions/auth-action";
import type { ResetPasswordPayload } from "../schemas";

export const useResetPassword = () =>
  useMutation({
    mutationFn: async (input: ResetPasswordPayload) =>
      resetPasswordAction(input),
    onError: (error) => {
      toast.add({ type: "error", description: error.message });
    },
  });
