import { describe, expect, it } from "vitest";

import { getSafeRedirectPath } from "./safe-redirect";

const FALLBACK = "/dashboard";

describe("getSafeRedirectPath", () => {
  describe("valid same-origin paths", () => {
    it("allows a plain relative path", () => {
      expect(getSafeRedirectPath("/dashboard/settings", FALLBACK)).toBe(
        "/dashboard/settings"
      );
    });

    it("allows a relative path with a query string", () => {
      expect(getSafeRedirectPath("/dashboard?tab=billing", FALLBACK)).toBe(
        "/dashboard?tab=billing"
      );
    });

    it("allows the root path", () => {
      expect(getSafeRedirectPath("/", FALLBACK)).toBe("/");
    });
  });

  describe("missing input", () => {
    it("falls back on null", () => {
      expect(getSafeRedirectPath(null, FALLBACK)).toBe(FALLBACK);
    });

    it("falls back on undefined", () => {
      expect(getSafeRedirectPath(undefined, FALLBACK)).toBe(FALLBACK);
    });

    it("falls back on empty string", () => {
      expect(getSafeRedirectPath("", FALLBACK)).toBe(FALLBACK);
    });
  });

  describe("absolute / off-site URLs", () => {
    it("rejects a full https URL", () => {
      expect(getSafeRedirectPath("https://evil.example.com", FALLBACK)).toBe(
        FALLBACK
      );
    });

    it("rejects a full http URL", () => {
      expect(getSafeRedirectPath("http://evil.example.com", FALLBACK)).toBe(
        FALLBACK
      );
    });

    it("rejects a protocol-relative URL", () => {
      expect(getSafeRedirectPath("//evil.example.com", FALLBACK)).toBe(
        FALLBACK
      );
    });

    it("rejects a protocol-relative URL with extra slashes", () => {
      expect(getSafeRedirectPath("///evil.example.com", FALLBACK)).toBe(
        FALLBACK
      );
    });
  });

  describe("non-http(s) schemes", () => {
    it("rejects a path that doesn't start with /", () => {
      expect(getSafeRedirectPath("javascript:alert(1)", FALLBACK)).toBe(
        FALLBACK
      );
    });

    it("rejects a data: URL", () => {
      expect(getSafeRedirectPath("data:text/html,evil", FALLBACK)).toBe(
        FALLBACK
      );
    });
  });

  describe("encoded / obfuscated payloads", () => {
    it("rejects a URL-encoded protocol-relative payload", () => {
      // decodes to "//evil.example.com"
      expect(getSafeRedirectPath("/%2F%2Fevil.example.com", FALLBACK)).toBe(
        FALLBACK
      );
    });

    it("rejects a backslash-based protocol-relative payload", () => {
      // some browsers normalize leading backslashes to forward slashes
      expect(getSafeRedirectPath("/\\evil.example.com", FALLBACK)).toBe(
        FALLBACK
      );
    });

    it("rejects an encoded scheme payload", () => {
      // decodes to "/javascript:alert(1)" — still rejected because it
      // doesn't match a bare relative path once decoded and re-checked
      const encoded = `/${encodeURIComponent("//evil.example.com")}`;
      expect(getSafeRedirectPath(encoded, FALLBACK)).toBe(FALLBACK);
    });

    it("falls back gracefully on malformed percent-encoding", () => {
      expect(getSafeRedirectPath("/%", FALLBACK)).toBe(FALLBACK);
    });
  });

  describe("whitespace tricks", () => {
    it("rejects a candidate with leading/trailing whitespace", () => {
      expect(getSafeRedirectPath("  /dashboard  ", FALLBACK)).toBe(FALLBACK);
    });

    it("rejects a tab-obfuscated protocol-relative payload", () => {
      expect(getSafeRedirectPath("/\t/evil.example.com", FALLBACK)).toBe(
        FALLBACK
      );
    });
  });
});
