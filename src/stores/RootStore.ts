import { CartStore } from "./CartStore";
import { ProductStore } from "./ProductStore";

export class RootStore {
  cartStore: CartStore;
  productStore: ProductStore;

  constructor() {
    this.cartStore = new CartStore();
    this.productStore = new ProductStore();
  }
}

export const rootStore = new RootStore();
