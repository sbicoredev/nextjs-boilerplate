"use client";

import { useForm } from "@tanstack/react-form";
import { AlertTriangleIcon } from "lucide-react";

import { ButtonSpinner } from "~/components/button-spinner";
import { Alert, AlertDescription, AlertTitle } from "~/components/ui/alert";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "~/components/ui/field";
import { Input } from "~/components/ui/input";
import { ErrorMessaage } from "~/constants/error-message";
import { mapToFormError } from "~/utils/form";

import { useChangePassword } from "../../hooks/use-change-password";
import { updatePasswordSchema } from "../../schemas/profile-schema";

export const PasswordUpdateForm = () => {
  const { mutateAsync, isSuccess } = useChangePassword();

  const form = useForm({
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
    validators: { onSubmit: updatePasswordSchema },
    onSubmit: async ({ value, formApi }) => {
      const { validationErrors, serverError } = await mutateAsync(value);
      if (validationErrors) {
        formApi.setErrorMap({
          onSubmit: {
            form: ErrorMessaage.validation.failed,
            fields: mapToFormError(validationErrors.fieldErrors),
          },
        });
      } else if (serverError) {
        formApi.setErrorMap({ onSubmit: { form: serverError, fields: {} } });
      }
    },
  });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        e.stopPropagation();
        form.handleSubmit();
      }}
    >
      <FieldGroup>
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

        <form.Field name="currentPassword">
          {(field) => {
            const isInvalid =
              field.state.meta.isTouched && !field.state.meta.isValid;
            return (
              <Field data-invalid={isInvalid}>
                <FieldLabel htmlFor={field.name}>Current Password</FieldLabel>
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
                <FieldError errors={field.state.meta.errors} />
              </Field>
            );
          }}
        </form.Field>

        <form.Field name="newPassword">
          {(field) => {
            const isInvalid =
              field.state.meta.isTouched && !field.state.meta.isValid;
            return (
              <Field data-invalid={isInvalid}>
                <FieldLabel htmlFor={field.name}>New Password</FieldLabel>
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
                <FieldError errors={field.state.meta.errors} />
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
                <FieldLabel htmlFor={field.name}>Confirm Password</FieldLabel>
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
                <FieldError errors={field.state.meta.errors} />
              </Field>
            );
          }}
        </form.Field>

        <form.Subscribe
          selector={(state) => [state.canSubmit, state.isSubmitting]}
        >
          {([canSubmit, isSubmitting]) => (
            <ButtonSpinner disabled={!canSubmit} spin={isSubmitting}>
              {isSubmitting ? "Updating..." : "Update"}
            </ButtonSpinner>
          )}
        </form.Subscribe>
      </FieldGroup>
    </form>
  );
};
