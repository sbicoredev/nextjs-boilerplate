import { describe, expect, it } from "vitest";

import { removeSlashs, toSentenceCase, toTitleCase } from "./string";

describe("toSentenceCase", () => {
  it("converts snake_case to sentence case", () => {
    expect(toSentenceCase("hello_world")).toBe("Hello world");
  });
  it("converts kebab-case to sentence case", () => {
    expect(toSentenceCase("some-long-string")).toBe("Some long string");
  });
  it("handles single word", () => {
    expect(toSentenceCase("hello")).toBe("Hello");
  });
  it("handles empty string", () => {
    expect(toSentenceCase("")).toBe("");
  });
});

describe("toTitleCase", () => {
  it("capitalises every word", () => {
    expect(toTitleCase("hello world")).toBe("Hello World");
  });
  it("handles empty string", () => {
    expect(toTitleCase("")).toBe("");
  });
});

describe("removeSlashes", () => {
  it("removes leading and trailing slashes", () => {
    expect(removeSlashs("/hello/world/")).toBe("hello/world");
  });
  it("handles no slashes", () => {
    expect(removeSlashs("hello")).toBe("hello");
  });
  it("handles empty string", () => {
    expect(removeSlashs("")).toBe("");
  });
});
