import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ProductGallery from "../ProductGallery";

describe("ProductGallery", () => {
  const mockImages = [
    "/products/iphone-17-pro/white/iphone-17-pro-front.webp",
    "/products/iphone-17-pro/white/iphone-17-pro-solo.webp",
    "/products/iphone-17-pro/white/iphone-17-pro-back.webp",
  ];

  const mockAlt = "iPhone 17 Pro White";

  it("should render main image", () => {
    render(<ProductGallery images={mockImages} alt={mockAlt} />);

    const mainImage = screen.getByAltText(mockAlt);
    expect(mainImage).toBeInTheDocument();
    expect(mainImage).toHaveAttribute("src", mockImages[0]);
  });

  it("should render all thumbnail images", () => {
    render(<ProductGallery images={mockImages} alt={mockAlt} />);

    mockImages.forEach((_, index) => {
      const thumbnail = screen.getByAltText(`${mockAlt} - ${index + 1}`);
      expect(thumbnail).toBeInTheDocument();
    });
  });

  it("should display first image by default", () => {
    render(<ProductGallery images={mockImages} alt={mockAlt} />);

    const mainImage = screen.getByAltText(mockAlt);
    expect(mainImage).toHaveAttribute("src", mockImages[0]);
  });

  it("should change main image when thumbnail is clicked", async () => {
    const user = userEvent.setup();
    render(<ProductGallery images={mockImages} alt={mockAlt} />);

    const mainImage = screen.getByAltText(mockAlt);
    const secondThumbnail = screen.getByAltText(`${mockAlt} - 2`);

    // Click second thumbnail
    await user.click(secondThumbnail);

    expect(mainImage).toHaveAttribute("src", mockImages[1]);
  });

  it("should change main image when third thumbnail is clicked", async () => {
    const user = userEvent.setup();
    render(<ProductGallery images={mockImages} alt={mockAlt} />);

    const mainImage = screen.getByAltText(mockAlt);
    const thirdThumbnail = screen.getByAltText(`${mockAlt} - 3`);

    // Click third thumbnail
    await user.click(thirdThumbnail);

    expect(mainImage).toHaveAttribute("src", mockImages[2]);
  });

  it("should apply correct border style to selected thumbnail", async () => {
    const user = userEvent.setup();
    render(<ProductGallery images={mockImages} alt={mockAlt} />);

    const firstThumbnailButton = screen
      .getByAltText(`${mockAlt} - 1`)
      .closest("button");
    const secondThumbnailButton = screen
      .getByAltText(`${mockAlt} - 2`)
      .closest("button");

    // First thumbnail should be selected by default
    expect(firstThumbnailButton).toHaveClass("border-primary");

    // Click second thumbnail
    if (secondThumbnailButton) {
      await user.click(secondThumbnailButton);
    }

    // Second thumbnail should now be selected
    expect(secondThumbnailButton).toHaveClass("border-primary");
  });

  it("should render with single image", () => {
    const singleImage = [mockImages[0]];
    render(<ProductGallery images={singleImage} alt={mockAlt} />);

    const mainImage = screen.getByAltText(mockAlt);
    expect(mainImage).toBeInTheDocument();
    expect(mainImage).toHaveAttribute("src", singleImage[0]);

    const thumbnail = screen.getByAltText(`${mockAlt} - 1`);
    expect(thumbnail).toBeInTheDocument();
  });

  it("should have correct image container classes", () => {
    const { container } = render(
      <ProductGallery images={mockImages} alt={mockAlt} />
    );

    const mainImageContainer = container.querySelector(".p-4");
    expect(mainImageContainer).toBeInTheDocument();
  });

  it("should render thumbnails in a flex container", () => {
    const { container } = render(
      <ProductGallery images={mockImages} alt={mockAlt} />
    );

    const thumbnailContainer = container.querySelector(".flex.gap-2");
    expect(thumbnailContainer).toBeInTheDocument();
  });
});

