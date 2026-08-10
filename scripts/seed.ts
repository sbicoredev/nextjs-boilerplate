/**
 * Seeds a single admin account: admin@example.com / Admin123!
 *
 * Requires the dev server to be running (`pnpm dev`), because it signs up
 * through better-auth's real HTTP endpoint rather than calling
 * `auth.api.signUpEmail()` in-process — better-auth's `nextCookies()`
 * plugin needs a real Next.js request context (`next/headers`) to set the
 * session cookie, which a standalone script doesn't have. Hitting the
 * actual endpoint is also just a more faithful test that sign-up works at
 * all, which running this script tends to double as.
 *
 * After sign-up, this script connects to Postgres directly to mark the
 * account as email-verified and grant the `admin` role — both steps a
 * normal user goes through UI/OTP flows for, which doesn't make sense to
 * automate for a one-off seed.
 *
 * Usage: pnpm dev            (in one terminal)
 *        pnpm db:seed        (in another)
 */
import { config } from "dotenv";
import { eq } from "drizzle-orm";

config();

const APP_URL = process.env.BETTER_AUTH_URL ?? "http://localhost:3000";
const ADMIN_EMAIL = "admin@example.com";
const ADMIN_PASSWORD = "Admin123!";
const ADMIN_NAME = "Admin";

async function main() {
  // Imported after `config()` so these modules see the loaded env vars.
  const { db } = await import("../src/server/db/client");
  const { user } = await import("../src/features/auth/server/db-schema");

  console.log(`Seeding admin account at ${APP_URL} ...`);

  const response = await fetch(`${APP_URL}/api/auth/sign-up/email`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email: ADMIN_EMAIL,
      password: ADMIN_PASSWORD,
      name: ADMIN_NAME,
    }),
  });

  if (!response.ok) {
    const body = await response.text();
    if (body.includes("already exists") || response.status === 422) {
      console.log(
        `${ADMIN_EMAIL} already exists — skipping sign-up, just verifying role/verification.`
      );
    } else {
      throw new Error(
        `Sign-up failed (${response.status}): ${body}\n\n` +
          "Is the dev server running? This script needs `pnpm dev` in another terminal."
      );
    }
  }

  const [updated] = await db
    .update(user)
    .set({ emailVerified: true, role: "admin" })
    .where(eq(user.email, ADMIN_EMAIL))
    .returning();

  if (!updated) {
    throw new Error(
      `Could not find ${ADMIN_EMAIL} after sign-up — check DB_URL points at the same database the dev server is using.`
    );
  }

  console.log("Done. You can sign in with:");
  console.log(`  email:    ${ADMIN_EMAIL}`);
  console.log(`  password: ${ADMIN_PASSWORD}`);
  process.exit(0);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
