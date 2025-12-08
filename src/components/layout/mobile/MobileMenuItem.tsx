import { memo, useState } from "react";
import { Link } from "react-router-dom";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { useTranslate } from "@/utils/translate";
import Typography from "../../basic/typography/Typography";
import type { SubCategory } from "@/types/types";
import { URL_ENDPOINTS } from "@/app/Router";
import { getCategoryFullPathSegments } from "@/utils/catalog";

interface MobileMenuItemProps {
  titleIntlId: string;
  categories: SubCategory[];
}

const MobileMenuItem = memo(
  ({ titleIntlId, categories }: MobileMenuItemProps) => {
    const translate = useTranslate();
    const [isOpen, setIsOpen] = useState(false);

    return (
      <div className="border-b border-border">
        <button
          onClick={() => setIsOpen((prev) => !prev)}
          className="flex w-full items-center justify-between py-3 text-left font-medium cursor-pointer"
        >
          {translate(titleIntlId)}
          <ChevronDown
            className={cn(
              "h-4 w-4 transition-transform duration-300",
              isOpen && "rotate-180"
            )}
          />
        </button>
        <div
          className={cn(
            "grid transition-all duration-300",
            isOpen ? "grid-rows-[1fr] pb-3" : "grid-rows-[0fr]"
          )}
        >
          <div className="overflow-hidden">
            <div className="flex flex-col gap-3 pl-2">
              {categories.map((category) => {
                const segments = getCategoryFullPathSegments(category.id);
                const categoryUrl = segments?.length
                  ? `${URL_ENDPOINTS.PRODUCTS}/${segments.join("/")}`
                  : URL_ENDPOINTS.PRODUCTS;

                return (
                  <div key={category.id}>
                    <Link to={categoryUrl} className="flex items-center gap-3">
                      <img
                        src={category.image}
                        alt=""
                        className="h-8 w-8 object-contain"
                      />
                      <Typography intlId={category.titleIntlId} type="p" />
                    </Link>
                    <div className="mt-1 flex flex-wrap gap-2 pl-11">
                      {category.subCategories &&
                        category.subCategories.map((subCategory) => {
                          const subSegments = getCategoryFullPathSegments(
                            subCategory.id
                          );
                          const subCategoryUrl = subSegments?.length
                            ? `${URL_ENDPOINTS.PRODUCTS}/${subSegments.join(
                                "/"
                              )}`
                            : URL_ENDPOINTS.PRODUCTS;

                          return (
                            <Link
                              key={subCategory.id}
                              to={subCategoryUrl}
                              className="text-xs text-primary hover:underline"
                            >
                              {translate(subCategory.titleIntlId)}
                            </Link>
                          );
                        })}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    );
  }
);

MobileMenuItem.displayName = "MobileMenuItem";

export default MobileMenuItem;
