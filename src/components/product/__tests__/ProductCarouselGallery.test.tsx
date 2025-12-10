import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import ProductCarouselGallery from "../ProductCarouselGallery";
import type { Product } from "@/types/types";

// Mock ProductCard component
vi.mock("../ProductCard", () => ({
  default: ({ product }: { product: Product }) => (
    <div data-testid={`product-card-${product.id}`}>{product.name}</div>
  ),
}));

// Mock Carousel components
vi.mock("@/components/ui/carousel", () => ({
  Carousel: ({ children, className }: { children: React.ReactNode; className?: string }) => (
    <div data-testid="carousel" className={className}>
      {children}
    </div>
  ),
  CarouselContent: ({ children, className }: { children: React.ReactNode; className?: string }) => (
    <div data-testid="carousel-content" className={className}>
      {children}
    </div>
  ),
  CarouselItem: ({ children, className }: { children: React.ReactNode; className?: string }) => (
    <div data-testid="carousel-item" className={className}>
      {children}
    </div>
  ),
  CarouselPrevious: ({ className }: { className?: string }) => (
    <button data-testid="carousel-previous" className={className}>
      Previous
    </button>
  ),
  CarouselNext: ({ className }: { className?: string }) => (
    <button data-testid="carousel-next" className={className}>
      Next
    </button>
  ),
}));

describe("ProductCarouselGallery", () => {
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
  ];

  const renderWithRouter = (component: React.ReactElement) => {
    return render(<BrowserRouter>{component}</BrowserRouter>);
  };

  it("should render carousel", () => {
    renderWithRouter(<ProductCarouselGallery data={mockProducts} />);

    expect(screen.getByTestId("carousel")).toBeInTheDocument();
  });

  it("should render carousel content", () => {
    renderWithRouter(<ProductCarouselGallery data={mockProducts} />);

    expect(screen.getByTestId("carousel-content")).toBeInTheDocument();
  });

  it("should render all products in carousel items", () => {
    renderWithRouter(<ProductCarouselGallery data={mockProducts} />);

    expect(screen.getByTestId("product-card-product1")).toBeInTheDocument();
    expect(screen.getByTestId("product-card-product2")).toBeInTheDocument();
  });

  it("should render carousel navigation buttons", () => {
    renderWithRouter(<ProductCarouselGallery data={mockProducts} />);

    expect(screen.getByTestId("carousel-previous")).toBeInTheDocument();
    expect(screen.getByTestId("carousel-next")).toBeInTheDocument();
  });

  it("should render previous button with correct class", () => {
    renderWithRouter(<ProductCarouselGallery data={mockProducts} />);

    const prevButton = screen.getByTestId("carousel-previous");
    expect(prevButton).toHaveClass("-left-6", "sm:-left-10");
  });

  it("should render next button with correct class", () => {
    renderWithRouter(<ProductCarouselGallery data={mockProducts} />);

    const nextButton = screen.getByTestId("carousel-next");
    expect(nextButton).toHaveClass("-right-6", "sm:-right-10");
  });

  it("should render carousel items with correct classes", () => {
    renderWithRouter(<ProductCarouselGallery data={mockProducts} />);

    const carouselItems = screen.getAllByTestId("carousel-item");
    carouselItems.forEach((item) => {
      expect(item).toHaveClass(
        "pl-2",
        "md:pl-4",
        "basis-1/2",
        "md:basis-1/3",
        "lg:basis-1/4",
        "xl:basis-1/5"
      );
    });
  });

  it("should render correct number of carousel items", () => {
    renderWithRouter(<ProductCarouselGallery data={mockProducts} />);

    const carouselItems = screen.getAllByTestId("carousel-item");
    expect(carouselItems).toHaveLength(2);
  });

  it("should render with empty products array", () => {
    renderWithRouter(<ProductCarouselGallery data={[]} />);

    expect(screen.getByTestId("carousel")).toBeInTheDocument();
    expect(screen.queryByTestId("carousel-item")).not.toBeInTheDocument();
  });

  it("should have correct wrapper classes", () => {
    const { container } = renderWithRouter(
      <ProductCarouselGallery data={mockProducts} />
    );

    const wrapper = container.querySelector(".w-full.px-8");
    expect(wrapper).toBeInTheDocument();
    expect(wrapper).toHaveClass("flex", "justify-center");
  });
});

