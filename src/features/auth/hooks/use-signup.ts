import { useMutation } from "@tanstack/react-query";

import { toast } from "~/components/ui/toast";

import { signUpWithPasswordAction } from "../actions/auth-action";
import type { SignUpPayload } from "../schemas";

export const useSignUp = () =>
  useMutation({
    mutationFn: async (input: SignUpPayload) => signUpWithPasswordAction(input),
    onError: (error) => {
      toast.add({ type: "error", description: error.message });
    },
  });
