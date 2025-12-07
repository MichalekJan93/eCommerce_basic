import i18n from "@/lib/i18n";

export function getLocalizedPrice(priceKey: string): number {
  const price = i18n.t(priceKey);
  console.log(price);
  return Number(price) || 0;
}
