import { Link } from "react-router-dom";
import { Card } from "../ui/card";
import type { Category, SubCategory } from "@/types/types";
import Typography from "../basic/typography/Typography";
import { URL_ENDPOINTS } from "@/app/Router";
import { getCategoryPathSegmentsForCategoryId } from "@/utils/catalog";

interface ProductCategoryCardProps {
  category: Category | SubCategory;
}

const ProductCategoryCard = ({ category }: ProductCategoryCardProps) => {
  const segments = getCategoryPathSegmentsForCategoryId(category.id);
  const categoryUrl = segments?.length
    ? `${URL_ENDPOINTS.PRODUCTS}/${segments.join("/")}?category=${category.id}`
    : `${URL_ENDPOINTS.PRODUCTS}?category=${category.id}`;

  return (
    <Card className="shrink-0 text-left p-2 sm:p-3 hover:border-primary relative flex items-center min-w-[120px] sm:min-w-[180px] transition-all duration-300 ease-in-out">
      <Link to={categoryUrl}>
        <span className="absolute inset-0"></span>
        <div className="flex items-center gap-2 sm:gap-4 justify-center">
          <img
            src={category.image}
            alt={category.name}
            className="w-5 h-5 sm:w-6 sm:h-6"
          />
          <Typography intlId={category.titleIntlId} type="small" />
        </div>
      </Link>
    </Card>
  );
};

export default ProductCategoryCard;
