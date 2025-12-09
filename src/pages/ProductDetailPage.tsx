import Typography from "@/components/basic/typography/Typography";
import Button from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useCartStore, useProductStore } from "@/hooks/useStore";
import { useTranslate } from "@/utils/translate";
import { getLocalizedPrice, formatPrice } from "@/utils/price";
import { useNavigate, Link } from "react-router-dom";
import { ShoppingBag, Star, ArrowLeft, Check, PackageX } from "lucide-react";
import { URL_ENDPOINTS } from "@/app/Router";
import ProductCarouselGallery from "@/components/product/ProductCarouselGallery";
import ProductGallery from "@/components/product/ProductGallery";
import BreadcrumbCustomSeparator from "@/components/layout/BreadcrumbCustomSeparator";
import { getProductPathSegments, getProductSlug } from "@/utils/catalog";
import { useMemo } from "react";

interface ProductDetailPageProps {
  productSlug: string;
}

const ProductDetailPage = ({ productSlug }: ProductDetailPageProps) => {
  const navigate = useNavigate();
  const translate = useTranslate();

  const productStore = useProductStore();
  const cartStore = useCartStore();

  const product = productStore.products.find(
    (p) => getProductSlug(p) === productSlug
  );

  const galleryProducts = useMemo(() => {
    if (!product) return [];
    return productStore.products
      .filter((p) => p.id !== product.id)
      .filter((p) =>
        p.categoriesId.some((c) => product.categoriesId.includes(c))
      );
  }, [productStore.products, product]);

  if (!product) {
    return (
      <div className="py-12 flex justify-center">
        <Card className="w-full max-w-xl">
          <CardContent className="flex flex-col items-center gap-4 text-center py-10">
            <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center">
              <PackageX className="w-8 h-8 text-muted-foreground" />
            </div>
            <Typography type="H3">Produkt nebyl nalezen</Typography>
            <Typography type="muted" className="max-w-md">
              Tento produkt už není k dispozici nebo byl přesunut. Zkuste se
              vrátit zpět nebo pokračujte v prohlížení dalších produktů.
            </Typography>
            <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto justify-center">
              <Button
                variant="outline"
                className="w-full sm:w-auto"
                onClick={() => navigate(-1)}
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                <Typography type="p" className="mt-0">
                  Zpět
                </Typography>
              </Button>
              <Button
                className="w-full sm:w-auto"
                onClick={() => navigate(URL_ENDPOINTS.PRODUCTS)}
              >
                <ShoppingBag className="w-4 h-4 mr-2" />
                <Typography type="p" className="mt-0">
                  Pokračovat v nákupu
                </Typography>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  const price = getLocalizedPrice(product.price);
  const formattedPrice = formatPrice(price);

  const handleadd_to_cart = () => {
    cartStore.addItem({
      id: product.id,
      name: product.name,
      price: price,
      image: product.images[0],
    });
  };

  const variants = product.variantsId
    .map((variantId) => productStore.products.find((p) => p.id === variantId))
    .filter(Boolean);

  return (
    <div className="py-4 sm:py-6 lg:py-8">
      <BreadcrumbCustomSeparator />
      <div className="lg:hidden mb-4">
        <Typography type="muted" className="text-sm">
          {product.brand}
        </Typography>
        <Typography type="H3" intlId={product.nameIntlId} />
        <div className="flex items-center gap-2 mt-2">
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-4 h-4 ${
                  i < Math.floor(product.rating)
                    ? "fill-yellow-400 text-yellow-400"
                    : "text-gray-300"
                }`}
              />
            ))}
          </div>
          <Typography type="small">
            {product.rating} ({product.reviewsCount} recenzí)
          </Typography>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-10">
        <div className="space-y-4 lg:space-y-6">
          <ProductGallery images={product.images} alt={product.name} />
          <Card className="hidden sm:block">
            <CardContent className="p-4 sm:p-6">
              <Typography type="H4" intlId="products:detail.specifications" />
              <div className="mt-4 space-y-2">
                {Object.entries(product.specs).map(([key, value]) => (
                  <div
                    key={key}
                    className="flex justify-between py-2 border-b border-border last:border-b-0"
                  >
                    <Typography type="muted">
                      {key.charAt(0).toUpperCase() + key.slice(1)}
                    </Typography>
                    <Typography type="p" className="mt-0 text-right">
                      {String(value)}
                    </Typography>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
        <div className="space-y-4 sm:space-y-5 lg:space-y-6">
          <div className="hidden lg:block">
            <Typography type="muted">{product.brand}</Typography>
            <Typography type="H2" intlId={product.nameIntlId} />
            <div className="flex items-center gap-2 mt-2">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-5 h-5 ${
                      i < Math.floor(product.rating)
                        ? "fill-yellow-400 text-yellow-400"
                        : "text-gray-300"
                    }`}
                  />
                ))}
              </div>
              <Typography type="small">
                {product.rating} ({product.reviewsCount} recenzí)
              </Typography>
            </div>
          </div>
          <div>
            <Typography type="H2">{formattedPrice}</Typography>
          </div>
          <div className="flex items-center gap-2">
            {product.stock > 0 ? (
              <>
                <Check className="w-5 h-5 text-green-500" />
                <Typography type="small">
                  {translate("products:detail.in_stock")} ({product.stock}{" "}
                  {translate("products:detail.pieces")})
                </Typography>
              </>
            ) : (
              <Typography type="muted">
                {translate("products:detail.out_of_stock")}
              </Typography>
            )}
          </div>
          <div>
            <Typography type="p" intlId={product.shortDescription} />
          </div>
          {variants.length > 0 && (
            <div className="space-y-2">
              <Typography type="small" intlId="products:detail.variants" />
              <div className="flex flex-wrap gap-2">
                <div
                  className="w-8 h-8 rounded-full border-2 border-primary"
                  style={{ backgroundColor: product.color }}
                  title={translate(product.colorIntlId)}
                />
                {variants.map((variant) => {
                  const segments = getProductPathSegments(variant!);
                  const variantUrl = `${URL_ENDPOINTS.PRODUCTS}/${segments.join(
                    "/"
                  )}`;
                  return (
                    <Link key={variant!.id} to={variantUrl}>
                      <div
                        className="w-8 h-8 rounded-full border-2 border-border hover:border-primary cursor-pointer transition-all"
                        style={{ backgroundColor: variant!.color }}
                        title={translate(variant!.colorIntlId)}
                      />
                    </Link>
                  );
                })}
              </div>
            </div>
          )}
          <Button
            size="lg"
            className="w-full sm:w-auto flex items-center justify-center"
            onClick={handleadd_to_cart}
            disabled={product.stock === 0}
          >
            <ShoppingBag className="w-5 h-5 mr-2" />
            <Typography type="p" className="inline mt-0">
              {translate("products:detail.add_to_cart")}
            </Typography>
          </Button>
          <div className="pt-2 sm:pt-4">
            <Typography type="H4" intlId="products:detail.description" />
            <div className="mt-2">
              <Typography type="p" intlId={product.longDescription} />
            </div>
          </div>
          <Card className="sm:hidden">
            <CardContent className="p-4">
              <Typography type="H4" intlId="products:detail.specifications" />
              <div className="mt-3 space-y-2">
                {Object.entries(product.specs).map(([key, value]) => (
                  <div
                    key={key}
                    className="flex justify-between py-1.5 border-b border-border last:border-b-0 text-sm"
                  >
                    <Typography type="muted">
                      {key.charAt(0).toUpperCase() + key.slice(1)}
                    </Typography>
                    <Typography type="p" className="mt-0 text-right">
                      {String(value)}
                    </Typography>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      <div className="mt-8 sm:mt-10 lg:mt-12 flex flex-col gap-4">
        <Typography type="H4" intlId="products:detail.similar_products" />
        <ProductCarouselGallery data={galleryProducts} />
      </div>
    </div>
  );
};

export default ProductDetailPage;
