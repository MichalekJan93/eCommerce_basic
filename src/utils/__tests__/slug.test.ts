import { describe, it, expect } from "vitest";
import { slugify } from "../slug";

describe("slugify", () => {
  it("should convert text to lowercase", () => {
    expect(slugify("Hello World")).toBe("hello-world");
    expect(slugify("UPPERCASE")).toBe("uppercase");
  });

  it("should replace spaces with hyphens", () => {
    expect(slugify("hello world")).toBe("hello-world");
    expect(slugify("multiple   spaces")).toBe("multiple-spaces");
  });

  it("should remove diacritics", () => {
    expect(slugify("café")).toBe("cafe");
    expect(slugify("naïve")).toBe("naive");
    expect(slugify("Zürich")).toBe("zurich");
    // Note: Ł is a special Polish character that doesn't normalize to 'l' with NFKD
    expect(slugify("Łódź")).toBe("odz");
    expect(slugify("Příliš žluťoučký kůň")).toBe("prilis-zlutoucky-kun");
  });

  it("should remove special characters", () => {
    expect(slugify("hello@world")).toBe("hello-world");
    expect(slugify("test!@#$%^&*()")).toBe("test");
    expect(slugify("hello_world")).toBe("hello-world");
  });

  it("should trim leading and trailing hyphens", () => {
    expect(slugify("-hello-")).toBe("hello");
    expect(slugify("--hello--")).toBe("hello");
    expect(slugify("   hello   ")).toBe("hello");
  });

  it("should handle multiple consecutive special characters", () => {
    expect(slugify("hello---world")).toBe("hello-world");
    expect(slugify("test!!!test")).toBe("test-test");
  });

  it("should handle empty string", () => {
    expect(slugify("")).toBe("");
  });

  it("should handle numbers", () => {
    expect(slugify("iPhone 17 Pro")).toBe("iphone-17-pro");
    expect(slugify("Test 123")).toBe("test-123");
  });

  it("should handle mixed content", () => {
    expect(slugify("iPhone 17 Pro White")).toBe("iphone-17-pro-white");
    expect(slugify('MacBook Pro 16"')).toBe("macbook-pro-16");
  });

  it("should normalize unicode characters", () => {
    expect(slugify("Ñoño")).toBe("nono");
    expect(slugify("São Paulo")).toBe("sao-paulo");
  });

  it("should handle category names", () => {
    expect(slugify("phones")).toBe("phones");
    expect(slugify("iphone")).toBe("iphone");
    expect(slugify("iphone_17")).toBe("iphone-17");
  });

  it("should handle product names from the app", () => {
    expect(slugify("iPhone 17 Pro White")).toBe("iphone-17-pro-white");
    expect(slugify("Samsung Galaxy S25 Ultra Black")).toBe(
      "samsung-galaxy-s25-ultra-black"
    );
  });
});
