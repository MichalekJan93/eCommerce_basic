import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

// Import translations
import commonEN from "../locales/en/common.json";
import productsEN from "../locales/en/products.json";
import cartEN from "../locales/en/cart.json";
import checkoutEN from "../locales/en/checkout.json";

import commonCS from "../locales/cs/common.json";
import productsCS from "../locales/cs/products.json";
import cartCS from "../locales/cs/cart.json";
import checkoutCS from "../locales/cs/checkout.json";

const resources = {
  en: {
    common: commonEN,
    products: productsEN,
    cart: cartEN,
    checkout: checkoutEN,
  },
  cs: {
    common: commonCS,
    products: productsCS,
    cart: cartCS,
    checkout: checkoutCS,
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
