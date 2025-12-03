import { makeAutoObservable } from "mobx";

export interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  image: string;
  description: string;
  rating: number;
  inStock: boolean;
}

export class ProductStore {
  products: Product[] = [];
  selectedCategory: string | null = null;
  searchQuery: string = "";
  sortBy: "price-asc" | "price-desc" | "name" = "name";

  constructor() {
    makeAutoObservable(this);
  }

  setProducts(products: Product[]) {
    this.products = products;
  }

  setCategory(category: string | null) {
    this.selectedCategory = category;
  }

  setSearchQuery(query: string) {
    this.searchQuery = query;
  }

  setSortBy(sortBy: "price-asc" | "price-desc" | "name") {
    this.sortBy = sortBy;
  }

  get filteredProducts() {
    let filtered = this.products;

    // Filter by category
    if (this.selectedCategory) {
      filtered = filtered.filter((p) => p.category === this.selectedCategory);
    }

    // Filter by search
    if (this.searchQuery) {
      filtered = filtered.filter((p) =>
        p.name.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    }

    // Sort
    return filtered.sort((a, b) => {
      switch (this.sortBy) {
        case "price-asc":
          return a.price - b.price;
        case "price-desc":
          return b.price - a.price;
        case "name":
          return a.name.localeCompare(b.name);
        default:
          return 0;
      }
    });
  }

  get categories() {
    return [...new Set(this.products.map((p) => p.category))];
  }
}
