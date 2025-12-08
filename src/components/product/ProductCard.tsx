import type { Product } from "@/types/types";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Link } from "react-router-dom";
import Button from "../ui/button";
import { ShoppingBag } from "lucide-react";
import Typography from "../basic/typography/Typography";
import { URL_ENDPOINTS } from "@/app/Router";
import { getProductPathSegments } from "@/utils/catalog";
import { getFormattedPrice } from "@/utils/price";

export interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const formattedPrice = getFormattedPrice(product.price);

  const segments = getProductPathSegments(product);
  const productUrl = `${URL_ENDPOINTS.PRODUCTS}/${segments.join("/")}`;

  return (
    <Card className="w-full text-center p-2 sm:p-3 hover:border-primary relative flex flex-col h-full transition-all duration-300 ease-in-out">
      <Link to={productUrl}>
        <span className="absolute inset-0"></span>
        <CardHeader className="items-center p-2 sm:p-4">
          <img
            src={product.images[0]}
            alt={product.name}
            className="w-24 h-24 sm:w-32 sm:h-32 object-contain"
          />
        </CardHeader>
      </Link>
      <CardContent className="pb-4 grow">
        <CardTitle className="text-sm sm:text-base">
          <Typography type="p" intlId={product.nameIntlId} />
        </CardTitle>
        <CardDescription className="mt-2 text-xs sm:text-sm line-clamp-2">
          <Typography type="muted" intlId={product.shortDescription} />
        </CardDescription>
        <div className="flex gap-2 sm:gap-5 font-bold justify-center mt-3 sm:mt-4 text-sm sm:text-base">
          <Typography type="p">{formattedPrice}</Typography>
        </div>
      </CardContent>
      <Button
        variant="outline"
        size="sm"
        className="bg-primary text-primary-foreground hover:bg-primary/80 hover:text-primary-foreground relative z-10 text-xs sm:text-sm"
      >
        <ShoppingBag className="w-4 h-4" />
        <span className="hidden xs:inline ml-1">Add to cart</span>
        <span className="xs:hidden ml-1">Add</span>
      </Button>
    </Card>
  );
};

export default ProductCard;
