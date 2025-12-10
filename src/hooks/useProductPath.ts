import { useMemo } from "react";
import { useParams } from "react-router-dom";
import { useProductStore } from "@/hooks/useStore";
import { getPathSegments, parseProductsPath } from "@/utils/catalog";

/**
 * Hook that parses the products path and returns the parsed path and products
 */
export const useProductPath = () => {
  const { "*": wildcardPath } = useParams<{ "*": string }>();
  const productStore = useProductStore();

  const pathSegments = useMemo(
    () => getPathSegments(wildcardPath),
    [wildcardPath]
  );

  const parsedPath = useMemo(
    () => parseProductsPath(pathSegments, productStore.products),
    [pathSegments, productStore.products]
  );

  const categorySegmentsKey = parsedPath.categorySegments.join("/");

  return {
    wildcardPath,
    pathSegments,
    parsedPath,
    categorySegmentsKey,
    products: productStore.products,
  };
};
