import type { JSX } from "react";
import { render } from "react-email";

import { serverEnv } from "~/env/server";

import { transporter } from "./mailer";

export async function sendEmail({
  sendTo,
  subject,
  react,
}: {
  sendTo: string;
  subject: string;
  react: JSX.Element;
}) {
  const html = await render(react);

  const info = await transporter.sendMail({
    from: serverEnv.EMAIL_FROM,
    to: sendTo,
    subject,
    html,
  });

  console.log("Message Sent", info.messageId);
  console.log("Mail sent to", sendTo);
  return info;
}
