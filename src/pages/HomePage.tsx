import Typography from "@/components/basic/typography/Typography";
import ProductCarouselGallery from "@/components/product/ProductCarouselGallery";
import { useProductStore } from "@/hooks/useStore";

const HomePage = () => {
  const store = useProductStore();
  return (
    <div className="flex flex-col gap-8">
      {[
        {
          banner: "/banners/macbook.webp",
          titleIntlId: "common:best_sellers",
          categoryId: "cat1",
        },
        {
          banner: "/banners/ipad.webp",
          titleIntlId: "common:latest_products",
          categoryId: "cat2",
        },
      ].map((section, index) => (
        <div key={index}>
          <div className="relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] w-screen md:left-0 md:right-0 md:ml-0 md:mr-0 md:w-full">
            <img
              src={section.banner}
              alt="Banner"
              className="w-full h-auto object-cover md:rounded-lg"
            />
          </div>
          <div>
            <Typography
              type="H3"
              intlId={section.titleIntlId}
              className="my-5"
            />
            <ProductCarouselGallery
              data={store.products.filter((p) =>
                p.categoriesId.includes(section.categoryId)
              )}
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default HomePage;
