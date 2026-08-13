# Zext Digital — Frontend

Marketing site for **Zext Digital**, built with **Next.js** (App Router), **React 19**, and **TypeScript**. It runs as a **server-rendered Node app** (`next start`) and ships with a Docker setup for containerized deploys.

---

## Requirements

- **Node.js** (LTS recommended)
- **npm** (package manager used in this repo)

---

## Scripts

| Command     | Description                                      |
|------------|---------------------------------------------------|
| `npm run dev`   | Dev server (Next.js with Turbopack)          |
| `npm run build` | Production build (`.next/`)                    |
| `npm run start` | Serves the production build (after `build`)  |
| `npm run lint`  | ESLint (`eslint-config-next`)                |

After `build`, run **`npm run start`** to serve the app (a Node server on port 3000). The repo also ships a **Dockerfile** + **docker-compose.yml** for containerized deploys (`docker compose up --build`).

---

## Tech stack

### Core

| Package        | Role |
|----------------|------|
| **next** `16.x` | Framework: App Router, SSR (`next start`), metadata, fonts |
| **react** / **react-dom** `19.x` | UI |
| **typescript** | Typing |

### Styling & UI

| Package | Role |
|---------|------|
| **tailwindcss** `4.x` | Utility-first CSS (`@import "tailwindcss"` in `globals.css`) |
| **@tailwindcss/postcss** | PostCSS pipeline for Tailwind v4 |
| **tailwind-merge** + **clsx** | Conditional class merging (`cn()` in `@/utils`) |
| **class-variance-authority** | Variant-based component APIs where used |
| **tw-animate-css** | Animation utilities |
| **shadcn** (CLI) + **`@base-ui/react`** | Component patterns; see `components.json` (style: **base-maia**) |
| **lucide-react** | Icons (many sections) |
| **@hugeicons/react** + **@hugeicons/core-free-icons** | Icon set aligned with shadcn config |

Design tokens (e.g. `--color-primary`, `--color-secondary`, `--color-background`) live in **`src/app/globals.css`** under `@theme`.

### Motion & interaction

| Package | Role |
|---------|------|
| **motion** (`motion/react`) | Layout / section animations, reduced-motion aware usage |
| **lenis** + **`lenis/react`** | Smooth scrolling (`ReactLenis` in `LayoutWrapper`) |
| **gsap** | Timeline / animation where used |
| **swiper** | Carousels / sliders |
| **react-pageflip** | Page-flip style UI where used |

### 3D & graphics

| Package | Role |
|---------|------|
| **three** + **@types/three** | WebGL / 3D scenes |
| **ogl** | Lightweight WebGL |

### Data & HTTP

| Package | Role |
|---------|------|
| **axios** | HTTP client (where used alongside or instead of `fetch`) |

### Tooling (dev)

| Package | Role |
|---------|------|
| **eslint** + **eslint-config-next** | Linting |
| **@types/node** / **@types/react** / **@types/react-dom** | Type definitions |

### Third-party embeds

- **Calendly** — loaded via `next/script` in `layout.tsx` (`lazyOnload`).

---

## Architecture

### Next.js App Router (`src/app/`)

- **`layout.tsx`** — Root layout: fonts (Figtree / Plus Jakarta Sans), global CSS, Calendly script, **`LayoutWrapper`**.
- **`page.tsx`** — Home route; composes **`(pages)/Home/Homepage`**.
- **Route group `(pages)/`** — Groups marketing pages without affecting URLs (e.g. `Home/`, `blogs/`, `newsletter/`, legal pages).
- **File-based routing** — e.g. `blogs/[slug]/` for dynamic blog posts; `newsletter/unsubscribe/` for unsubscribe flow.

### Layout shell (`src/app/wrappers/LayoutWrapper.tsx`)

Client wrapper that provides:

- **Lenis** smooth scroll
- **Navbar** + **MobileMenu**
- **CustomCursor**, **NewsletterFloater**, **HashScrollHandler**
- **`<main>`** with pathname key for transitions
- Conditional **NewsletterSection** / **Footer** by route (e.g. newsletter subscribe page can hide inline newsletter block)

### Component Structure

Components are split by **scope**:

| Location | What goes here |
|----------|----------------|
| **`src/app/components/shared/`** | App-wide layout and chrome: **Navbar**, **Footer**, **MobileMenu**, **NewsletterSection**, hash scroll, shared content shells |
| **`src/app/components/ui/`** | Reusable primitives and effects: buttons, badges, cursor, backgrounds, 3D helpers—anything multiple routes can import |
| **`src/app/(pages)/<route>/components/`** | **Route-colocated UI** for that feature only—forms, page clients, one-off sections—kept beside the route entry so imports stay local |
| **`src/app/wrappers/`** | Site-wide client wrappers |
| **`src/utils/`** | Non-React helpers: class merging, anchors, constants, shared API helpers |
| **`src/app/hooks/`** | Client hooks shared across pages |
| **`src/types/`** | Shared TypeScript types |

**Convention:** shared UI comes from `app/components`; feature-only UI comes from that feature’s folder under `app/(pages)`.

### Path alias

- **`@/*` maps to `src/*`** — see `tsconfig.json`.

### API usage (backend JSON)

Shared helpers live in **`src/utils/api/apiClient.ts`**:

- **`getApiBase()`** — Returns the API base URL (already version-suffixed).
- **`isApiErrorBody`** — Response error-shape check.

Backend service base URLs are **not** read from `.env`. They live as constants in **`src/utils/constants/apiEndpoints.ts`**, which exports `API_ENDPOINTS` (`authApiBaseUrl`, `utilitiesApiBaseUrl`). The set is chosen by `process.env.NODE_ENV` — the `development` values under `next dev`, the `production` values after `next build` / `next start`. To change a URL, edit that file.

User-facing error copy is centralized under **`src/utils/constants/error/messages.ts`**.

Shared client hooks live under **`src/app/hooks`**. If a route’s UI depends on search parameters (deep links, prefilled fields, etc.), keep the relevant client subtree behind a **`Suspense`** boundary so prerendering behaves as Next expects.

### Runtime & deployment

The app runs as a **Node server** in production via **`next start`**. The **Dockerfile** is a multi-stage build (`next build`, then a slim runner that serves with prod-only dependencies). `next.config.ts` keeps **`trailingSlash: true`** and **`images.unoptimized: true`**. The browser talks to the **external** backend services (API, auth, blog); their base URLs come from `src/utils/constants/apiEndpoints.ts`.

### Styling conventions

- **Tailwind v4** with `@theme` tokens and **`@custom-variant dark`** where needed.
- Prefer **`cn()`** for conditional classes.
- **`motion/react`** for enter animations; respect **`useReducedMotion`** where animations are decorative.

---

## Project config files (quick reference)

| File | Role |
|------|------|
| `next.config.ts` | `trailingSlash`, image config |
| `tsconfig.json` | Strict TS, `@/*` paths |
| `components.json` | shadcn CLI / registry settings |
| `src/app/globals.css` | Tailwind entry, theme, global keyframes |
| `postcss.config.mjs` | PostCSS (Tailwind) |

---

## Contributing / local setup

1. Install dependencies: `npm install`
2. Run **`npm run dev`** and open the printed local URL. **No `.env` is required** — backend URLs come from `src/utils/constants/apiEndpoints.ts` (the `development` set under `next dev`).
3. To point local dev at different backends, edit the `development` values in that file.

For production parity, run **`npm run build && npm run start`** (or `docker compose up --build`) and confirm the app behaves as expected against the `production` URLs.
