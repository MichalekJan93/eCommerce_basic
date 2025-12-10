import { categories as allCategories } from "@/data/category";
import { products as allProducts } from "@/data/products";
import type { Category, Product, SubCategory } from "@/types/types";
import { getLocalizedPrice } from "@/utils/price";
import { makeAutoObservable } from "mobx";

export class ProductStore {
  products: Product[] = [];
  selectedCategory: Category | SubCategory | null = null;
  searchQuery: string = "";
  sortBy: "price-asc" | "price-desc" | "name" = "name";
  loading: boolean = false;

  constructor() {
    makeAutoObservable(this);
    this.products = allProducts;
  }

  /**
   * Recursively search for a category by ID in the category tree
   * @param categories - Category tree
   * @param categoryId - Category ID
   * @returns Category | SubCategory | null
   */
  private _findCategoryById = (
    categories: (Category | SubCategory)[],
    categoryId: string
  ): Category | SubCategory | null => {
    for (const category of categories) {
      if (category.id === categoryId) {
        return category;
      }
      if (category.subCategories && category.subCategories.length > 0) {
        const found = this._findCategoryById(
          category.subCategories,
          categoryId
        );
        if (found) {
          return found;
        }
      }
    }
    return null;
  };

  /**
   * Set selected category
   * @param categoryId  - ID of category
   */
  setCategory = (categoryId: string | null) => {
    if (!categoryId) {
      this.selectedCategory = null;
      return;
    }
    this.selectedCategory = this._findCategoryById(allCategories, categoryId);
  };

  /**
   * Set search query
   * @param query - Search query
   */
  setSearchQuery = (query: string) => {
    this.searchQuery = query;
  };

  /**
   * Set sort by
   * @param sortBy - Sort by
   */
  setSortBy = (sortBy: "price-asc" | "price-desc" | "name") => {
    this.sortBy = sortBy;
  };

  /**
   * Reset all filters
   */
  resetFilters = () => {
    this.selectedCategory = null;
    this.searchQuery = "";
    this.sortBy = "name";
  };

  /**
   * Get filtered and sorted products
   */
  get filteredProducts() {
    let filtered = this.products;

    // Filter categories
    if (this.selectedCategory) {
      filtered = filtered.filter((p) =>
        p.categoriesId.includes(this.selectedCategory!.id)
      );
    }

    // Filter search query
    if (this.searchQuery) {
      filtered = filtered.filter((p) =>
        p.name.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    }

    // Sorting - use slice() to avoid mutating the original array in a derivation
    return filtered.slice().sort((a, b) => {
      switch (this.sortBy) {
        case "price-asc":
          return getLocalizedPrice(a.price) - getLocalizedPrice(b.price);
        case "price-desc":
          return getLocalizedPrice(b.price) - getLocalizedPrice(a.price);
        case "name":
          return a.name.localeCompare(b.name);
        default:
          return 0;
      }
    });
  }

  /**
   * Get all categories
   */
  get categories() {
    return allCategories;
  }

  /**
   * Get product count
   */
  get productCount() {
    return this.filteredProducts.length;
  }

  /**
   * Get active filters
   */
  get hasActiveFilters() {
    return this.selectedCategory !== null || this.searchQuery !== "";
  }
}
