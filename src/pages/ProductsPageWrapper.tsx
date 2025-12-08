import { useParams } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { useMemo } from "react";
import { useProductStore } from "@/hooks/useStore";
import { getCategoryIdByFullPath, parseProductsPath } from "@/utils/catalog";
import ProductsPage from "./ProductsPage";
import NotFoundPage from "./NotFoundPage";

function getPathSegments(wildcardPath: string | undefined) {
  if (!wildcardPath) return [];
  return wildcardPath.split("/").filter(Boolean);
}

/**
 * Wrapper component that validates the products path
 * and renders either ProductsPage or NotFoundPage
 */
const ProductsPageWrapper = observer(() => {
  const { "*": wildcardPath } = useParams<{ "*": string }>();
  const productStore = useProductStore();

  const pathSegments = getPathSegments(wildcardPath);
  const parsedPath = parseProductsPath(pathSegments, productStore.products);

  const isValidPath = useMemo(() => {
    // Empty path is always valid (shows all products)
    if (pathSegments.length === 0) return true;

    // If it's a product, the product exists (parseProductsPath already validated it)
    if (parsedPath.type === "product" && parsedPath.productSlug) return true;

    // If it's a category path, check if the category exists
    if (parsedPath.categorySegments.length > 0) {
      const categoryId = getCategoryIdByFullPath(parsedPath.categorySegments);
      return categoryId !== null;
    }

    return true;
  }, [pathSegments, parsedPath]);

  if (!isValidPath) {
    return <NotFoundPage />;
  }

  return <ProductsPage />;
});

export default ProductsPageWrapper;

