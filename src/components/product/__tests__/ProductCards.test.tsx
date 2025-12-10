import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import ProductCards from "../ProductCards";
import type { Product } from "@/types/types";

// Mock ProductCard component
vi.mock("../ProductCard", () => ({
  default: ({ product }: { product: Product }) => (
    <div data-testid={`product-card-${product.id}`}>{product.name}</div>
  ),
}));

describe("ProductCards", () => {
  const mockProducts: Product[] = [
    {
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
      shortDescription: "products:product.iphone_17_pro_white.short_description",
      longDescription: "products:product.iphone_17_pro_white.long_description",
      specs: {},
      variantsId: [],
      rating: 4.5,
      reviewsCount: 100,
      stock: 10,
    },
    {
      id: "product2",
      name: "iPhone 17 Pro Black",
      nameIntlId: "products:product.iphone_17_pro_black.name",
      color: "#000000",
      colorIntlId: "products:product.iphone_17_pro_black.color",
      brand: "Apple",
      categoriesId: ["cat1", "subcat1", "subsubcat1"],
      price: "products:product.iphone_17_pro_black.price",
      currency: "products:product.iphone_17_pro_black.currency",
      images: ["/products/iphone-17-pro/black/iphone-17-pro-front.webp"],
      shortDescription: "products:product.iphone_17_pro_black.short_description",
      longDescription: "products:product.iphone_17_pro_black.long_description",
      specs: {},
      variantsId: [],
      rating: 4.8,
      reviewsCount: 150,
      stock: 5,
    },
    {
      id: "product3",
      name: "Samsung Galaxy S25 Ultra",
      nameIntlId: "products:product.samsung_galaxy_s25_ultra.name",
      color: "#1A1A1A",
      colorIntlId: "products:product.samsung_galaxy_s25_ultra.color",
      brand: "Samsung",
      categoriesId: ["cat1", "subcat2"],
      price: "products:product.samsung_galaxy_s25_ultra.price",
      currency: "products:product.samsung_galaxy_s25_ultra.currency",
      images: ["/products/samsung-galaxy-s25-ultra/black/front.webp"],
      shortDescription:
        "products:product.samsung_galaxy_s25_ultra.short_description",
      longDescription:
        "products:product.samsung_galaxy_s25_ultra.long_description",
      specs: {},
      variantsId: [],
      rating: 4.7,
      reviewsCount: 200,
      stock: 8,
    },
  ];

  const renderWithRouter = (component: React.ReactElement) => {
    return render(<BrowserRouter>{component}</BrowserRouter>);
  };

  it("should render all products", () => {
    renderWithRouter(<ProductCards data={mockProducts} />);

    expect(screen.getByTestId("product-card-product1")).toBeInTheDocument();
    expect(screen.getByTestId("product-card-product2")).toBeInTheDocument();
    expect(screen.getByTestId("product-card-product3")).toBeInTheDocument();
  });

  it("should render product names", () => {
    renderWithRouter(<ProductCards data={mockProducts} />);

    expect(screen.getByText("iPhone 17 Pro White")).toBeInTheDocument();
    expect(screen.getByText("iPhone 17 Pro Black")).toBeInTheDocument();
    expect(screen.getByText("Samsung Galaxy S25 Ultra")).toBeInTheDocument();
  });

  it("should render empty grid when no products", () => {
    const { container } = renderWithRouter(<ProductCards data={[]} />);

    const grid = container.querySelector(".grid");
    expect(grid).toBeInTheDocument();
    expect(grid?.children).toHaveLength(0);
  });

  it("should have correct grid layout classes", () => {
    const { container } = renderWithRouter(<ProductCards data={mockProducts} />);

    const grid = container.querySelector(".grid");
    expect(grid).toHaveClass(
      "grid-cols-2",
      "md:grid-cols-3",
      "lg:grid-cols-4",
      "xl:grid-cols-5",
      "gap-4"
    );
  });

  it("should render correct number of products", () => {
    renderWithRouter(<ProductCards data={mockProducts} />);

    const productCards = screen.getAllByTestId(/product-card-/);
    expect(productCards).toHaveLength(3);
  });

  it("should render single product", () => {
    const singleProduct = [mockProducts[0]];
    renderWithRouter(<ProductCards data={singleProduct} />);

    expect(screen.getByTestId("product-card-product1")).toBeInTheDocument();
    expect(screen.queryByTestId("product-card-product2")).not.toBeInTheDocument();
  });

  it("should pass correct product data to ProductCard", () => {
    renderWithRouter(<ProductCards data={mockProducts} />);

    const firstCard = screen.getByTestId("product-card-product1");
    expect(firstCard).toHaveTextContent("iPhone 17 Pro White");
  });

  it("should maintain product order", () => {
    const { container } = renderWithRouter(<ProductCards data={mockProducts} />);

    const cards = container.querySelectorAll("[data-testid^='product-card-']");
    expect(cards[0]).toHaveAttribute("data-testid", "product-card-product1");
    expect(cards[1]).toHaveAttribute("data-testid", "product-card-product2");
    expect(cards[2]).toHaveAttribute("data-testid", "product-card-product3");
  });
});

