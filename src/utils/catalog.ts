import type { Category, SubCategory, Product } from "@/types/types";
import { categories as allCategories } from "@/data/category";
import { slugify } from "./slug";

export type CategoryNode = Category | SubCategory;

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

const buildCategorySlugSegmentsFromPath = (path: CategoryNode[]): string[] => {
  if (path.length === 0) return [];

  if (path.length === 1) {
    return [slugify(path[0].name)];
  }

  const first = slugify(path[0].name);
  const last = slugify(path[path.length - 1].name);

  if (first === last) {
    return [first];
  }

  return [first, last];
};

export const getCategoryPathById = (
  categoryId: string
): CategoryNode[] | null => {
  return findCategoryPathInternal(allCategories, categoryId);
};

export const getCategoryPathSegmentsForCategoryId = (
  categoryId: string
): string[] | null => {
  const path = getCategoryPathById(categoryId);
  if (!path) return null;
  return buildCategorySlugSegmentsFromPath(path);
};

const findCategoryIdBySlugPathInternal = (
  categories: CategoryNode[],
  slugs: string[],
  path: CategoryNode[] = []
): string | null => {
  for (const category of categories) {
    const newPath = [...path, category];
    const segments = buildCategorySlugSegmentsFromPath(newPath);

    if (
      segments.length === slugs.length &&
      segments.every((segment, index) => segment === slugs[index])
    ) {
      return category.id;
    }

    if (category.subCategories && category.subCategories.length > 0) {
      const found = findCategoryIdBySlugPathInternal(
        category.subCategories,
        slugs,
        newPath
      );
      if (found) {
        return found;
      }
    }
  }

  return null;
};

export const getCategoryIdBySlugSegments = (slugs: string[]): string | null => {
  if (!slugs.length) return null;
  return findCategoryIdBySlugPathInternal(allCategories, slugs);
};

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

export const getProductSlug = (product: Product): string => {
  return slugify(product.name);
};

/**
 * Vrací přesně tři segmenty: categorySlug, subCategorySlug, productSlug,
 * aby odpovídaly route /products/:categorySlug/:subCategorySlug/:productSlug
 */
export const getProductPathSegments = (product: Product): string[] => {
  const categoryPath = getProductCategoryPath(product);
  const productSlug = getProductSlug(product);

  if (categoryPath.length === 0) {
    return ["category", "item", productSlug];
  }

  if (categoryPath.length === 1) {
    const s = slugify(categoryPath[0].name);
    return [s, s, productSlug];
  }

  const first = slugify(categoryPath[0].name);
  const second = slugify(categoryPath[1].name);

  return [first, second, productSlug];
};
