# Testing Documentation

This project uses **Vitest** for unit testing with React Testing Library for component tests.

## Test Structure

```
src/
├── utils/__tests__/
│   ├── slug.test.ts
│   ├── price.test.ts
│   └── catalog.test.ts
├── components/product/__tests__/
│   ├── ProductCard.test.tsx
│   ├── ProductCards.test.tsx
│   ├── ProductGallery.test.tsx
│   ├── ProductCategoryCard.test.tsx
│   └── ProductCarouselGallery.test.tsx
└── test/
    ├── setup.ts
    └── README.md
```

## Running Tests

### Run all tests once

```bash
pnpm test run
```

### Run tests in watch mode

```bash
pnpm test
```

### Run tests with UI

```bash
pnpm test:ui
```

### Run tests with coverage

```bash
pnpm test:coverage
```

## Test Coverage

### Utils Tests (51 tests)

#### `slug.test.ts` (12 tests)

- Text conversion to lowercase
- Space replacement with hyphens
- Diacritics removal
- Special characters handling
- Leading/trailing hyphens trimming
- Unicode normalization
- Product and category name slugification

#### `price.test.ts` (13 tests)

- Price localization from i18n keys
- Price formatting with currency symbols
- Czech (CZK) and English (EUR) locale support
- Invalid price handling
- Decimal price formatting

#### `catalog.test.ts` (26 tests)

- Category path retrieval by ID
- Category slug path generation
- Category lookup by full path
- Product category path generation
- Product slug generation
- Product path segments
- Product lookup by slug
- Path parsing (product vs category)
- Wildcard path handling

### Component Tests (50 tests)

#### `ProductGallery.test.tsx` (9 tests)

- Main image rendering
- Thumbnail rendering
- Image selection on click
- Border styling for selected thumbnail
- Single image handling

#### `ProductCategoryCard.test.tsx` (9 tests)

- Category card rendering
- Category image display
- Link URL generation
- Typography component integration
- CSS classes validation
- Subcategory URL handling

#### `ProductCards.test.tsx` (8 tests)

- Multiple products rendering
- Grid layout validation
- Empty state handling
- Product order maintenance
- Responsive grid classes

#### `ProductCarouselGallery.test.tsx` (10 tests)

- Carousel rendering
- Carousel navigation buttons
- Product items in carousel
- Carousel item classes
- Empty products handling
- Responsive carousel layout

#### `ProductCard.test.tsx` (14 tests)

- Product card rendering
- Product image display
- Product name and description
- Price formatting
- Link to product detail
- Add to cart functionality
- Shopping cart integration
- Responsive text display
- Button variant and size

## Test Configuration

### `vitest.config.ts`

- Environment: jsdom
- Globals: enabled
- Setup file: `src/test/setup.ts`
- Coverage provider: v8
- Path aliases: `@/*` → `./src/*`

### `src/test/setup.ts`

- Testing Library cleanup after each test
- `window.matchMedia` mock for responsive tests
- Jest DOM matchers

## Mocking Strategy

### Utils Tests

- Mock i18n for price localization
- Mock category data for catalog tests

### Component Tests

- Mock child components to isolate testing
- Mock utility functions (catalog, price, translate)
- Mock MobX stores (CartStore)
- Mock React Router for navigation
- Mock UI components (Card, Button, Typography)
