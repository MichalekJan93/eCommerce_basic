import { makeAutoObservable } from "mobx";

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
  }

  addItem(product: Omit<CartItem, "quantity">) {
    const existingItem = this.items.find((item) => item.id === product.id);

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      this.items.push({ ...product, quantity: 1 });
    }

    this.saveToLocalStorage();
  }

  removeItem(id: string) {
    this.items = this.items.filter((item) => item.id !== id);
    this.saveToLocalStorage();
  }

  updateQuantity(id: string, quantity: number) {
    const item = this.items.find((item) => item.id === id);
    if (item) {
      item.quantity = quantity;
      this.saveToLocalStorage();
    }
  }

  clearCart() {
    this.items = [];
    this.saveToLocalStorage();
  }

  get totalItems() {
    return this.items.reduce((sum, item) => sum + item.quantity, 0);
  }

  get totalPrice() {
    return this.items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
  }

  private saveToLocalStorage() {
    localStorage.setItem("cart", JSON.stringify(this.items));
  }

  private loadFromLocalStorage() {
    const saved = localStorage.getItem("cart");
    if (saved) {
      this.items = JSON.parse(saved);
    }
  }
}
