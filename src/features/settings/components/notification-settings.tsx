"use client";

import { useForm } from "@tanstack/react-form";
import { toast } from "sonner";

import { Button } from "~/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from "~/components/ui/field";
import { RadioGroup, RadioGroupItem } from "~/components/ui/radio-group";
import { Separator } from "~/components/ui/separator";

import {
  type UpdateNotificationPayload,
  updateNotificationSchema,
} from "../schemas";

const defaultValues: Partial<UpdateNotificationPayload> = {
  communication_emails: false,
  marketing_emails: false,
  social_emails: true,
  security_emails: true,
};

export const NotificationSettings = () => {
  const form = useForm({
    defaultValues,
    validators: { onSubmit: updateNotificationSchema },
    onSubmit: async ({ value }) => onSubmit(value),
  });

  function onSubmit(data: Partial<UpdateNotificationPayload>) {
    toast.info(
      <pre className="mt-2 w-85 rounded-md bg-slate-950 p-4">
        <code className="text-white">{JSON.stringify(data, null, 2)}</code>
      </pre>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="font-medium text-lg">Notifications</h3>
        <p className="text-muted-foreground text-sm">
          Configure how you receive notifications.
        </p>
      </div>
      <Separator />
      <form
        className="space-y-8"
        onSubmit={(e) => {
          e.preventDefault();
          form.handleSubmit();
        }}
      >
        <FieldGroup>
          <form.Field name="type">
            {(field) => {
              const isInvalid =
                field.state.meta.isTouched && !field.state.meta.isValid;
              return (
                <FieldSet className="w-full max-w-xs">
                  <FieldLegend variant="label">
                    Notification Preferences
                  </FieldLegend>
                  <FieldDescription>
                    Choose how you want to receive notifications.
                  </FieldDescription>
                  <RadioGroup
                    name={field.name}
                    onValueChange={field.handleChange}
                    value={field.state.value}
                  >
                    <Field data-invalid orientation="horizontal">
                      <RadioGroupItem
                        aria-invalid
                        id="invalid-email"
                        value="email"
                      />
                      <FieldLabel
                        className="font-normal"
                        htmlFor="invalid-email"
                      >
                        Email only
                      </FieldLabel>
                    </Field>
                    <Field data-invalid orientation="horizontal">
                      <RadioGroupItem
                        aria-invalid
                        id="invalid-sms"
                        value="sms"
                      />
                      <FieldLabel className="font-normal" htmlFor="invalid-sms">
                        SMS only
                      </FieldLabel>
                    </Field>
                    <Field data-invalid orientation="horizontal">
                      <RadioGroupItem
                        aria-invalid
                        id="invalid-both"
                        value="both"
                      />
                      <FieldLabel
                        className="font-normal"
                        htmlFor="invalid-both"
                      >
                        Both Email & SMS
                      </FieldLabel>
                    </Field>
                  </RadioGroup>
                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </FieldSet>
              );
            }}
          </form.Field>
          <Button type="submit">Update notifications</Button>
        </FieldGroup>
      </form>
    </div>
  );
};
