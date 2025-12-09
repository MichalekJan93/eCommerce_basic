import {
  ArrowBigRight,
  Minus,
  Plus,
  ShoppingBasket,
  Trash2,
} from "lucide-react";
import Button from "../ui/button";
import { Badge } from "../ui/badge";
import { observer } from "mobx-react-lite";
import { useCartStore } from "@/hooks/useStore";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import { useTranslate } from "@/utils/translate";
import Typography from "../basic/typography/Typography";
import { formatPrice } from "@/utils/price";
import { useNavigate } from "react-router-dom";
import { URL_ENDPOINTS } from "@/app/Router";
import { useState } from "react";

const Cart = observer(() => {
  const store = useCartStore();
  const translate = useTranslate();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const handleCheckout = () => {
    setOpen(false);
    navigate(URL_ENDPOINTS.INFO);
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="relative">
          <ShoppingBasket />
          {store.items.length > 0 && (
            <Badge
              className="h-5 min-w-5 rounded-full px-1 font-mono tabular-nums absolute -top-1 -right-3 text-primary-foreground"
              variant="destructive"
            >
              {store.totalItems}
            </Badge>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent className="overflow-y-auto">
        <SheetHeader>
          <SheetTitle>{translate("common:cart")}</SheetTitle>
        </SheetHeader>
        <div className="flex flex-col justify-between h-[calc(100vh-5rem)]">
          <div className="mt-4 space-y-3">
            {store.items.length > 0 ? (
              store.items.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center gap-3 py-3 border-b border-border last:border-b-0"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="h-auto w-12  shrink-0"
                  />
                  <div className="flex flex-1 flex-col gap-1">
                    <Typography
                      type="p"
                      className="mt-0 font-medium leading-snug"
                    >
                      {item.name}
                    </Typography>
                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-2 rounded-md  px-2 py-1">
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-7 w-7"
                          onClick={() =>
                            store.updateQuantity(item.id, item.quantity + 1)
                          }
                        >
                          <Plus className="h-3 w-3" />
                        </Button>
                        <Typography type="muted" className="mt-0 text-sm">
                          {item.quantity}
                        </Typography>
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-7 w-7"
                          onClick={() =>
                            store.updateQuantity(item.id, item.quantity - 1)
                          }
                        >
                          <Minus className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    size="icon"
                    className="ml-2 text-destructive border-destructive hover:bg-destructive/10 hover:text-destructive"
                    onClick={() => store.removeItem(item.id)}
                  >
                    <Trash2 />
                  </Button>
                </div>
              ))
            ) : (
              <Typography type="muted" intlId="no_items" />
            )}
          </div>
          <div className="border-t border-border py-3 text-right">
            <Typography type="H4">
              {translate("common:total")}: {formatPrice(store.totalPrice)}
            </Typography>
            <Button
              size="sm"
              className="bg-primary text-primary-foreground hover:bg-primary/80 w-full mt-4"
              onClick={handleCheckout}
            >
              <ArrowBigRight className="w-4 h-4" />
              <div>
                <Typography
                  type="p"
                  className="ml-1"
                  intlId="common:add_to_cart"
                />
              </div>
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
});

export default Cart;
