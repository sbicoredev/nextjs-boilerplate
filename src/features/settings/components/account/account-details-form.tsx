"use client";

import { useForm } from "@tanstack/react-form";
import { AlertTriangleIcon, XIcon } from "lucide-react";
import Image from "next/image";

import { ButtonSpinner } from "~/components/button-spinner";
import { Alert, AlertDescription, AlertTitle } from "~/components/ui/alert";
import { Button } from "~/components/ui/button";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "~/components/ui/field";
import { Input } from "~/components/ui/input";
import { Skeleton } from "~/components/ui/skeleton";
import { ErrorMessaage } from "~/constants/error-message";
import { useAuth } from "~/contexts/auth-context";
import { mapToFormError } from "~/utils/form";

import { useUpdateProfile } from "../../hooks/use-update-profile";
import { updateProfileSchema } from "../../schemas/profile-schema";

export const AccountDetailsForm = () => {
  const { user } = useAuth();
  const { mutateAsync, isSuccess } = useUpdateProfile();

  const form = useForm({
    defaultValues: {
      name: user.name ?? "",
      image: user.image ?? "",
    },
    validators: { onSubmit: updateProfileSchema },
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

  const formAvatar = form.getFieldValue("image");

  return (
    <form
      className="grid gap-6 space-y-0 md:grid-cols-2"
      onSubmit={(e) => {
        e.preventDefault();
        e.stopPropagation();
        form.handleSubmit();
      }}
    >
      <FieldGroup>
        <div>
          <p className="mb-4 font-medium text-sm">Profile picture</p>
          {formAvatar ? (
            <div className="flex gap-4">
              <Image
                alt="user avatar"
                className="size-50 rounded-full border object-cover shadow-md"
                height={150}
                src={formAvatar}
                width={150}
              />
              <Button
                className="size-8"
                // onClick={() => removeImage()}
                size={"icon"}
                variant={"destructive"}
              >
                <XIcon />
              </Button>
            </div>
          ) : (
            <Skeleton className="size-50 rounded-full border" />
          )}
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

        <form.Field name="name">
          {(field) => {
            const isInvalid =
              field.state.meta.isTouched && !field.state.meta.isValid;
            return (
              <Field data-invalid={isInvalid}>
                <FieldLabel htmlFor={field.name}>Name</FieldLabel>
                <Input
                  aria-invalid={isInvalid}
                  id={field.name}
                  name={field.name}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  placeholder="Jhon Doe"
                  required
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
