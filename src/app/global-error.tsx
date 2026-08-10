"use client";

import { useEffect } from "react";

import { reportError } from "~/lib/error-reporter";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  // This is the one boundary guaranteed to catch errors that escaped every
  // other error.tsx in the tree — the most important place to log, and
  // previously the one place that didn't.
  useEffect(() => {
    reportError(error, { boundary: "global", digest: error.digest });
  }, [error]);

  return (
    <html lang="en">
      <body>
        <h2>Something went wrong!</h2>
        <button onClick={() => reset()} type="button">
          Try again
        </button>
        {error.message}
      </body>
    </html>
  );
}
