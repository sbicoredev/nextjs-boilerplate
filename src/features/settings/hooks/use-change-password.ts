"use client";

import { useMutation } from "@tanstack/react-query";

import { toast } from "~/components/ui/toast";

import { changePasswordAction } from "../actions/profile-action";
import type { UpdatePasswordInput } from "../schemas/profile-schema";

export const useChangePassword = () =>
  useMutation({
    mutationFn: (input: UpdatePasswordInput) => changePasswordAction(input),
    onSuccess: () => {
      toast.add({ type: "success", description: "Password updated." });
    },
  });
