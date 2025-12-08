import Typography from "@/components/basic/typography/Typography";
import ProductCategoryCard from "@/components/product/ProductCategoryCard";
import ProductCarousel from "@/components/product/ProductCarousel";
import ProductDetailPage from "@/pages/ProductDetailPage";
import { useProductStore } from "@/hooks/useStore";
import { observer } from "mobx-react-lite";
import { useEffect, useMemo } from "react";
import { useSearchParams, useParams } from "react-router-dom";
import { getCategoryIdByFullPath, parseProductsPath } from "@/utils/catalog";

const ProductsPage = observer(() => {
  const [searchParams] = useSearchParams();
  const { "*": wildcardPath } = useParams<{ "*": string }>();
  const categoryIdParam = searchParams.get("category");
  const productStore = useProductStore();

  // Parse the wildcard path into segments
  const pathSegments = useMemo(() => {
    if (!wildcardPath) return [];
    return wildcardPath.split("/").filter(Boolean);
  }, [wildcardPath]);

  // Determine if this is a product or category page
  const parsedPath = useMemo(() => {
    return parseProductsPath(pathSegments, productStore.products);
  }, [pathSegments, productStore.products]);

  useEffect(() => {
    let effectiveCategoryId: string | null = categoryIdParam;

    if (!effectiveCategoryId && parsedPath.categorySegments.length > 0) {
      effectiveCategoryId = getCategoryIdByFullPath(
        parsedPath.categorySegments
      );
    }

    productStore.setCategory(effectiveCategoryId);
  }, [categoryIdParam, parsedPath.categorySegments, productStore]);

  // If this is a product page, render ProductDetailPage
  if (parsedPath.type === "product" && parsedPath.productSlug) {
    return <ProductDetailPage productSlug={parsedPath.productSlug} />;
  }

  // Otherwise render category listing
  return (
    <>
      <div className="py-8">
        <Typography
          type="H1"
          intlId={productStore.selectedCategory?.titleIntlId}
        />
        <div className="mt-4">
          <Typography
            type="muted"
            intlId={productStore.selectedCategory?.descriptionIntlId}
          />
        </div>
        {productStore.selectedCategory?.subCategories && (
          <div className="flex gap-2 sm:gap-4 mt-4  pb-2 -mx-2 px-2 sm:-mx-4 sm:px-4 scrollbar-thin">
            {productStore.selectedCategory.subCategories.map((category) => (
              <ProductCategoryCard key={category.id} category={category} />
            ))}
          </div>
        )}
      </div>
      <ProductCarousel data={productStore.filteredProducts} />
    </>
  );
});

export default ProductsPage;
