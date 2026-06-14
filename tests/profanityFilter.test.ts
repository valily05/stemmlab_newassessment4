jest.mock("bad-words", () => {
  return {
    Filter: jest.fn().mockImplementation(() => ({
      isProfane: jest.fn((text: string) =>
        ["fuck", "shit", "bitch", "gay"].includes(text)
      ),
    })),
  };
});

import {
    containsOffensiveContent,
    normalizeText,
} from "../utils/profanityFilter";

describe("normalizeText", () => {
  test("converts text to lowercase", () => {
    expect(normalizeText("HELLO")).toBe("hello");
  });

  test("replaces exclamation marks with i", () => {
    expect(normalizeText("Hello!!!")).toBe("helloiii");
  });

  test("replaces numbers with letters", () => {
    expect(normalizeText("h3ll0")).toBe("hello");
  });

  test("removes spaces", () => {
    expect(normalizeText("Hello World")).toBe("helloworld");
  });
});

describe("containsOffensiveContent", () => {
  test("returns false for clean text", () => {
    expect(containsOffensiveContent("Hello World")).toBe(false);
  });

  test("detects offensive word", () => {
    expect(containsOffensiveContent("fuck")).toBe(true);
  });

  test("detects abbreviated offensive word", () => {
    expect(containsOffensiveContent("fk")).toBe(true);
  });

  test("detects offensive word with numbers", () => {
    expect(containsOffensiveContent("sh1t")).toBe(true);
  });

  test("detects clean text", () => {
    expect(containsOffensiveContent("Welcome to STEMM Lab")).toBe(false);
  });
});