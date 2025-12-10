import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import ProductCategoryCard from "../ProductCategoryCard";
import type { Category } from "@/types/types";

// Mock the catalog utils
vi.mock("@/utils/catalog", () => ({
  getCategoryFullPathSegments: vi.fn((id: string) => {
    if (id === "cat1") return ["phones"];
    if (id === "subcat1") return ["phones", "iphone"];
    return null;
  }),
}));

// Mock Typography component
vi.mock("@/components/basic/typography/Typography", () => ({
  default: ({ intlId, type }: { intlId: string; type: string }) => (
    <span data-testid={`typography-${type}`}>{intlId}</span>
  ),
}));

// Mock Router constants
vi.mock("@/app/Router", () => ({
  URL_ENDPOINTS: {
    PRODUCTS: "/products",
  },
}));

describe("ProductCategoryCard", () => {
  const mockCategory: Category = {
    id: "cat1",
    name: "phones",
    titleIntlId: "products:category.phones",
    image: "/category/iphone.webp",
    descriptionIntlId: "products:category_description.phones",
    subCategories: [],
  };

  const renderWithRouter = (component: React.ReactElement) => {
    return render(<BrowserRouter>{component}</BrowserRouter>);
  };

  it("should render category card", () => {
    renderWithRouter(<ProductCategoryCard category={mockCategory} />);

    expect(screen.getByText("products:category.phones")).toBeInTheDocument();
  });

  it("should render category image", () => {
    renderWithRouter(<ProductCategoryCard category={mockCategory} />);

    const image = screen.getByAltText("phones");
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute("src", "/category/iphone.webp");
  });

  it("should render link with correct URL", () => {
    renderWithRouter(<ProductCategoryCard category={mockCategory} />);

    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("href", "/products/phones");
  });

  it("should render subcategory with correct URL", () => {
    const subCategory: Category = {
      id: "subcat1",
      name: "iphone",
      titleIntlId: "products:sub_category.iphone",
      image: "/category/iphone.webp",
      descriptionIntlId: "products:sub_category_description.iphone",
      subCategories: [],
    };

    renderWithRouter(<ProductCategoryCard category={subCategory} />);

    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("href", "/products/phones/iphone");
  });

  it("should render Typography component with correct props", () => {
    renderWithRouter(<ProductCategoryCard category={mockCategory} />);

    const typography = screen.getByTestId("typography-small");
    expect(typography).toBeInTheDocument();
    expect(typography).toHaveTextContent("products:category.phones");
  });

  it("should have correct CSS classes for card", () => {
    const { container } = renderWithRouter(
      <ProductCategoryCard category={mockCategory} />
    );

    const card = container.querySelector(".shrink-0");
    expect(card).toBeInTheDocument();
    expect(card).toHaveClass("hover:border-primary");
  });

  it("should render image with correct size classes", () => {
    renderWithRouter(<ProductCategoryCard category={mockCategory} />);

    const image = screen.getByAltText("phones");
    expect(image).toHaveClass("w-5", "h-5", "sm:w-6", "sm:h-6");
  });

  it("should handle category without segments", () => {
    const categoryWithoutSegments: Category = {
      id: "invalid",
      name: "invalid",
      titleIntlId: "products:category.invalid",
      image: "/category/invalid.webp",
      descriptionIntlId: "products:category_description.invalid",
      subCategories: [],
    };

    renderWithRouter(
      <ProductCategoryCard category={categoryWithoutSegments} />
    );

    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("href", "/products");
  });

  it("should render with flex layout", () => {
    const { container } = renderWithRouter(
      <ProductCategoryCard category={mockCategory} />
    );

    const flexContainer = container.querySelector(".flex.items-center");
    expect(flexContainer).toBeInTheDocument();
  });
});

