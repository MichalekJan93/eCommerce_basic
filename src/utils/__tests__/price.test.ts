import { describe, it, expect, vi, beforeEach } from "vitest";
import { getLocalizedPrice, formatPrice, getFormattedPrice } from "../price";
import i18n from "@/lib/i18n";

// Mock i18n
vi.mock("@/lib/i18n", () => ({
  default: {
    t: vi.fn(),
    language: "en",
  },
}));

describe("price utils", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("getLocalizedPrice", () => {
    it("should return numeric price from i18n translation", () => {
      vi.mocked(i18n.t).mockReturnValue("1299");
      expect(getLocalizedPrice("products:product.test.price")).toBe(1299);
    });

    it("should return 0 for invalid price", () => {
      vi.mocked(i18n.t).mockReturnValue("invalid");
      expect(getLocalizedPrice("products:product.test.price")).toBe(0);
    });

    it("should handle decimal prices", () => {
      vi.mocked(i18n.t).mockReturnValue("1299.99");
      expect(getLocalizedPrice("products:product.test.price")).toBe(1299.99);
    });

    it("should return 0 for empty string", () => {
      vi.mocked(i18n.t).mockReturnValue("");
      expect(getLocalizedPrice("products:product.test.price")).toBe(0);
    });
  });

  describe("formatPrice", () => {
    it("should format price in EUR for English locale", () => {
      i18n.language = "en";
      const formatted = formatPrice(1299);
      expect(formatted).toContain("1,299");
      expect(formatted).toContain("€");
    });

    it("should format price in CZK for Czech locale", () => {
      i18n.language = "cs";
      const formatted = formatPrice(29990);
      expect(formatted).toContain("29");
      expect(formatted).toContain("990");
      expect(formatted).toContain("Kč");
    });

    it("should handle zero price", () => {
      i18n.language = "en";
      const formatted = formatPrice(0);
      expect(formatted).toContain("0");
    });

    it("should handle decimal prices", () => {
      i18n.language = "en";
      const formatted = formatPrice(1299.99);
      expect(formatted).toContain("1,299.99");
    });

    it("should default to EUR for unknown language", () => {
      i18n.language = "fr";
      const formatted = formatPrice(1299);
      expect(formatted).toContain("€");
    });

    it("should handle large numbers", () => {
      i18n.language = "en";
      const formatted = formatPrice(999999);
      expect(formatted).toContain("999,999");
    });
  });

  describe("getFormattedPrice", () => {
    it("should get and format price from i18n key", () => {
      vi.mocked(i18n.t).mockReturnValue("1299");
      i18n.language = "en";
      const formatted = getFormattedPrice("products:product.test.price");
      expect(formatted).toContain("1,299");
      expect(formatted).toContain("€");
    });

    it("should handle invalid price key", () => {
      vi.mocked(i18n.t).mockReturnValue("invalid");
      i18n.language = "en";
      const formatted = getFormattedPrice("products:product.test.price");
      expect(formatted).toContain("0");
    });

    it("should work with Czech locale", () => {
      vi.mocked(i18n.t).mockReturnValue("29990");
      i18n.language = "cs";
      const formatted = getFormattedPrice("products:product.test.price");
      expect(formatted).toContain("29");
      expect(formatted).toContain("990");
      expect(formatted).toContain("Kč");
    });
  });
});

