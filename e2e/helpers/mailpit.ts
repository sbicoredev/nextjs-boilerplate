const MAILPIT_URL = process.env.MAILPIT_URL ?? "http://localhost:8025";

type MailpitMessage = {
  ID: string;
  To: { Address: string }[];
};

/**
 * Polls Mailpit's REST API for the most recent OTP email sent to `email`
 * and extracts the 6-digit code from its plain-text body. Mailpit is the
 * dev-only SMTP catcher already provisioned in docker-compose.yaml — this
 * only works against that, not a real SMTP provider.
 */
export async function getLatestOtpFor(
  email: string,
  { timeoutMs = 10_000, intervalMs = 500 } = {}
): Promise<string> {
  const deadline = Date.now() + timeoutMs;

  while (Date.now() < deadline) {
    const searchRes = await fetch(
      `${MAILPIT_URL}/api/v1/search?query=to:${encodeURIComponent(email)}`
    );
    if (searchRes.ok) {
      const { messages } = (await searchRes.json()) as {
        messages: MailpitMessage[];
      };
      const latest = messages.at(0);
      if (latest) {
        const messageRes = await fetch(
          `${MAILPIT_URL}/api/v1/message/${latest.ID}`
        );
        const message = (await messageRes.json()) as { Text: string };
        const match = message.Text.match(/\b(\d{6})\b/);
        if (match?.[1]) {
          return match[1];
        }
      }
    }
    await new Promise((resolve) => setTimeout(resolve, intervalMs));
  }

  throw new Error(
    `No OTP email arrived for ${email} within ${timeoutMs}ms. Is mailpit running (\`pnpm docker:up\`)?`
  );
}
