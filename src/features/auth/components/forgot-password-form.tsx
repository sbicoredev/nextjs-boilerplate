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
import { AUTH_URI } from "~/constants/auth";
import { cn } from "~/lib/utils";

import { useForgotPassword } from "../api/forgot-password";
import { forgotPasswordSchema } from "../schemas";

export const ForgotPasswordForm = ({
  className,
  ...props
}: React.ComponentProps<"div">) => {
  const { mutateAsync, isPending } = useForgotPassword();

  const form = useForm({
    defaultValues: { email: "jhon@mail.com" },
    validators: { onSubmit: forgotPasswordSchema },
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
                <h1 className="font-bold text-2xl">Forgot your password?</h1>
                <p className="text-balance text-muted-foreground">
                  Reset using your email
                </p>
              </div>

              <form.Field name="email">
                {(field) => {
                  const isInvalid =
                    field.state.meta.isTouched && !field.state.meta.isValid;
                  return (
                    <Field data-invalid={isInvalid}>
                      <FieldLabel htmlFor={field.name}>Email</FieldLabel>
                      <Input
                        aria-invalid={isInvalid}
                        id={field.name}
                        name={field.name}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                        placeholder="jhon@mail.com"
                        required
                        type="email"
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
                  Send Reset Link
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
