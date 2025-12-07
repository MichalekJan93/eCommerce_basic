import { useTranslation } from "react-i18next";

/**
 * Hook that returns a reactive translate function
 * @returns translate function that updates when language changes
 */
export function useTranslate() {
  const { t } = useTranslation();

  return function translate(
    key: string,
    params?: Record<string, string | number>
  ): string {
    return t(key, params);
  };
}
