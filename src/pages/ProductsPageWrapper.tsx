import { observer } from "mobx-react-lite";
import { useMemo } from "react";
import { useProductPath } from "@/hooks/useProductPath";
import { getCategoryIdByFullPath } from "@/utils/catalog";
import ProductsPage from "./ProductsPage";
import NotFoundPage from "./NotFoundPage";

/**
 * Wrapper component that validates the products path
 * and renders either ProductsPage or NotFoundPage
 */
const ProductsPageWrapper = observer(() => {
  const { pathSegments, parsedPath } = useProductPath();

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
