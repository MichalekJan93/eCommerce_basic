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
    <div className="w-full px-8 sm:px-12 flex justify-center">
      <Carousel
        opts={{
          align: "start",
        }}
        className="w-full"
      >
        <CarouselContent className="-ml-2 sm:-ml-4">
          {data.map((product) => (
            <CarouselItem
              key={product.id}
              className="pl-2 sm:pl-4 basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/5"
            >
              <ProductCard product={product} />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="-left-6 sm:-left-10" />
        <CarouselNext className="-right-6 sm:-right-10" />
      </Carousel>
    </div>
  );
};

export default ProductCarouselGallery;
