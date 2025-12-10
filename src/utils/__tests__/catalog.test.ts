import { describe, it, expect, vi } from "vitest";
import {
  getCategoryPathById,
  getCategoryFullPathSegments,
  getCategoryByFullPath,
  getCategoryIdByFullPath,
  getProductCategoryPath,
  getProductSlug,
  getProductPathSegments,
  findProductBySlug,
  parseProductsPath,
  getPathSegments,
} from "../catalog";
import type { Product } from "@/types/types";

// Mock the categories data
vi.mock("@/data/category", () => ({
  categories: [
    {
      id: "cat1",
      name: "phones",
      titleIntlId: "products:category.phones",
      image: "/category/iphone.webp",
      descriptionIntlId: "products:category_description.phones",
      subCategories: [
        {
          id: "subcat1",
          name: "iphone",
          titleIntlId: "products:sub_category.iphone",
          image: "/category/iphone.webp",
          descriptionIntlId: "products:sub_category_description.iphone",
          subCategories: [
            {
              id: "subsubcat1",
              name: "iphone_17",
              titleIntlId: "products:sub_category.iphone_17",
              image: "/products/iphone-17-pro/orange/iphone-17-pro-front.webp",
              descriptionIntlId: "products:sub_category_description.iphone_17",
            },
          ],
        },
      ],
    },
    {
      id: "cat2",
      name: "computers",
      titleIntlId: "products:category.computers",
      image: "/category/apple.webp",
      descriptionIntlId: "products:category_description.computers",
      subCategories: [],
    },
  ],
}));

