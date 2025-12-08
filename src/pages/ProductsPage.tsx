import Typography from "@/components/basic/typography/Typography";
import ProductCategoryCard from "@/components/product/ProductCategoryCard";
import ProductCarousel from "@/components/product/ProductCarousel";
import { useProductStore } from "@/hooks/useStore";
import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { useSearchParams, useParams } from "react-router-dom";
import { getCategoryIdBySlugSegments } from "@/utils/catalog";

const ProductsPage = observer(() => {
  const [searchParams] = useSearchParams();
  const { categorySlug, subCategorySlug } = useParams<{
    categorySlug?: string;
    subCategorySlug?: string;
  }>();
  const categoryId = searchParams.get("category");
  const productStore = useProductStore();

  useEffect(() => {
    let effectiveCategoryId: string | null = categoryId;

    if (!effectiveCategoryId) {
      const slugs = [categorySlug, subCategorySlug].filter(Boolean) as string[];

      if (slugs.length) {
        effectiveCategoryId = getCategoryIdBySlugSegments(slugs);
      }
    }

    productStore.setCategory(effectiveCategoryId);
  }, [categoryId, categorySlug, subCategorySlug, productStore]);

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
