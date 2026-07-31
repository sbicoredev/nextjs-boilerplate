import { render } from "@react-email/components";
import nodemailer from "nodemailer";
import type { JSX } from "react";

import { serverEnv } from "~/env/server";

const transporter = nodemailer.createTransport({
  host: serverEnv.SMTP_SERVER_HOST,
  port: serverEnv.SMTP_SERVER_PORT,
  secure: serverEnv.NODE_ENV === "production",
  ignoreTLS: serverEnv.NODE_ENV !== "production",
  auth: {
    user: serverEnv.SMTP_SERVER_USERNAME,
    pass: serverEnv.SMTP_SERVER_PASSWORD,
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
      serverEnv.SMTP_SERVER_USERNAME,
      serverEnv.SMTP_SERVER_PASSWORD,
      error
    );
    return;
  }

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
