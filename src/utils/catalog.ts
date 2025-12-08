import type { Category, SubCategory, Product } from "@/types/types";
import { categories as allCategories } from "@/data/category";
import { slugify } from "./slug";

export type CategoryNode = Category | SubCategory;

/**
 * Find category by ID
 * @param categories Category tree
 * @param categoryId Category ID
 * @returns CategoryNode | null
 */
const findCategoryByIdInternal = (
  categories: CategoryNode[],
  categoryId: string
): CategoryNode | null => {
  for (const category of categories) {
    if (category.id === categoryId) {
      return category;
    }
    if (category.subCategories && category.subCategories.length > 0) {
      const found = findCategoryByIdInternal(
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
 * Find category path by ID
 * @param categories Category tree
 * @param categoryId Category ID
 * @returns CategoryNode[] | null
 */
const findCategoryPathInternal = (
  categories: CategoryNode[],
  categoryId: string,
  path: CategoryNode[] = []
): CategoryNode[] | null => {
  for (const category of categories) {
    const newPath = [...path, category];
    if (category.id === categoryId) {
      return newPath;
    }
    if (category.subCategories && category.subCategories.length > 0) {
      const found = findCategoryPathInternal(
        category.subCategories,
        categoryId,
        newPath
      );
      if (found) {
        return found;
      }
    }
  }
  return null;
};

/**
 * Get category path by ID
 * @param categoryId Category ID
 * @returns CategoryNode[] | null
 */
export const getCategoryPathById = (
  categoryId: string
): CategoryNode[] | null => {
  return findCategoryPathInternal(allCategories, categoryId);
};

/**
 * Get full category path segments by ID
 * @param categoryId Category ID
 * @returns string[] | null
 */
export const getCategoryFullPathSegments = (
  categoryId: string
): string[] | null => {
  const path = getCategoryPathById(categoryId);
  if (!path) return null;
  return path.map((cat) => slugify(cat.name));
};

/**
 * Find category by matching full slug path (all segments must match in order)
 * @param categories Category tree
 * @param slugs Slug segments
 * @param currentIndex Current index
 * @returns CategoryNode | null
 */
const findCategoryByFullSlugPath = (
  categories: CategoryNode[],
  slugs: string[],
  currentIndex: number = 0
): CategoryNode | null => {
  if (currentIndex >= slugs.length) return null;

  for (const category of categories) {
    const categorySlug = slugify(category.name);

    if (categorySlug === slugs[currentIndex]) {
      // If this is the last slug, we found the category
      if (currentIndex === slugs.length - 1) {
        return category;
      }

      // Otherwise, continue searching in subcategories
      if (category.subCategories && category.subCategories.length > 0) {
        const found = findCategoryByFullSlugPath(
          category.subCategories,
          slugs,
          currentIndex + 1
        );
        if (found) return found;
      }
    }
  }

  return null;
};

/**
 * Get category by matching full slug path (all segments must match in order)
 * @param slugs Slug segments
 * @returns CategoryNode | null
 */
export const getCategoryByFullPath = (slugs: string[]): CategoryNode | null => {
  if (!slugs.length) return null;
  return findCategoryByFullSlugPath(allCategories, slugs);
};

/**
 * Get category ID by matching full slug path (all segments must match in order)
 * @param slugs Slug segments
 * @returns string | null
 */
export const getCategoryIdByFullPath = (slugs: string[]): string | null => {
  const category = getCategoryByFullPath(slugs);
  return category?.id ?? null;
};

/**
 * Get product category path
 * @param product Product
 * @returns CategoryNode[]
 */
export const getProductCategoryPath = (product: Product): CategoryNode[] => {
  if (!product.categoriesId || product.categoriesId.length === 0) {
    return [];
  }

  const path: CategoryNode[] = [];
  for (const id of product.categoriesId) {
    const category = findCategoryByIdInternal(allCategories, id);
    if (category) {
      path.push(category);
    }
  }

  return path;
};

/**
 * Get product slug
 * @param product Product
 * @returns string
 */
export const getProductSlug = (product: Product): string => {
  return slugify(product.name);
};

/**
 * Get product path segments
 * @param product Product
 * @returns string[]
 */
export const getProductPathSegments = (product: Product): string[] => {
  const categoryPath = getProductCategoryPath(product);
  const productSlug = getProductSlug(product);

  const categorySegments = categoryPath.map((cat) => slugify(cat.name));

  return [...categorySegments, productSlug];
};

/**
 * Find product by slug
 * @param products Products
 * @param slug Slug
 * @returns Product | undefined
 */
export const findProductBySlug = (
  products: Product[],
  slug: string
): Product | undefined => {
  return products.find((p) => getProductSlug(p) === slug);
};

/**
 * Parse wildcard path and determine if it's a product or category path
 * @param pathSegments Path segments
 * @param products Products
 * @returns { type: 'product' | 'category', slugs: string[], productSlug?: string }
 */
export const parseProductsPath = (
  pathSegments: string[],
  products: Product[]
): {
  type: "product" | "category";
  categorySegments: string[];
  productSlug?: string;
} => {
  if (pathSegments.length === 0) {
    return { type: "category", categorySegments: [] };
  }

  const lastSegment = pathSegments[pathSegments.length - 1];
  const product = findProductBySlug(products, lastSegment);

  if (product) {
    return {
      type: "product",
      categorySegments: pathSegments.slice(0, -1),
      productSlug: lastSegment,
    };
  }

  return { type: "category", categorySegments: pathSegments };
};

/**
 * Get path segments from wildcard path
 * @param wildcardPath Wildcard path
 * @returns Path segments
 */
export const getPathSegments = (wildcardPath: string | undefined) => {
  if (!wildcardPath) return [];
  return wildcardPath.split("/").filter(Boolean);
};
