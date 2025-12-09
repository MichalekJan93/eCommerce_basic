import Typography from "@/components/basic/typography/Typography";
import ProductCarouselGallery from "@/components/product/ProductCarouselGallery";
import { useProductStore } from "@/hooks/useStore";

const HomePage = () => {
  const store = useProductStore();
  return (
    <div className="flex flex-col gap-8">
      {/* Full width banner on mobile, normal width on md+ */}
      <div className="relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] w-screen md:left-0 md:right-0 md:ml-0 md:mr-0 md:w-full">
        <img
          src="/banners/macbook.webp"
          alt="Banner"
          className="w-full h-auto object-cover md:rounded-lg"
        />
      </div>

      <div>
        <Typography type="H3" intlId="common:best_sellers" className="mb-2" />
        <ProductCarouselGallery
          data={store.products.filter((p) => p.categoriesId.includes("cat1"))}
        />
      </div>

      {/* Full width banner on mobile, normal width on md+ */}
      <div className="relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] w-screen md:left-0 md:right-0 md:ml-0 md:mr-0 md:w-full">
        <img
          src="/banners/ipad.webp"
          alt="Banner"
          className="w-full h-auto object-cover md:rounded-lg"
        />
      </div>

      <div>
        <Typography
          type="H3"
          intlId="common:latest_products"
          className="mb-2"
        />
        <ProductCarouselGallery
          data={store.products.filter((p) => p.categoriesId.includes("cat2"))}
        />
      </div>
      <div>
        <Typography
          type="H3"
          intlId="common:products_for_the_home"
          className="mb-2"
        />
        <ProductCarouselGallery
          data={store.products.filter((p) => p.categoriesId.includes("cat3"))}
        />
      </div>
    </div>
  );
};

export default HomePage;
