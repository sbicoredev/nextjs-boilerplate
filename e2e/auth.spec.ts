import { expect, test } from "@playwright/test";

import { getLatestOtpFor } from "./helpers/mailpit";

const baseUri = "http://localhost:3000";

/**
 * The one end-to-end path the architecture review flagged as needing
 * coverage before anything else: the full auth flow, exercised as a real
 * user would hit it (not against `auth-service.ts` directly), through
 * middleware, the sign-up/verify/sign-in pages, and the dashboard's
 * server-side session gate.
 *
 * Requires `pnpm dev` and `pnpm docker:up` (for Postgres + Mailpit)
 * running first — see playwright.config.ts and the root README.
 */
test("sign up, verify email, sign in, forgot password, reset password and sign out", async ({
  page,
}) => {
  const email = `e2e-${Date.now()}@example.com`;
  const password = "E2ETestPassword123!";

  await test.step("sign up", async () => {
    await page.goto(`${baseUri}/signup`);

    const nameInput = page.locator('input[name="name"]');
    const emailInput = page.locator('input[name="email"]');
    const passInput = page.locator('input[name="password"]');
    const confirmPassInput = page.locator('input[name="confirmPassword"]');
    const submitButton = page.locator('button[type="submit"]');

    await nameInput.click();
    await nameInput.fill("E2E Test User");
    await expect(nameInput).toHaveValue("E2E Test User");

    await emailInput.click();
    await emailInput.fill(email);
    await expect(emailInput).toHaveValue(email);

    await passInput.click();
    await passInput.fill(password);
    await expect(passInput).toHaveValue(password);

    await confirmPassInput.click();
    await confirmPassInput.fill(password);
    await expect(confirmPassInput).toHaveValue(password);

    await Promise.all([
      submitButton.click(),
      expect(submitButton).toBeDisabled(),
    ]);

    await expect(page).toHaveURL(`${baseUri}/verify-email`);
  });

  await test.step("verify email via the OTP mailpit received", async () => {
    const otpInput = page.locator('[data-slot="input-otp"]');
    const submitButton = page.locator('button[type="submit"]');
    const otp = await getLatestOtpFor(email);

    await otpInput.click();
    await otpInput.fill(otp);
    await expect(otpInput).toHaveValue(otp);

    await Promise.all([
      submitButton.click(),
      expect(submitButton).toBeDisabled(),
    ]);

    // expect a success message and go to signin page button
    await expect(
      page.getByText("Email verification successfull")
    ).toBeVisible();
    await expect(page.locator('a[role="button"]')).toBeVisible();

    await page.locator('a[role="button"]').click();
    await expect(page).toHaveURL(`${baseUri}/signin`);
  });

  await test.step("sign in", async () => {
    const emailInput = page.locator('input[name="email"]');
    const passInput = page.locator('input[name="password"]');
    const submitButton = page.locator('button[type="submit"]');

    await emailInput.click();
    await emailInput.fill(email);
    await expect(emailInput).toHaveValue(email);

    await passInput.click();
    await passInput.fill(password);
    await expect(passInput).toHaveValue(password);

    await Promise.all([
      submitButton.click(),
      expect(submitButton).toBeDisabled(),
    ]);

    await expect(page).toHaveURL(`${baseUri}`);
  });

  await test.step("home page renders as the signed-in user", async () => {
    await expect(
      page.locator('a[role="button"]').getByText("Dashboard")
    ).toBeVisible();
  });

  await test.step("sign out returns to a public page", async () => {
    await page
      .locator('header button[data-slot="dropdown-menu-trigger"]')
      .click();
    await page
      .locator('[data-slot="dropdown-menu-content"]')
      .getByText("Log out")
      .click();
    await expect(
      page.locator('header a[href="/signin"]').getByText("Get Started")
    ).toBeVisible();
  });

  await test.step("forgot password", async () => {
    await page.goto(`${baseUri}/forgot-password`);
    const emailInput = page.locator('input[name="email"]');
    const submitButton = page.locator('button[type="submit"]');

    await emailInput.click();
    await emailInput.fill(email);
    await expect(emailInput).toHaveValue(email);

    await Promise.all([
      submitButton.click(),
      expect(submitButton).toBeDisabled(),
    ]);

    await expect(page).toHaveURL(`${baseUri}/reset-password`);
  });

  await test.step("reset password", async () => {
    const otpInput = page.locator('[data-slot="input-otp"]');
    const passInput = page.locator('input[name="password"]');
    const confirmPassInput = page.locator('input[name="confirmPassword"]');
    const submitButton = page.locator('button[type="submit"]');

    const otp = await getLatestOtpFor(email);

    await otpInput.click();
    await otpInput.fill(otp);
    await expect(otpInput).toHaveValue(otp);

    await passInput.click();
    await passInput.fill(`${password}-updated`);
    await expect(passInput).toHaveValue(`${password}-updated`);

    await confirmPassInput.click();
    await confirmPassInput.fill(`${password}-updated`);
    await expect(confirmPassInput).toHaveValue(`${password}-updated`);

    await Promise.all([
      submitButton.click(),
      expect(submitButton).toBeDisabled(),
    ]);

    await expect(page).toHaveURL(`${baseUri}/signin`);
  });

  await test.step("sign in using updated password", async () => {
    const emailInput = page.locator('input[name="email"]');
    const passInput = page.locator('input[name="password"]');
    const submitButton = page.locator('button[type="submit"]');

    await emailInput.click();
    await emailInput.fill(email);
    await expect(emailInput).toHaveValue(email);

    await passInput.click();
    await passInput.fill(`${password}-updated`);
    await expect(passInput).toHaveValue(`${password}-updated`);

    await Promise.all([
      submitButton.click(),
      expect(submitButton).toBeDisabled(),
    ]);

    await expect(page).toHaveURL(`${baseUri}`);

    await page
      .locator('header button[data-slot="dropdown-menu-trigger"]')
      .click();
    await page
      .locator('[data-slot="dropdown-menu-content"]')
      .getByText("Log out")
      .click();
    await expect(
      page.locator('header a[href="/signin"]').getByText("Get Started")
    ).toBeVisible();
  });
});
