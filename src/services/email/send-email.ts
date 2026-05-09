import { render } from "@react-email/components";
import nodemailer from "nodemailer";
import type { JSX } from "react";

import { env } from "~/env";

const transporter = nodemailer.createTransport({
  host: env.SMTP_SERVER_HOST,
  port: env.SMTP_SERVER_PORT,
  secure: env.NODE_ENV === "production",
  ignoreTLS: env.NODE_ENV !== "production",
  auth: {
    user: env.SMTP_SERVER_USERNAME,
    pass: env.SMTP_SERVER_PASSWORD,
  },
});

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

  try {
    await transporter.verify();
  } catch (error) {
    console.error(
      "Something Went Wrong",
      env.SMTP_SERVER_USERNAME,
      env.SMTP_SERVER_PASSWORD,
      error
    );
    return;
  }

  const info = await transporter.sendMail({
    from: env.MAIL_FROM_ADDRESS,
    to: sendTo,
    subject,
    html,
  });

  console.log("Message Sent", info.messageId);
  console.log("Mail sent to", sendTo);
  return info;
}
