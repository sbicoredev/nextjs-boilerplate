"use client";

import { useForm } from "@tanstack/react-form";
import Image from "next/image";
import Link from "next/link";
import type * as React from "react";

import { ButtonLoading } from "~/components/ui/button-loading";
import { Card, CardContent } from "~/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "~/components/ui/field";
import { Input } from "~/components/ui/input";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "~/components/ui/input-otp";
import { AUTH_URI } from "~/constants/auth";
import { cn } from "~/lib/utils";

import { useResetPassword } from "../api/reset-password";
import { resetPasswordSchema } from "../schemas";

type Props = React.ComponentProps<"div"> & {
  email: string;
};

export const ResetPasswordForm = ({ email, className, ...props }: Props) => {
  const { mutateAsync, isPending } = useResetPassword();

  const form = useForm({
    defaultValues: {
      email,
      otp: "",
      password: "12345678",
      confirmPassword: "12345678",
    },
    validators: { onSubmit: resetPasswordSchema },
    onSubmit: async ({ value }) => mutateAsync(value),
  });

  return (
    <div className={cn("w-full p-4", className)} {...props}>
      <Card className="overflow-hidden p-0">
        <CardContent className="grid min-h-130 p-0 md:grid-cols-2">
          <form
            className="content-center p-6 md:p-8"
            onSubmit={(e) => {
              e.preventDefault();
              form.handleSubmit();
            }}
          >
            <FieldGroup>
              <div className="flex flex-col items-center gap-2 text-center">
                <h1 className="font-bold text-2xl">Enter new Password</h1>
                <p className="text-balance text-muted-foreground">
                  Update your password
                </p>
              </div>

              <form.Field name="otp">
                {(field) => {
                  const isInvalid =
                    field.state.meta.isTouched && !field.state.meta.isValid;
                  return (
                    <Field data-invalid={isInvalid}>
                      <FieldLabel htmlFor={field.name}>OTP</FieldLabel>
                      <InputOTP
                        className="bg-secondary"
                        maxLength={6}
                        onChange={field.handleChange}
                      >
                        <InputOTPGroup className="w-full justify-between gap-be">
                          <InputOTPGroup>
                            <InputOTPSlot className="size-12" index={0} />
                          </InputOTPGroup>
                          <InputOTPGroup>
                            <InputOTPSlot className="size-12" index={1} />
                          </InputOTPGroup>
                          <InputOTPGroup>
                            <InputOTPSlot className="size-12" index={2} />
                          </InputOTPGroup>
                          <InputOTPGroup>
                            <InputOTPSlot className="size-12" index={3} />
                          </InputOTPGroup>
                          <InputOTPGroup>
                            <InputOTPSlot className="size-12" index={4} />
                          </InputOTPGroup>
                          <InputOTPGroup>
                            <InputOTPSlot className="size-12" index={5} />
                          </InputOTPGroup>
                        </InputOTPGroup>
                      </InputOTP>
                      {isInvalid && (
                        <FieldError errors={field.state.meta.errors} />
                      )}
                    </Field>
                  );
                }}
              </form.Field>

              <form.Field name="password">
                {(field) => {
                  const isInvalid =
                    field.state.meta.isTouched && !field.state.meta.isValid;
                  return (
                    <Field data-invalid={isInvalid}>
                      <FieldLabel htmlFor={field.name}>Password</FieldLabel>
                      <Input
                        aria-invalid={isInvalid}
                        id={field.name}
                        name={field.name}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                        required
                        type="password"
                        value={field.state.value}
                      />
                      {isInvalid && (
                        <FieldError errors={field.state.meta.errors} />
                      )}
                      <FieldDescription>
                        Must be at least 8 characters long.
                      </FieldDescription>
                    </Field>
                  );
                }}
              </form.Field>

              <form.Field name="confirmPassword">
                {(field) => {
                  const isInvalid =
                    field.state.meta.isTouched && !field.state.meta.isValid;
                  return (
                    <Field data-invalid={isInvalid}>
                      <FieldLabel htmlFor={field.name}>
                        Confirm Password
                      </FieldLabel>
                      <Input
                        aria-invalid={isInvalid}
                        id={field.name}
                        name={field.name}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                        required
                        type="password"
                        value={field.state.value}
                      />
                      {isInvalid && (
                        <FieldError errors={field.state.meta.errors} />
                      )}
                    </Field>
                  );
                }}
              </form.Field>

              <Field>
                <ButtonLoading loading={isPending}>
                  Reset Password
                </ButtonLoading>
              </Field>

              <FieldDescription className="text-center">
                Back to <Link href={AUTH_URI.signin}>Sign in</Link>
              </FieldDescription>
            </FieldGroup>
          </form>
          <div className="relative hidden bg-muted md:block">
            <Image
              alt="Image"
              className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
              height={500}
              src="/assets/placeholder.svg"
              width={500}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
