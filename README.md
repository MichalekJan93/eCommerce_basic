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

- **React 19** and **React DOM** – building the user interface and SPA architecture
- **React Router DOM** – client‑side routing between pages (URLs, navigation)
- **MobX** and **mobx-react-lite** – application state management
- **Tailwind CSS 4** – utility‑first CSS framework for fast and consistent styling
- **tailwind-merge**, **tailwindcss-animate**, **tw-animate-css** – helpers for Tailwind
  class composition and animations
- **shadcn/ui** – component library for building accessible, reusable React UI
  (built on top of Radix UI primitives)
- **i18next**, **react-i18next**, **i18next-browser-languagedetector** – localisation
  and language detection
- **lucide-react** – icon set (SVG icons)
- **class-variance-authority**, **clsx** – building component variants and composing
  CSS class names

**Tooling / development**

- **Vite 7** – fast dev server and bundler
- **TypeScript 5** – typing and better DX
- **ESLint** (`eslint`, `@eslint/js`, `eslint-plugin-react-hooks`,
  `eslint-plugin-react-refresh`, `typescript-eslint`, `globals`) – linting and code
  quality checks
- **@vitejs/plugin-react**, **babel-plugin-react-compiler** – React integration and
  optimisations in Vite
- **@types/react**, **@types/react-dom**, **@types/node** – TypeScript type
  definitions for libraries

---

## Requirements

- **Node.js** version 18 or newer (18+ recommended)
- **npm** (or alternatively `pnpm` / `yarn` – examples below use `npm`)

---

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/MichalekJan93/eCommerce_basic.git
   cd ecommerce_basic
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

   > If you use a different package manager:
   >
   > - `pnpm install`
   > - `yarn install`

---

## Running the development server

Start the Vite dev server (typically available at `http://localhost:5173`):

```bash
npm run dev
```

---

## Build and preview of the production bundle

Create a production build:

```bash
npm run build
```

Preview the production build locally (Vite preview):

```bash
npm run preview
```

---

## Linting

Run ESLint on the whole project:

```bash
npm run lint
```

---

## Unit tests (Vitest)

The project is intended to use **unit tests with [Vitest](https://vitest.dev/)**.

Current status:

- The core application is ready, but **Vitest is not configured yet**
  (the dependency and test scripts will be added later).
- This README already contains a dedicated section so it is clear that tests will
  be written using **Vitest**.

Plan:

- Add the `vitest` dependency (and possibly `@vitest/ui`, etc.) to `devDependencies`
- Configure test scripts in `package.json`, for example:

  ```json
  "scripts": {
    "test": "vitest",
    "test:watch": "vitest --watch"
  }
  ```

- Gradually add unit tests for key parts of the application (stores, components,
  utility functions, ...)

Until then, this README serves as documentation of the intention that
**unit tests will be implemented using Vitest**.
