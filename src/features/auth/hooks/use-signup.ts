"use client";

import { useMutation } from "@tanstack/react-query";

import { signUpWithPasswordAction } from "../actions/auth-action";
import type { SignUpInput } from "../schemas";

export const useSignUp = () =>
  useMutation({
    mutationFn: async (input: SignUpInput) => signUpWithPasswordAction(input),
  });
