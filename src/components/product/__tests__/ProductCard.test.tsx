import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { BrowserRouter } from "react-router-dom";
import ProductCard from "../ProductCard";
import type { Product } from "@/types/types";

// Mock dependencies
vi.mock("@/utils/catalog", () => ({
  getProductPathSegments: vi.fn(() => [
    "phones",
    "iphone",
    "iphone-17",
    "iphone-17-pro-white",
  ]),
}));

vi.mock("@/utils/price", () => ({
  getFormattedPrice: vi.fn(() => "€1,299.00"),
  getLocalizedPrice: vi.fn(() => 1299),
}));

vi.mock("@/utils/translate", () => ({
  useTranslate: vi.fn(() => (key: string) => key),
}));

vi.mock("@/app/Router", () => ({
  URL_ENDPOINTS: {
    PRODUCTS: "/products",
  },
}));

// Mock Typography component
vi.mock("@/components/basic/typography/Typography", () => ({
  default: ({
    intlId,
    type,
    children,
    className,
  }: {
    intlId?: string;
    type: string;
    children?: React.ReactNode;
    className?: string;
  }) => (
    <span data-testid={`typography-${type}`} className={className}>
      {intlId || children}
    </span>
  ),
}));

// Mock Button component
vi.mock("@/components/ui/button", () => ({
  default: ({
    children,
    onClick,
    variant,
    size,
    className,
  }: {
    children: React.ReactNode;
    onClick?: () => void;
    variant?: string;
    size?: string;
    className?: string;
  }) => (
    <button
      data-testid="add-to-cart-button"
      onClick={onClick}
      data-variant={variant}
      data-size={size}
      className={className}
    >
      {children}
    </button>
  ),
}));

// Mock Card components
vi.mock("@/components/ui/card", () => ({
  Card: ({
    children,
    className,
  }: {
    children: React.ReactNode;
    className?: string;
  }) => (
    <div data-testid="card" className={className}>
      {children}
    </div>
  ),
  CardHeader: ({
    children,
    className,
  }: {
    children: React.ReactNode;
    className?: string;
  }) => (
    <div data-testid="card-header" className={className}>
      {children}
    </div>
  ),
  CardContent: ({
    children,
    className,
  }: {
    children: React.ReactNode;
    className?: string;
  }) => (
    <div data-testid="card-content" className={className}>
      {children}
    </div>
  ),
  CardTitle: ({
    children,
    className,
  }: {
    children: React.ReactNode;
    className?: string;
  }) => (
    <div data-testid="card-title" className={className}>
      {children}
    </div>
  ),
  CardDescription: ({
    children,
    className,
  }: {
    children: React.ReactNode;
    className?: string;
  }) => (
    <div data-testid="card-description" className={className}>
      {children}
    </div>
  ),
}));

// Mock store
const mockAddItem = vi.fn();
vi.mock("@/hooks/useStore", () => ({
  useCartStore: () => ({
    addItem: mockAddItem,
  }),
}));

describe("ProductCard", () => {
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
    images: [
      "/products/iphone-17-pro/white/iphone-17-pro-front.webp",
      "/products/iphone-17-pro/white/iphone-17-pro-solo.webp",
    ],
    shortDescription: "products:product.iphone_17_pro_white.short_description",
    longDescription: "products:product.iphone_17_pro_white.long_description",
    specs: {},
    variantsId: [],
    rating: 4.5,
    reviewsCount: 100,
    stock: 10,
  };

  const renderWithRouter = (component: React.ReactElement) => {
    return render(<BrowserRouter>{component}</BrowserRouter>);
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should render product card", () => {
    renderWithRouter(<ProductCard product={mockProduct} />);

    expect(screen.getByTestId("card")).toBeInTheDocument();
  });

  it("should render product image", () => {
    renderWithRouter(<ProductCard product={mockProduct} />);

    const image = screen.getByAltText("iPhone 17 Pro White");
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute(
      "src",
      "/products/iphone-17-pro/white/iphone-17-pro-front.webp"
    );
  });

  it("should render product name", () => {
    renderWithRouter(<ProductCard product={mockProduct} />);

    expect(
      screen.getByText("products:product.iphone_17_pro_white.name")
    ).toBeInTheDocument();
  });

  it("should render product short description", () => {
    renderWithRouter(<ProductCard product={mockProduct} />);

    expect(
      screen.getByText("products:product.iphone_17_pro_white.short_description")
    ).toBeInTheDocument();
  });

  it("should render formatted price", () => {
    renderWithRouter(<ProductCard product={mockProduct} />);

    expect(screen.getByText("€1,299.00")).toBeInTheDocument();
  });

  it("should render link to product detail", () => {
    renderWithRouter(<ProductCard product={mockProduct} />);

    const link = screen.getByRole("link");
    expect(link).toHaveAttribute(
      "href",
      "/products/phones/iphone/iphone-17/iphone-17-pro-white"
    );
  });

  it("should render add to cart button", () => {
    renderWithRouter(<ProductCard product={mockProduct} />);

    const button = screen.getByTestId("add-to-cart-button");
    expect(button).toBeInTheDocument();
  });

  it("should call addItem when add to cart button is clicked", async () => {
    const user = userEvent.setup();
    renderWithRouter(<ProductCard product={mockProduct} />);

    const button = screen.getByTestId("add-to-cart-button");
    await user.click(button);

    expect(mockAddItem).toHaveBeenCalledWith({
      id: "product1",
      name: "iPhone 17 Pro White",
      price: 1299,
      image: "/products/iphone-17-pro/white/iphone-17-pro-front.webp",
    });
  });

  it("should render card with correct classes", () => {
    renderWithRouter(<ProductCard product={mockProduct} />);

    const card = screen.getByTestId("card");
    expect(card).toHaveClass("hover:border-primary");
  });

  it("should render image with correct size classes", () => {
    renderWithRouter(<ProductCard product={mockProduct} />);

    const image = screen.getByAltText("iPhone 17 Pro White");
    expect(image).toHaveClass("w-24", "h-24", "sm:w-32", "sm:h-32");
  });

  it("should render add to cart text for mobile", () => {
    renderWithRouter(<ProductCard product={mockProduct} />);

    const mobileText = screen.getByText("common:add");
    expect(mobileText).toBeInTheDocument();
  });

  it("should render add to cart text for desktop", () => {
    renderWithRouter(<ProductCard product={mockProduct} />);

    const desktopText = screen.getByText("common:add_to_cart");
    expect(desktopText).toBeInTheDocument();
  });

  it("should render shopping bag icon", () => {
    renderWithRouter(<ProductCard product={mockProduct} />);

    const button = screen.getByTestId("add-to-cart-button");
    expect(button).toBeInTheDocument();
  });

  it("should have correct button variant and size", () => {
    renderWithRouter(<ProductCard product={mockProduct} />);

    const button = screen.getByTestId("add-to-cart-button");
    expect(button).toHaveAttribute("data-variant", "outline");
    expect(button).toHaveAttribute("data-size", "sm");
  });
});
