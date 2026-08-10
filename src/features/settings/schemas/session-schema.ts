import z from "zod";

export const tokenSchema = z.object({
  token: z.string().min(1),
});
export type TokenInput = z.infer<typeof tokenSchema>;
