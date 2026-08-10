import z from "zod";

export const emailValidator = z.email("Enter a valid email address");

export const passwordValidator = z
  .string()
  .min(8, "Password must be at least 8 characters")
  .max(30, "Password must not be greater than 30 characters.")
  .regex(/[A-Z]/, "Password must include an uppercase letter")
  .regex(/[0-9]/, "Password must include a number");

export const confirmPasswordSchema = z
  .object({
    password: passwordValidator,
    confirmPassword: passwordValidator,
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export const phoneRegex = new RegExp(
  /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/
);
export const phoneSchema = z.object({
  phone: z.string().regex(phoneRegex, "Invalid phone number."),
});
