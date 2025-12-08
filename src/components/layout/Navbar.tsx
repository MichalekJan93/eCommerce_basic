import { Link } from "react-router-dom";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "../ui/navigation-menu";
import Typography from "../basic/typography/Typography";
import { useTranslate } from "@/utils/translate";
import type { SubCategory } from "@/types/types";
import { useProductStore } from "@/hooks/useStore";
import { URL_ENDPOINTS } from "@/app/Router";
import { getCategoryFullPathSegments } from "@/utils/catalog";

const Navbar = () => {
  const translate = useTranslate();
  const { categories } = useProductStore();

  return (
    <NavigationMenu>
      <NavigationMenuList className="flex-wrap">
        {categories.map((category) => (
          <NavigationMenuItem key={translate(category.id)}>
            <>
              <NavigationMenuTrigger>
                {translate(category.titleIntlId)}
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid gap-2 md:w-[650px] lg:grid-cols-[.75fr_1fr] p-2">
                  <li className="row-span-3">
                    <NavigationMenuLink asChild>
                      <div className="from-muted/50 to-muted relative flex h-full w-full flex-col justify-end rounded-md bg-linear-to-b p-1 no-underline outline-hidden transition-all duration-300 select-none focus:shadow-md md:p-6">
                        {category.image && (
                          <img
                            src={category.image}
                            alt=""
                            className="absolute top-2 left-2 h-1/2 w-1/2 object-contain"
                          />
                        )}
                        <div className="mb-2 text-lg font-medium sm:mt-4">
                          {translate(category.titleIntlId)}
                        </div>
                        <p className="text-muted-foreground text-sm leading-tight">
                          {translate(category.descriptionIntlId)}
                        </p>
                      </div>
                    </NavigationMenuLink>
                  </li>
                  {category.subCategories.map((subItem) => (
                    <ListItem
                      key={subItem.id}
                      id={subItem.id}
                      title={subItem.titleIntlId}
                      image={subItem.image}
                      subCategories={subItem.subCategories}
                      className="hover:bg-muted/50 rounded-md p-2"
                    >
                      {subItem.titleIntlId}
                    </ListItem>
                  ))}
                </ul>
              </NavigationMenuContent>
            </>
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  );
};

export default Navbar;

function ListItem({
  title,
  image,
  id,
  subCategories,
  ...props
}: React.ComponentPropsWithoutRef<"li"> & {
  id: string;
  image: string;
  subCategories?: SubCategory[];
}) {
  const translate = useTranslate();
  const segments = getCategoryFullPathSegments(id);
  const categoryUrl = segments?.length
    ? `${URL_ENDPOINTS.PRODUCTS}/${segments.join("/")}`
    : URL_ENDPOINTS.PRODUCTS;

  return (
    <li {...props}>
      <NavigationMenuLink asChild>
        <Link to={categoryUrl} className="flex gap-5 items-center">
          <img src={image} alt={title} width={40} height={40} />
          <Typography intlId={title} type="small" />
        </Link>
      </NavigationMenuLink>
      <ul className="mt-2 flex gap-4">
        {subCategories &&
          subCategories.map((category) => {
            const subSegments = getCategoryFullPathSegments(category.id);
            const subCategoryUrl = subSegments?.length
              ? `${URL_ENDPOINTS.PRODUCTS}/${subSegments.join("/")}`
              : URL_ENDPOINTS.PRODUCTS;

            return (
              <Link
                key={category.id}
                to={subCategoryUrl}
                className="hover:underline text-primary text-sm"
              >
                {translate(category.titleIntlId)}
              </Link>
            );
          })}
      </ul>
    </li>
  );
}
