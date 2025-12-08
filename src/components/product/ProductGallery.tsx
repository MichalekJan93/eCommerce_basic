import { useState } from "react";
import { Card } from "../ui/card";

interface IProductGalleryProps {
  images: string[];
  alt: string;
}

const ProductGallery = ({ images, alt }: IProductGalleryProps) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  return (
    <div className="space-y-4">
      {/* Main Image */}
      <Card className="p-4 sm:p-8">
        <img
          src={images[selectedImageIndex]}
          alt={alt}
          className="w-full h-64 sm:h-80 md:h-96 object-contain"
        />
      </Card>

      {/* Thumbnails */}
      <div className="flex gap-2 sm:gap-4 overflow-x-auto pb-2">
        {images.map((image, index) => (
          <button
            key={index}
            onClick={() => setSelectedImageIndex(index)}
            className={`shrink-0 p-2 border rounded-lg cursor-pointer transition-all duration-300 ${
              selectedImageIndex === index
                ? "border-primary hover:border-primary"
                : "border-border hover:border-primary"
            }`}
          >
            <img
              src={image}
              alt={`${alt} - ${index + 1}`}
              className="w-16 h-16 sm:w-20 sm:h-20 object-contain"
            />
          </button>
        ))}
      </div>
    </div>
  );
};

export default ProductGallery;
