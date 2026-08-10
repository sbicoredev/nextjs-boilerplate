import * as z from "zod";

import { passwordValidator } from "~/lib/validators/common";

export const updateProfileSchema = z.object({
  name: z.string().min(2).max(30),
  image: z.string(),
});
export type UpdateProfileInput = z.infer<typeof updateProfileSchema>;

export const updatePasswordSchema = z
  .object({
    currentPassword: passwordValidator,
    newPassword: passwordValidator,
    confirmPassword: passwordValidator,
  })
  .refine(
    ({ newPassword, confirmPassword }) => newPassword === confirmPassword,
    {
      message: "Password not matched",
      path: ["confirmPassword"],
    }
  );
export type UpdatePasswordInput = z.infer<typeof updatePasswordSchema>;

export const deleteAccountSchema = z.object({
  token: z.string().min(1),
  password: passwordValidator,
});
export type DeleteAccountInput = z.infer<typeof deleteAccountSchema>;
