import "server-only";

/**
 * Throw this for errors that are expected, not a symptom of a bug, and
 * safe to show to the user verbatim — "not found", "forbidden", "rate
 * limited", "unauthorized", etc.
 *
 * `handleServerError` in `client.ts` only passes through `ActionError` and
 * better-auth `APIError` messages; every other thrown error is masked to a
 * generic message and reported (see `~/lib/error-reporter`), on the
 * assumption that an *unexpected* error is either a bug or leaks
 * implementation detail the client shouldn't see.
 *
 * Before this class existed, `unauthorized`/`forbidden`/`rate limited`
 * were thrown as plain `Error`s and silently fell into the same "unexpected,
 * mask + report" bucket as a real bug — the user saw a generic "internal
 * server error" instead of "unauthorized", and logs got noise for
 * routine, expected rejections.
 */
export class ActionError extends Error {}
