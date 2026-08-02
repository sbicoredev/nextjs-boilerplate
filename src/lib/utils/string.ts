/** Convert snake_case or kebab-case to Sentence case. */
export function toSentenceCase(str: string): string {
  if (!str) {
    return "";
  }
  const cleaned = str.replace(/[_-]+/g, " ").trim();
  return cleaned.charAt(0).toUpperCase() + cleaned.slice(1).toLowerCase();
}

/** Convert a string to Title Case. */
export function toTitleCase(str: string): string {
  if (!str) {
    return "";
  }
  return str.replace(/\b\w/g, (c) => c.toUpperCase());
}

/** Remove leading and trailing forward-slashes. */
export function removeSlashs(str: string): string {
  return str.replace(/^\/+|\/+$/g, "");
}
