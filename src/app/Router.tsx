import { createBrowserRouter } from "react-router-dom";
import MainLayout from "@/components/layout/MainLayout";
import HomePage from "@/pages/HomePage";
import ProductsPage from "@/pages/ProductsPage";
import ProductDetailPage from "@/pages/ProductDetailPage";
import CartPage from "@/pages/CartPage";
import CheckoutPage from "@/pages/CheckoutPage";
import NotFoundPage from "@/pages/NotFoundPage";

export const URL_ENDPOINTS = {
  HOME: "/",
  PRODUCTS: "/products",
  CART: "/cart",
  CHECKOUT: "/checkout",
};

const router = createBrowserRouter([
  {
    element: <MainLayout />,
    children: [
      {
        path: URL_ENDPOINTS.HOME,
        element: <HomePage />,
        handle: { title: "Home" },
      },
      {
        path: URL_ENDPOINTS.PRODUCTS,
        element: <ProductsPage />,
        handle: { title: "Products" },
      },
      {
        path: `${URL_ENDPOINTS.PRODUCTS}/:categorySlug`,
        element: <ProductsPage />,
        handle: { title: "Products" },
      },
      {
        path: `${URL_ENDPOINTS.PRODUCTS}/:categorySlug/:subCategorySlug`,
        element: <ProductsPage />,
        handle: { title: "Products" },
      },
      {
        path: `${URL_ENDPOINTS.PRODUCTS}/:categorySlug/:subCategorySlug/:productSlug`,
        element: <ProductDetailPage />,
        handle: { title: "Product Detail" },
      },
      {
        path: URL_ENDPOINTS.CART,
        element: <CartPage />,
        handle: { title: "Cart" },
      },
      {
        path: URL_ENDPOINTS.CHECKOUT,
        element: <CheckoutPage />,
        handle: { title: "Checkout" },
      },
      {
        path: "*",
        element: <NotFoundPage />,
        handle: { title: "Not Found" },
      },
    ],
  },
]);

export default router;
