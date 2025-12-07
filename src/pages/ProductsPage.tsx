import Typography from "@/components/basic/typography/Typography";
import ProductCard from "@/components/product/ProductCard";
import ProductCategoryCard from "@/components/product/ProductCategoryCard";
import { useProductStore } from "@/hooks/useStore";
import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";

const ProductsPage = observer(() => {
  const [searchParams] = useSearchParams();
  const categoryId = searchParams.get("category");
  const productStore = useProductStore();

  useEffect(() => {
    productStore.setCategory(categoryId);
  }, [categoryId, productStore]);

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
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {productStore.filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </>
  );
});

export default ProductsPage;
