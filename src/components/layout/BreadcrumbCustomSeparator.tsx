import { Fragment } from "react";
import {
  Link,
  useLocation,
  useParams,
  useSearchParams,
} from "react-router-dom";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "../ui/breadcrumb";
import { URL_ENDPOINTS } from "@/app/Router";
import { useProductStore } from "@/hooks/useStore";
import { useTranslate } from "@/utils/translate";
import {
  getCategoryPathById,
  getCategoryPathSegmentsForCategoryId,
  getProductCategoryPath,
  getProductSlug,
} from "@/utils/catalog";

const BreadcrumbCustomSeparator = () => {
  const location = useLocation();
  const { productSlug } = useParams<{ productSlug?: string }>();
  const [searchParams] = useSearchParams();
  const productStore = useProductStore();
  const translate = useTranslate();

  const items: { label: string; to?: string }[] = [];

  // Home
  const isHome = location.pathname === URL_ENDPOINTS.HOME;
  items.push({ label: "Home", to: isHome ? undefined : URL_ENDPOINTS.HOME });

  if (isHome) {
    // jen Home
  } else if (location.pathname === URL_ENDPOINTS.CART) {
    items.push({ label: "Cart" });
  } else if (location.pathname === URL_ENDPOINTS.CHECKOUT) {
    items.push({ label: "Checkout" });
  } else if (location.pathname.startsWith(URL_ENDPOINTS.PRODUCTS)) {
    if (productSlug) {
      // Product detail page
      const product = productStore.products.find(
        (p) => getProductSlug(p) === productSlug
      );

      if (product) {
        const categoryPath = getProductCategoryPath(product);

        categoryPath.forEach((category) => {
          const segments = getCategoryPathSegmentsForCategoryId(category.id);
          const categoryUrl = segments?.length
            ? `${URL_ENDPOINTS.PRODUCTS}/${segments.join("/")}?category=${
                category.id
              }`
            : `${URL_ENDPOINTS.PRODUCTS}?category=${category.id}`;

          items.push({
            label: translate(category.titleIntlId),
            to: categoryUrl,
          });
        });

        items.push({ label: translate(product.nameIntlId) });
      } else {
        items.push({ label: "Product" });
      }
    } else {
      // Products list page
      const categoryId = searchParams.get("category");

      if (categoryId) {
        const categoryPath = getCategoryPathById(categoryId);

        if (categoryPath) {
          categoryPath.forEach((category, index) => {
            const isLast = index === categoryPath.length - 1;

            const segments = getCategoryPathSegmentsForCategoryId(category.id);
            const categoryUrl = segments?.length
              ? `${URL_ENDPOINTS.PRODUCTS}/${segments.join("/")}?category=${
                  category.id
                }`
              : `${URL_ENDPOINTS.PRODUCTS}?category=${category.id}`;

            items.push({
              label: translate(category.titleIntlId),
              to: isLast ? undefined : categoryUrl,
            });
          });
        }
      } else {
        items.push({ label: "Products" });
      }
    }
  }

  return (
    <Breadcrumb className="mb-4">
      <BreadcrumbList>
        {items.map((item, index) => {
          const isLast = index === items.length - 1;

          return (
            <Fragment key={`${item.label}-${index}`}>
              {index > 0 && <BreadcrumbSeparator>/</BreadcrumbSeparator>}
              <BreadcrumbItem>
                {isLast || !item.to ? (
                  <BreadcrumbPage>{item.label}</BreadcrumbPage>
                ) : (
                  <BreadcrumbLink asChild>
                    <Link to={item.to}>{item.label}</Link>
                  </BreadcrumbLink>
                )}
              </BreadcrumbItem>
            </Fragment>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export default BreadcrumbCustomSeparator;
