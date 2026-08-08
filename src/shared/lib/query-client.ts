import {
  defaultShouldDehydrateQuery,
  environmentManager,
  MutationCache,
  QueryCache,
  QueryClient,
} from "@tanstack/react-query";
import { isRedirectError } from "next/dist/client/components/redirect-error";

import { toast } from "~/components/ui/toast";

function makeQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60 * 1000,
      },
      dehydrate: {
        // include pending queries in dehydration
        shouldDehydrateQuery: (query) =>
          defaultShouldDehydrateQuery(query) ||
          query.state.status === "pending",
        shouldRedactErrors: () => {
          // We should not catch Next.js server errors
          // as that's how Next.js detects dynamic pages
          // so we cannot redact them.
          // Next.js also automatically redacts errors for us
          // with better digests.
          return false;
        },
      },
    },
    queryCache: new QueryCache({
      onError(error, query) {
        if (query.meta?.skipGlobalHandler) {
          return;
        }
        if (!isRedirectError(error)) {
          toast.add({ type: "error", description: error.message });
        }
      },
    }),
    mutationCache: new MutationCache({
      onError(error, _, __, mutation) {
        if (mutation.meta?.skipGlobalHandler) {
          return;
        }
        if (!isRedirectError(error)) {
          toast.add({ type: "error", description: error.message });
        }
      },
    }),
  });
}

let browserQueryClient: QueryClient | undefined;

export function getQueryClient() {
  if (environmentManager.isServer()) {
    // Server: always make a new query client
    return makeQueryClient();
  }
  // Browser: make a new query client if we don't already have one
  // This is very important, so we don't re-make a new client if React
  // suspends during the initial render. This may not be needed if we
  // have a suspense boundary BELOW the creation of the query client
  if (!browserQueryClient) {
    browserQueryClient = makeQueryClient();
  }
  return browserQueryClient;
}

declare module "@tanstack/react-query" {
  interface Register {
    queryMeta: {
      skipGlobalHandler?: boolean;
    };
    mutationMeta: {
      skipGlobalHandler?: boolean;
    };
  }
}