describe("catalog utils", () => {
  describe("getCategoryPathById", () => {
    it("should return path for top-level category", () => {
      const path = getCategoryPathById("cat1");
      expect(path).toBeDefined();
      expect(path).toHaveLength(1);
      expect(path?.[0].id).toBe("cat1");
    });

    it("should return path for nested category", () => {
      const path = getCategoryPathById("subcat1");
      expect(path).toBeDefined();
      expect(path).toHaveLength(2);
      expect(path?.[0].id).toBe("cat1");
      expect(path?.[1].id).toBe("subcat1");
    });

    it("should return path for deeply nested category", () => {
      const path = getCategoryPathById("subsubcat1");
      expect(path).toBeDefined();
      expect(path).toHaveLength(3);
      expect(path?.[0].id).toBe("cat1");
      expect(path?.[1].id).toBe("subcat1");
      expect(path?.[2].id).toBe("subsubcat1");
    });

    it("should return null for non-existent category", () => {
      const path = getCategoryPathById("nonexistent");
      expect(path).toBeNull();
    });
  });

  describe("getCategoryFullPathSegments", () => {
    it("should return slug segments for category path", () => {
      const segments = getCategoryFullPathSegments("subsubcat1");
      expect(segments).toEqual(["phones", "iphone", "iphone-17"]);
    });

    it("should return null for non-existent category", () => {
      const segments = getCategoryFullPathSegments("nonexistent");
      expect(segments).toBeNull();
    });

    it("should handle top-level category", () => {
      const segments = getCategoryFullPathSegments("cat1");
      expect(segments).toEqual(["phones"]);
    });
  });

  describe("getCategoryByFullPath", () => {
    it("should find category by full slug path", () => {
      const category = getCategoryByFullPath(["phones", "iphone", "iphone-17"]);
      expect(category).toBeDefined();
      expect(category?.id).toBe("subsubcat1");
    });

    it("should find top-level category", () => {
      const category = getCategoryByFullPath(["phones"]);
      expect(category).toBeDefined();
      expect(category?.id).toBe("cat1");
    });

    it("should return null for invalid path", () => {
      const category = getCategoryByFullPath(["invalid", "path"]);
      expect(category).toBeNull();
    });

    it("should return null for empty path", () => {
      const category = getCategoryByFullPath([]);
      expect(category).toBeNull();
    });
  });

  describe("getCategoryIdByFullPath", () => {
    it("should return category ID by full path", () => {
      const id = getCategoryIdByFullPath(["phones", "iphone"]);
      expect(id).toBe("subcat1");
    });

    it("should return null for invalid path", () => {
      const id = getCategoryIdByFullPath(["invalid"]);
      expect(id).toBeNull();
    });
  });

  describe("getProductCategoryPath", () => {
    const mockProduct: Product = {
      id: "product1",
      name: "iPhone 17 Pro White",
      nameIntlId: "products:product.iphone_17_pro_white.name",
      color: "#F2F2F2",
      colorIntlId: "products:product.iphone_17_pro_white.color",
      brand: "Apple",
      categoriesId: ["cat1", "subcat1", "subsubcat1"],
      price: "products:product.iphone_17_pro_white.price",
      currency: "products:product.iphone_17_pro_white.currency",
      images: ["/products/iphone-17-pro/white/iphone-17-pro-front.webp"],
      shortDescription:
        "products:product.iphone_17_pro_white.short_description",
      longDescription: "products:product.iphone_17_pro_white.long_description",
      specs: {},
      variantsId: [],
      rating: 4.5,
      reviewsCount: 100,
      stock: 10,
    };

    it("should return category path for product", () => {
      const path = getProductCategoryPath(mockProduct);
      expect(path).toHaveLength(3);
      expect(path[0].id).toBe("cat1");
      expect(path[1].id).toBe("subcat1");
      expect(path[2].id).toBe("subsubcat1");
    });

    it("should return empty array for product without categories", () => {
      const productWithoutCategories = { ...mockProduct, categoriesId: [] };
      const path = getProductCategoryPath(productWithoutCategories);
      expect(path).toEqual([]);
    });
  });

  describe("getProductSlug", () => {
    it("should return slugified product name", () => {
      const product: Product = {
        id: "product1",
        name: "iPhone 17 Pro White",
        nameIntlId: "products:product.iphone_17_pro_white.name",
        color: "#F2F2F2",
        colorIntlId: "products:product.iphone_17_pro_white.color",
        brand: "Apple",
        categoriesId: ["cat1"],
        price: "products:product.iphone_17_pro_white.price",
        currency: "products:product.iphone_17_pro_white.currency",
        images: [],
        shortDescription: "",
        longDescription: "",
        specs: {},
        variantsId: [],
        rating: 4.5,
        reviewsCount: 100,
        stock: 10,
      };

      expect(getProductSlug(product)).toBe("iphone-17-pro-white");
    });
  });

  describe("getProductPathSegments", () => {
    it("should return full path segments including product slug", () => {
      const product: Product = {
        id: "product1",
        name: "iPhone 17 Pro White",
        nameIntlId: "products:product.iphone_17_pro_white.name",
        color: "#F2F2F2",
        colorIntlId: "products:product.iphone_17_pro_white.color",
        brand: "Apple",
        categoriesId: ["cat1", "subcat1", "subsubcat1"],
        price: "products:product.iphone_17_pro_white.price",
        currency: "products:product.iphone_17_pro_white.currency",
        images: [],
        shortDescription: "",
        longDescription: "",
        specs: {},
        variantsId: [],
        rating: 4.5,
        reviewsCount: 100,
        stock: 10,
      };

      const segments = getProductPathSegments(product);
      expect(segments).toEqual([
        "phones",
        "iphone",
        "iphone-17",
        "iphone-17-pro-white",
      ]);
    });
  });

  describe("findProductBySlug", () => {
    const products: Product[] = [
      {
        id: "product1",
        name: "iPhone 17 Pro White",
        nameIntlId: "products:product.iphone_17_pro_white.name",
        color: "#F2F2F2",
        colorIntlId: "products:product.iphone_17_pro_white.color",
        brand: "Apple",
        categoriesId: ["cat1"],
        price: "products:product.iphone_17_pro_white.price",
        currency: "products:product.iphone_17_pro_white.currency",
        images: [],
        shortDescription: "",
        longDescription: "",
        specs: {},
        variantsId: [],
        rating: 4.5,
        reviewsCount: 100,
        stock: 10,
      },
    ];

    it("should find product by slug", () => {
      const product = findProductBySlug(products, "iphone-17-pro-white");
      expect(product).toBeDefined();
      expect(product?.id).toBe("product1");
    });

    it("should return undefined for non-existent slug", () => {
      const product = findProductBySlug(products, "nonexistent");
      expect(product).toBeUndefined();
    });
  });

  describe("parseProductsPath", () => {
    const products: Product[] = [
      {
        id: "product1",
        name: "iPhone 17 Pro White",
        nameIntlId: "products:product.iphone_17_pro_white.name",
        color: "#F2F2F2",
        colorIntlId: "products:product.iphone_17_pro_white.color",
        brand: "Apple",
        categoriesId: ["cat1"],
        price: "products:product.iphone_17_pro_white.price",
        currency: "products:product.iphone_17_pro_white.currency",
        images: [],
        shortDescription: "",
        longDescription: "",
        specs: {},
        variantsId: [],
        rating: 4.5,
        reviewsCount: 100,
        stock: 10,
      },
    ];

    it("should parse product path", () => {
      const result = parseProductsPath(
        ["phones", "iphone", "iphone-17-pro-white"],
        products
      );
      expect(result.type).toBe("product");
      expect(result.productSlug).toBe("iphone-17-pro-white");
      expect(result.categorySegments).toEqual(["phones", "iphone"]);
    });

    it("should parse category path", () => {
      const result = parseProductsPath(["phones", "iphone"], products);
      expect(result.type).toBe("category");
      expect(result.categorySegments).toEqual(["phones", "iphone"]);
      expect(result.productSlug).toBeUndefined();
    });

    it("should handle empty path", () => {
      const result = parseProductsPath([], products);
      expect(result.type).toBe("category");
      expect(result.categorySegments).toEqual([]);
    });
  });

  describe("getPathSegments", () => {
    it("should split path by slashes", () => {
      expect(getPathSegments("phones/iphone/iphone-17")).toEqual([
        "phones",
        "iphone",
        "iphone-17",
      ]);
    });

    it("should filter out empty segments", () => {
      expect(getPathSegments("phones//iphone")).toEqual(["phones", "iphone"]);
    });

    it("should handle undefined", () => {
      expect(getPathSegments(undefined)).toEqual([]);
    });

    it("should handle empty string", () => {
      expect(getPathSegments("")).toEqual([]);
    });
  });
});
