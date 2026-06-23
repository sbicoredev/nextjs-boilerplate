import { env } from "~/env";

export function absoluteUrl(path: string) {
  return `${removeSlashs(env.NEXT_PUBLIC_APP_URL)}/${removeSlashs(path)}`;
}

export function formatDate(
  date: Date | string | number | undefined,
  opts: Intl.DateTimeFormatOptions = {}
) {
  if (!date) {
    return "";
  }

  try {
    return new Intl.DateTimeFormat("en-US", {
      month: opts.month ?? "long",
      day: opts.day ?? "numeric",
      year: opts.year ?? "numeric",
      ...opts,
    }).format(new Date(date));
  } catch (_err) {
    console.log(_err);
    return "";
  }
}

export const removeSlashs = (str: string) => str.replace(/(^\/+)|(\/+$)/g, "");

export function throttle(cb: (...args: unknown[]) => unknown, delay = 400) {
  let wait = false;

  return (...args: unknown[]) => {
    if (wait) {
      return;
    }

    cb(...args);
    wait = true;
    setTimeout(() => {
      wait = false;
    }, delay);
  };
}

export function debounce(cb: (...args: unknown[]) => unknown, delay = 400) {
  let timer: NodeJS.Timeout;
  // Return an anonymous function that takes in any number of arguments
  return (...args: unknown[]) => {
    // Clear the previous timer to prevent the execution of 'mainFunction'
    clearTimeout(timer);

    timer = setTimeout(() => {
      cb(...args);
    }, delay);
  };
}

export function wait(time = 1000) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
}

export function formatBytes(
  bytes: number,
  opts: {
    decimals?: number;
    sizeType?: "accurate" | "normal";
  } = {}
) {
  const { decimals = 0, sizeType = "normal" } = opts;

  const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
  const accurateSizes = ["Bytes", "KiB", "MiB", "GiB", "TiB"];
  if (bytes === 0) {
    return "0 Byte";
  }
  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  return `${(bytes / 1024 ** i).toFixed(decimals)} ${
    sizeType === "accurate"
      ? (accurateSizes[i] ?? "Bytest")
      : (sizes[i] ?? "Bytes")
  }`;
}

export function toSentenceCase(str: string) {
  return (
    str
      // Insert space before any uppercase letter (fixes camelCase)
      .replace(/([A-Z])/g, " $1")
      // Replace underscores or hyphens with spaces (fixes snake_case/kebab-case)
      .replace(/[_-]+/g, " ")
      .trim()
      .toLowerCase()
      // Capitalize the first letter
      .replace(/^\w/, (c) => c.toUpperCase())
  );
  // .replace(/\s+/g, " ");
}

export function toTitleCase(str: string) {
  return (
    str
      // 1. Insert space before any uppercase letter (fixes camelCase)
      .replace(/([A-Z])/g, " $1")
      // 2. Replace underscores or hyphens with spaces (fixes snake_case/kebab-case)
      .replace(/[_-]+/g, " ")
      // 3. Trim extra spaces from ends
      .trim()
      // 4. Capitalize the first letter of every word
      .replace(/\b\w/g, (char) => char.toUpperCase())
  );
}

export function parseCookie(cookieString: string): Record<string, string> {
  const cookies: Record<string, string> = {};
  if (cookieString) {
    const cookieArray = cookieString.split(";");
    cookieArray.forEach((cookie) => {
      const parts = cookie.split("=");
      if (parts.length === 2) {
        // @ts-expect-error
        const key = parts[0].trim();
        // @ts-expect-error
        const value = parts[1].trim();
        cookies[key] = value;
      }
    });
  }
  return cookies;
}
