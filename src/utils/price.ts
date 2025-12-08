import i18n from "@/lib/i18n";

// Map language to currency and locale
const CURRENCY_CONFIG: Record<string, { currency: string; locale: string }> = {
  cs: { currency: "CZK", locale: "cs-CZ" },
  en: { currency: "EUR", locale: "en-US" },
};

/**
 * Gets the raw numeric price from i18n translation
 * @param priceKey Key to price in i18n
 * @returns Price as number
 */
export function getLocalizedPrice(priceKey: string): number {
  const price = i18n.t(priceKey);
  return Number(price) || 0;
}

/**
 * Format price with currency symbol
 * @param price Price to format
 * @returns Formatted price
 */
export function formatPrice(price: number): string {
  const lang = i18n.language?.substring(0, 2) || "en";
  const config = CURRENCY_CONFIG[lang] || CURRENCY_CONFIG.en;

  return new Intl.NumberFormat(config.locale, {
    style: "currency",
    currency: config.currency,
  }).format(price);
}

/**
 * Gets the price from i18n and formats it with currency symbol
 * @param priceKey Key to price in i18n
 * @returns Formatted price
 */
export function getFormattedPrice(priceKey: string): string {
  const price = getLocalizedPrice(priceKey);
  return formatPrice(price);
}
