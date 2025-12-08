/**
 * Convert text to URL-friendly "slug"
 * @param text Text to convert
 * @returns Slug
 */
export const slugify = (text: string): string => {
  return text
    .toString()
    .normalize("NFKD")
    .replace(/\p{Diacritic}/gu, "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
};
