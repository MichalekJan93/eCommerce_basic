import Typography from "@/components/basic/typography/Typography";
import Button from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useCartStore, useProductStore } from "@/hooks/useStore";
import { useTranslate } from "@/utils/translate";
import { getLocalizedPrice } from "@/utils/price";
import { useParams, useNavigate, Link } from "react-router-dom";
import { ShoppingBag, Star, ArrowLeft, Check } from "lucide-react";
import { URL_ENDPOINTS } from "@/app/Router";
import ProductCarouselGallery from "@/components/product/ProductCarouselGallery";
import ProductGallery from "@/components/product/ProductGallery";
import BreadcrumbCustomSeparator from "@/components/layout/BreadcrumbCustomSeparator";

const ProductDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const translate = useTranslate();

  const productStore = useProductStore();
  const cartStore = useCartStore();

  const product = productStore.products.find((p) => p.id === id);

  if (!product) {
    return (
      /* TODO lepsi komponenta */
      <div className="py-8 text-center">
        <Typography type="H2">Produkt nebyl nalezen</Typography>
        <Button
          className="mt-4"
          onClick={() => navigate(URL_ENDPOINTS.PRODUCTS)}
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          <Typography type="p">Zpět na produkty</Typography>
        </Button>
      </div>
    );
  }

  const price = getLocalizedPrice(product.price);
  const currency = translate(product.currency);

  const handleAddToCart = () => {
    cartStore.addItem({
      id: product.id,
      name: product.name,
      price: price,
      image: product.images[0],
    });
  };

  // Get variant products
  const variants = product.variantsId
    .map((variantId) => productStore.products.find((p) => p.id === variantId))
    .filter(Boolean);

  return (
    <div className="py-4 sm:py-8">
      <BreadcrumbCustomSeparator />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-12">
        <ProductGallery images={product.images} alt={product.name} />
        {/* Product Info */}
        <div className="space-y-6">
          {/* Brand */}
          <Typography type="muted">{product.brand}</Typography>

          {/* Name */}
          <Typography type="H1" intlId={product.nameIntlId} />

          {/* Rating */}
          <div className="flex items-center gap-2">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-4 h-4 sm:w-5 sm:h-5 ${
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

          {/* Short Description */}
          <Typography type="p" intlId={product.shortDescription} />

          {/* Price */}
          <div className="flex items-baseline gap-2">
            <Typography type="H2">{`${price} ${currency}`}</Typography>
          </div>

          {/* Stock */}
          <div className="flex items-center gap-2">
            {product.stock > 0 ? (
              <>
                <Check className="w-5 h-5 text-green-500" />
                <Typography type="small">
                  Skladem ({product.stock} ks)
                </Typography>
              </>
            ) : (
              <Typography type="muted">Není skladem</Typography>
            )}
          </div>

          {/* Color Variants */}
          {variants.length > 0 && (
            <div className="space-y-2">
              <Typography type="small">Barevné varianty:</Typography>
              <div className="flex gap-2">
                {/* Current product color */}
                <div
                  className="w-8 h-8 rounded-full border-2 border-primary ring-2 ring-primary ring-offset-2"
                  style={{ backgroundColor: product.color }}
                  title={translate(product.colorIntlId)}
                />
                {/* Variant colors */}
                {variants.map((variant) => (
                  <Link
                    key={variant!.id}
                    to={`${URL_ENDPOINTS.PRODUCTS}/${variant!.id}`}
                  >
                    <div
                      className="w-8 h-8 rounded-full border-2 border-border hover:border-primary cursor-pointer transition-all"
                      style={{ backgroundColor: variant!.color }}
                      title={translate(variant!.colorIntlId)}
                    />
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Add to Cart Button */}
          <Button
            size="lg"
            className="w-full sm:w-auto"
            onClick={handleAddToCart}
            disabled={product.stock === 0}
          >
            <ShoppingBag className="w-5 h-5 mr-2" />
            <Typography type="p">Přidat do košíku</Typography>
          </Button>

          {/* Specs */}
          <Card>
            <CardContent className="p-4 sm:p-6">
              <Typography type="H4">Specifikace</Typography>
              <div className="mt-4 space-y-3">
                {Object.entries(product.specs).map(([key, value]) => (
                  <div
                    key={key}
                    className="flex justify-between py-2 border-b border-border last:border-b-0"
                  >
                    <Typography type="muted">
                      {key.charAt(0).toUpperCase() + key.slice(1)}
                    </Typography>
                    <Typography type="p">{String(value)}</Typography>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Long Description */}
          <div className="pt-4">
            <Typography type="H4">Popis produktu</Typography>
            <div className="mt-2">
              <Typography type="p" intlId={product.longDescription} />
            </div>
          </div>
        </div>
      </div>
      <ProductCarouselGallery data={productStore.products} />
    </div>
  );
};

export default ProductDetailPage;
