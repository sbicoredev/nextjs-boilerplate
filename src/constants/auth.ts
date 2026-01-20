export const SESSION_COOKIE = "session";
export const SIGNUP_EMAIL_COOKIE = "sign-up-email";

export const DEFAULT_LOGIN_REDIRECT = "/";

export const AUTH_URI = {
  signin: "/signin",
  signup: "/signup",
  forgotPassword: "/forgot-password",
  resetPassword: "/reset-password",
  verifyEmail: "/verify-email",
} as const;
