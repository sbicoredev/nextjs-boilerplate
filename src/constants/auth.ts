export const SESSION_COOKIE = "session";
export const SIGNUP_EMAIL_COOKIE = "sign-up-email";
export const EMAIL_OTP_COOKIE = "email-otp";
export const CALLBACK_QUERY_NAME = "callback-url";

export const AUTH_ROUTES = {
  signIn: "/signin",
  signUp: "/signup",
  forgotPassword: "/forgot-password",
  resetPassword: "/reset-password",
  verifyEmail: "/verify-email",
} as const;

export const AUTH_REDIRECT_PATHS = {
  afterSignIn: "/",
  afterSignOut: AUTH_ROUTES.signIn,
  afterSignUp: AUTH_ROUTES.verifyEmail,
  afterEmailVerified: AUTH_ROUTES.signIn,
  afterRequestResetPass: AUTH_ROUTES.resetPassword,
  afterPassReset: AUTH_ROUTES.signIn,
} as const;

export const OAUTH_PROVIDERS = ["google", "github"] as const;
export type OAuthProvider = (typeof OAUTH_PROVIDERS)[number];

export const ROLES = ["admin", "user"] as const;
