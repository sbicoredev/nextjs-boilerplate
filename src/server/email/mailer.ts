import nodemailer from "nodemailer";

import { serverEnv } from "~/env/server";
import { reportError } from "~/lib/error-reporter";

export const transporter = nodemailer.createTransport({
  host: serverEnv.SMTP_SERVER_HOST,
  port: serverEnv.SMTP_SERVER_PORT,
  secure: serverEnv.NODE_ENV === "production",
  ignoreTLS: serverEnv.NODE_ENV !== "production",
  auth: {
    user: serverEnv.SMTP_SERVER_USERNAME,
    pass: serverEnv.SMTP_SERVER_PASSWORD,
  },
});

export const verifyMailer = async () => {
  try {
    await transporter.verify();
  } catch (error) {
    reportError(error, {
      smtpUserName: serverEnv.SMTP_SERVER_USERNAME,
      smtpPassword: serverEnv.SMTP_SERVER_PASSWORD,
    });
  }
};
