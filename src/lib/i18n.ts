import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import commonEN from "../locales/en/common.json";
import productsEN from "../locales/en/products.json";

import commonCS from "../locales/cs/common.json";
import productsCS from "../locales/cs/products.json";

const resources = {
  en: {
    common: commonEN,
    products: productsEN,
  },
  cs: {
    common: commonCS,
    products: productsCS,
  },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: "en",
    defaultNS: "common",
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
