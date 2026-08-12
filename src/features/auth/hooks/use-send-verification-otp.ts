"use client";

import { useMutation } from "@tanstack/react-query";

import { sendVerificationOtpAction } from "../actions/auth-action";
import type { SendVerificationOtpInput } from "../schemas";

export const useSendVerificationOTP = () =>
  useMutation({
    mutationFn: async (input: SendVerificationOtpInput) =>
      sendVerificationOtpAction(input),
    onSuccess: ({ serverError }) => {
      if (serverError) {
        throw new Error(serverError);
      }
    },
  });
