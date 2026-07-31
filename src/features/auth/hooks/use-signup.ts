import { useMutation } from "@tanstack/react-query";

import { signUpWithPasswordAction } from "../actions/auth-action";
import type { SignUpPayload } from "../schemas";

export const useSignUp = () =>
  useMutation({
    mutationFn: async (input: SignUpPayload) => signUpWithPasswordAction(input),
  });
