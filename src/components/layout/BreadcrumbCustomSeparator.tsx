import { Fragment, useMemo } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
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
  getCategoryFullPathSegments,
  getProductCategoryPath,
  parseProductsPath,
} from "@/utils/catalog";
import { slugify } from "@/utils/slug";

const BreadcrumbCustomSeparator = () => {
  const location = useLocation();
  const { "*": wildcardPath } = useParams<{ "*": string }>();
  const productStore = useProductStore();
  const translate = useTranslate();

  // Parse the wildcard path
  const pathSegments = useMemo(() => {
    if (!wildcardPath) return [];
    return wildcardPath.split("/").filter(Boolean);
  }, [wildcardPath]);

  const parsedPath = useMemo(() => {
    return parseProductsPath(pathSegments, productStore.products);
  }, [pathSegments, productStore.products]);

  const items: { label: string; to?: string }[] = [];

  // Home
  const isHome = location.pathname === URL_ENDPOINTS.HOME;
  items.push({ label: "Home", to: isHome ? undefined : URL_ENDPOINTS.HOME });

  if (isHome) {
    // just Home
  } else if (location.pathname === URL_ENDPOINTS.CART) {
    items.push({ label: "Cart" });
  } else if (location.pathname === URL_ENDPOINTS.CHECKOUT) {
    items.push({ label: "Checkout" });
  } else if (location.pathname.startsWith(URL_ENDPOINTS.PRODUCTS)) {
    if (parsedPath.type === "product" && parsedPath.productSlug) {
      // Product detail page
      const product = productStore.products.find(
        (p) => slugify(p.name) === parsedPath.productSlug
      );

      if (product) {
        const categoryPath = getProductCategoryPath(product);

        categoryPath.forEach((category) => {
          const segments = getCategoryFullPathSegments(category.id);
          const categoryUrl = segments?.length
            ? `${URL_ENDPOINTS.PRODUCTS}/${segments.join("/")}`
            : URL_ENDPOINTS.PRODUCTS;

          items.push({
            label: translate(category.titleIntlId),
            to: categoryUrl,
          });
        });

        items.push({ label: translate(product.nameIntlId) });
      } else {
        items.push({ label: "Product" });
      }
    } else if (parsedPath.categorySegments.length > 0) {
      // Category page - build breadcrumb from path segments
      const category = productStore.selectedCategory;

      if (category) {
        // Build breadcrumb from the actual category path in store
        if (productStore.selectedCategory) {
          // Get the path to current category
          const currentCatPath = getCategoryFullPathSegments(
            productStore.selectedCategory.id
          );

          if (currentCatPath) {
            // Build accumulated path for each segment
            let accumulatedSegments: string[] = [];

            currentCatPath.forEach((segment, index) => {
              accumulatedSegments = [...accumulatedSegments, segment];
              const isLast = index === currentCatPath.length - 1;
              const categoryUrl = `${
                URL_ENDPOINTS.PRODUCTS
              }/${accumulatedSegments.join("/")}`;

              const matchingCat = productStore.categories
                .flatMap((c) => {
                  const flatten = (
                    cat: typeof c,
                    acc: (typeof c)[] = []
                  ): (typeof c)[] => {
                    acc.push(cat);
                    if (cat.subCategories) {
                      for (const sub of cat.subCategories) {
                        flatten(sub as typeof c, acc);
                      }
                    }
                    return acc;
                  };
                  return flatten(c);
                })
                .find((c) => slugify(c.name) === segment);

              items.push({
                label: matchingCat
                  ? translate(matchingCat.titleIntlId)
                  : segment,
                to: isLast ? undefined : categoryUrl,
              });
            });
          }
        }
      } else {
        items.push({ label: "Products" });
      }
    } else {
      items.push({ label: "Products" });
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
