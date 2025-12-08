import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";
import type { Product } from "@/types/types";
import ProductCard from "./ProductCard";

interface IProductCarouselGallery {
  data: Product[];
}

const ProductCarouselGallery = ({ data }: IProductCarouselGallery) => {
  return (
    <div className="w-full p-6 flex justify-center">
      <Carousel
        opts={{
          align: "start",
        }}
        className="w-full max-w-sm"
      >
        <CarouselContent>
          {data.map((product) => (
            <CarouselItem
              key={product.id}
              className="md:basis-1/2 lg:basis-1/3"
            >
              <div className="p-1">
                <ProductCard product={product} />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
};

export default ProductCarouselGallery;
