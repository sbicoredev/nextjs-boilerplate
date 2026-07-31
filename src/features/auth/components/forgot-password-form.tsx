"use client";

import { useForm } from "@tanstack/react-form";
import { AlertTriangleIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import type * as React from "react";

import { ButtonSpinner } from "~/components/button-spinner";
import { Alert, AlertDescription, AlertTitle } from "~/components/ui/alert";
import { Card, CardContent } from "~/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "~/components/ui/field";
import { Input } from "~/components/ui/input";
import { AUTH_ROUTES } from "~/constants/auth";
import { mapToFormError } from "~/lib/helpers";
import { cn } from "~/lib/utils";

import { useForgotPassword } from "../hooks/use-forgot-password";
import { forgotPasswordSchema } from "../schemas";

export const ForgotPasswordForm = ({
  className,
  ...props
}: React.ComponentProps<"div">) => {
  const { mutateAsync, isSuccess } = useForgotPassword();

  const form = useForm({
    defaultValues: { email: "" },
    validators: { onSubmit: forgotPasswordSchema },
    onSubmit: async ({ value, formApi }) => {
      const { validationErrors, serverError } = await mutateAsync(value);
      if (validationErrors) {
        formApi.setErrorMap({
          onSubmit: {
            form: "Validation failed!",
            fields: mapToFormError(validationErrors.fieldErrors),
          },
        });
      } else if (serverError) {
        formApi.setErrorMap({ onSubmit: { form: serverError, fields: {} } });
      }
    },
  });

  return (
    <div className={cn("w-full p-4", className)} {...props}>
      <Card className="overflow-hidden p-0">
        <CardContent className="grid min-h-130 p-0 md:grid-cols-2">
          <form
            className="content-center p-6 md:p-8"
            onSubmit={(e) => {
              e.preventDefault();
              e.stopPropagation();
              form.handleSubmit();
            }}
          >
            <FieldGroup>
              <div className="flex flex-col items-center gap-2 text-center">
                <h2 className="text-2xl">Forgot your password?</h2>
                <p className="text-balance text-muted-foreground">
                  Reset using your email
                </p>
              </div>

              <form.Subscribe selector={(state) => state.errorMap.onSubmit}>
                {(errors) =>
                  errors && isSuccess ? (
                    <Alert className="border border-red-500/20 bg-red-500/10">
                      <AlertTriangleIcon />
                      <AlertTitle>Request Error</AlertTitle>
                      <AlertDescription>{errors.toString()}</AlertDescription>
                    </Alert>
                  ) : null
                }
              </form.Subscribe>

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
                        placeholder="Enter your email"
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

              <form.Subscribe
                selector={(state) => [state.canSubmit, state.isSubmitting]}
              >
                {([canSubmit, isSubmitting]) => (
                  <ButtonSpinner disabled={!canSubmit} spin={isSubmitting}>
                    {isSubmitting ? "Sending…" : "Send Request"}
                  </ButtonSpinner>
                )}
              </form.Subscribe>

              <FieldDescription className="text-center">
                Back to <Link href={AUTH_ROUTES.signIn}>Sign in</Link>
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
