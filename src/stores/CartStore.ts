import { makeAutoObservable } from "mobx";
import i18n from "@/lib/i18n";
import { products } from "@/data/products";
import { getLocalizedPrice } from "@/utils/price";

export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

export class CartStore {
  items: CartItem[] = [];

  constructor() {
    makeAutoObservable(this);
    this.loadFromLocalStorage();
    this.recalculatePrices();
    i18n.on("languageChanged", this.handleLanguageChanged);
  }

  /**
   * Add item into cart
   * @param product Product
   */
  addItem(product: Omit<CartItem, "quantity">) {
    const existingItem = this.items.find((item) => item.id === product.id);

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      this.items.push({ ...product, quantity: 1 });
    }

    this.saveToLocalStorage();
  }

  /**
   * Remove item from cart
   * @param id product id
   */
  removeItem(id: string) {
    this.items = this.items.filter((item) => item.id !== id);
    this.saveToLocalStorage();
  }

  /**
   * Update product quantity into cart
   * @param id product iod
   * @param quantity new quantity
   */
  updateQuantity(id: string, quantity: number) {
    const item = this.items.find((item) => item.id === id);

    if (quantity < 1) {
      this.removeItem(id);
      return;
    }

    if (item) {
      item.quantity = quantity;
      this.saveToLocalStorage();
    }
  }

  /**
   * Clear cart
   */
  clearCart() {
    this.items = [];
    this.saveToLocalStorage();
  }

  /**
   * Get total items count
   */
  get totalItems() {
    return this.items.reduce((sum, item) => sum + item.quantity, 0);
  }

  /**
   * Get total price
   */
  get totalPrice() {
    return this.items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
  }

  /**
   * Private method for handling language change
   */
  private handleLanguageChanged = () => {
    this.recalculatePrices();
  };

  /**
   * Price recalculation by selected language
   */
  private recalculatePrices() {
    this.items.forEach((item) => {
      const product = products.find((p) => p.id === item.id);
      if (product) {
        item.price = getLocalizedPrice(product.price);
      }
    });
    this.saveToLocalStorage();
  }

  /**
   * Save cart to local storage
   */
  private saveToLocalStorage() {
    localStorage.setItem("cart", JSON.stringify(this.items));
  }

  /**
   * Load cart from local storage
   */
  private loadFromLocalStorage() {
    const saved = localStorage.getItem("cart");
    if (saved) {
      this.items = JSON.parse(saved);
    }
  }
}
