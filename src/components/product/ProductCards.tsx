import { observer } from "mobx-react-lite";
import ProductCard from "./ProductCard";
import type { Product } from "@/types/types";

interface IProductCarousel {
  data: Product[];
}

const ProductCards = observer((props: IProductCarousel) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
      {props.data.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
});

export default ProductCards;
