## ShopHub – demo e‑commerce project

This project is a **demo online shop** whose main purpose is to showcase my skills
(frontend, React, TypeScript, state management, styling, working with data, etc.).
It is **not** a production‑ready application and it is **not** a real online store.

The repository contains a larger number of images and UI assets (banners, product
images, icons, etc.), so the project **intentionally has a bigger size**.

Data used by the application (e.g. products / configuration) are **stored locally
in the project** – they are not loaded from any external API.

---

## Technologies and libraries

**Runtime / UI**

- **React 19** and **React DOM**
- **React Router DOM**
- **MobX** and **mobx-react-lite**
- **Tailwind CSS 4**
- **shadcn/ui**
- **i18next**, **react-i18next**, **i18next-browser-languagedetector**

**Tooling / development**

- **Vite 7**
- **TypeScript 5**
- **ESLint**

---

## Requirements

- **Node.js** version 18 or newer (18+ recommended)
- **pnpm** (recommended package manager)

---

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/MichalekJan93/eCommerce_basic.git
   cd ecommerce_basic
   ```

2. Install dependencies:

   ```bash
   pnpm install
   ```

   > If you don't have pnpm installed:
   >
   > ```bash
   > npm install -g pnpm
   > ```

---

## Running the development server

Start the Vite dev server (typically available at `http://localhost:5173`):

```bash
pnpm dev
```

---

## Build and preview of the production bundle

Create a production build:

```bash
pnpm build
```

Preview the production build locally (Vite preview):

```bash
pnpm preview
```

---

## Linting

Run ESLint on the whole project:

```bash
pnpm lint
```

---

## Unit tests (Vitest)

The project uses **[Vitest](https://vitest.dev/)** for unit testing with **React Testing Library** for component tests.

### Running tests

Run all tests once:

```bash
pnpm test run
```

Run tests in watch mode:

```bash
pnpm test
```

Run tests with UI:

```bash
pnpm test:ui
```

Run tests with coverage:

```bash
pnpm test:coverage
```

### Test coverage

The project currently has **101 tests** covering:

- **Utils** (51 tests)

  - `slug.ts` - Text slugification (12 tests)
  - `price.ts` - Price formatting and localization (13 tests)
  - `catalog.ts` - Category and product path handling (26 tests)

- **Components** (50 tests)
  - `ProductCard` - Product card component (14 tests)
  - `ProductCards` - Product grid component (8 tests)
  - `ProductGallery` - Image gallery component (9 tests)
  - `ProductCategoryCard` - Category card component (9 tests)
  - `ProductCarouselGallery` - Carousel gallery component (10 tests)

For more details, see [src/test/README.md](src/test/README.md).
