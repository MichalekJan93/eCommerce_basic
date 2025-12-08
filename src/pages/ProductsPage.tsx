import Typography from "@/components/basic/typography/Typography";
import ProductCategoryCard from "@/components/product/ProductCategoryCard";
import ProductCards from "@/components/product/ProductCards";
import ProductDetailPage from "@/pages/ProductDetailPage";
import { useProductStore } from "@/hooks/useStore";
import { useProductPath } from "@/hooks/useProductPath";
import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { getCategoryIdByFullPath } from "@/utils/catalog";

const ProductsPage = observer(() => {
  const [searchParams] = useSearchParams();
  const categoryIdParam = searchParams.get("category");
  const productStore = useProductStore();
  const { parsedPath, categorySegmentsKey } = useProductPath();

  useEffect(() => {
    let effectiveCategoryId: string | null = categoryIdParam;

    if (!effectiveCategoryId && parsedPath.categorySegments.length > 0) {
      effectiveCategoryId = getCategoryIdByFullPath(
        parsedPath.categorySegments
      );
    }

    productStore.setCategory(effectiveCategoryId);
    // categorySegmentsKey is a string representation of parsedPath.categorySegments
    // to avoid infinite loop caused by array reference change
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [categoryIdParam, categorySegmentsKey, productStore]);

  if (parsedPath.type === "product" && parsedPath.productSlug) {
    return <ProductDetailPage productSlug={parsedPath.productSlug} />;
  }

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
      <ProductCards data={productStore.filteredProducts} />
    </>
  );
});

export default ProductsPage;
