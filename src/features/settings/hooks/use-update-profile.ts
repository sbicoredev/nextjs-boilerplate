"use client";

import { useMutation } from "@tanstack/react-query";

import { toast } from "~/components/ui/toast";
import { getQueryClient } from "~/lib/query-client";

import { updateProfileAction } from "../actions/profile-action";
import type { UpdateProfileInput } from "../schemas/profile-schema";

export const useUpdateProfile = () =>
  useMutation({
    mutationFn: (input: UpdateProfileInput) => updateProfileAction(input),
    onSuccess: () => {
      const queryClient = getQueryClient();
      toast.add({ type: "success", description: "Profile updated." });
      queryClient.invalidateQueries({ queryKey: ["session"] });
    },
  });
