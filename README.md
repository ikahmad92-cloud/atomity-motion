# Atomity — Multi-Cloud Orchestration (Frontend Challenge)

A single-page interactive product preview for Atomity, a fictional real-time multi-cloud optimization platform. Built as a submission for the Atomity Frontend Engineering Challenge.

**Live demo:** _(deploy URL to be added)_
**Repository:** _(public repo URL to be added)_

---

## Which feature I chose and why

I chose to interpret the **Sticky Scroll Cloud Visualization** segment from the brief, then expanded it into a full landing experience. The final page has 4 sections:

1. **Hero** — headline + a floating multi-cloud dashboard preview on the right
2. **Feature trio** — three full sections (Unified Visibility, Real-Time Optimization, Performance Without Waste), each with its own structurally distinct dashboard widget
3. **Live Fleet Metrics** — 3 KPI cards driven by a real API
4. **CTA** — gradient call-to-action with social proof and Lucide-iconed buttons

Wrapping the page: a sticky blurred **Navbar** and a 4-column **Footer**.

**Why this scope:** the brief asks for "a polished single section" not a full page, but the sticky-scroll concept benefits enormously from having a Hero leading in and a CTA leading out. The three feature sections deliberately use three completely different dashboard idioms (status list, ops console with sparkline, savings billboard) to demonstrate component variety — not three near-duplicate cards.

---

## Animation approach

All motion is built on **Framer Motion** with a strict philosophy:

- **Entrance, not idle.** Most animations fire once on `whileInView` via IntersectionObserver and stop. No infinite shimmer where it isn't earned.
- **Spring physics for entrances** (`type: "spring", stiffness: 260, damping: 24`) — feels alive without overshoot or bounciness.
- **Eased fills for bars and widths** (`ease: "easeOut", duration: 0.9–1.2s`) — quantitative animations should feel deliberate, not springy.
- **Staggered children** at 0.06–0.08s intervals. Anything tighter looks instant; anything looser looks slow.
- **Animated number counters** for KPIs using `useMotionValue` + `animate()` + a `useTransform` rounding pipeline.
- **SVG draws** (sparklines, progress bars) use `pathLength` and `width` keyframes — never `clip-path` (poor compositor performance).
- **Ambient motion** (live-status pulse, gradient backdrop drift, CTA orbit) is kept slow (1.6–80s loops) and capped at low opacity so it never competes for attention.
- **`prefers-reduced-motion`** is honored via `useReducedMotion()`. Ambient loops are disabled; entrance fades are preserved.

---

## Tokens / styles

Five tokens, defined once, referenced everywhere — no scattered hex.

**Declared in `src/App.css`:**
```css
:root {
  --color-bg-primary: #FFFFFF;
  --color-text-primary: #0E0F11;
  --color-accent-primary: #2F5BFF;
  --color-accent-success: #1F8A4C;
  --color-accent-error: #D93F3F;
}
```

**Exposed to Tailwind in `tailwind.config.js`:**
```js
colors: {
  bgPrimary: "var(--color-bg-primary)",
  textPrimary: "var(--color-text-primary)",
  accentPrimary: "var(--color-accent-primary)",
  accentSuccess: "var(--color-accent-success)",
  accentError: "var(--color-accent-error)",
}
```

**Derivatives via modern CSS** (in `App.css`):
- `.surface-soft`, `.surface-accent-soft`, `.surface-success-soft` — soft tints built with `color-mix(in srgb, var(--color-X) NN%, transparent)`
- `.glow-accent`, `.glow-success` — multi-layered shadows derived from tokens
- `.kpi-grid-wrap` — `container-type: inline-size` parent enabling true container-query breakpoints on the KPI grid
- `:focus-visible` outline using `accentPrimary`
- Global `prefers-reduced-motion` killswitch

**Modern CSS used:** `color-mix()`, container queries (`@container`), `:has()` parent-aware styling, logical properties (`margin-inline`, `max-inline-size`), and `clamp()` fluid typography.

**Brand colors on provider SVG logos** (AWS orange, Azure blue, etc.) are preserved because they're content/marks, not UI chrome.

---

## Data fetching and caching

**API**: `https://dummyjson.com/products?limit=3&select=id,title,price,rating,stock,discountPercentage,brand,category,availabilityStatus`

**Stack**:
- `axios` — single instance in `src/api-client/axiosInstance.ts` with `baseURL` from `VITE_API_URL` (or fallback `https://dummyjson.com`)
- An axios request interceptor auto-attaches a Bearer token from `localStorage` if present
- `@tanstack/react-query` — query client provided at the root in `src/main.tsx`

**Hook layer:**
- Base `useGetApi<T>(endpoint, params, options)` — generic GET wrapper in `src/hooks/useGetApi.ts`
- Base `usePostApi<TData, TVariables>(endpoint, options)` — generic POST wrapper in `src/hooks/usePostApi.ts`
- Domain hook `useCloudMetrics()` in `src/hooks/useCloudMetrics.ts` — calls `useGetApi`, transforms raw dummyjson products into cloud-themed KPIs (Optimization Score from `rating`, Active Clusters from `stock`, Cost Reduction from `discountPercentage`)

**Caching strategy:**
- `staleTime: 5 minutes` — data is considered fresh; no refetch on remount within that window
- `gcTime: 10 minutes` — kept in memory after components unmount
- `refetchOnWindowFocus: false` — no surprise refetches when the tab regains focus
- React Query's per-key cache means revisiting the page is **instant** — verified in DevTools Network tab: first visit fires one request, subsequent navigations fire none

**Async state coverage in `MetricsSection`:**
- **Loading**: 3 skeleton cards (built with the project's own `Skeleton` component, no library)
- **Error**: alert card with a "Retry" button that disables itself via the project's `Button.isLoading` prop while refetching
- **Success**: 3 animated `KpiCard`s with counter animation + fill bar + trend pill with Lucide icons

---

## Libraries used and why

| Library | Why |
|---|---|
| **React 19 + TypeScript** | Required by brief; React 19's compiler-friendly patterns + TS for safety |
| **Vite 8** | Fast dev server, native ESM, sub-2s production build for this app |
| **Tailwind CSS v3.4** | Required (preferred) styling option; lets tokens flow into utilities |
| **Framer Motion** | Required animation lib; spring physics + `useScroll`/`useTransform` + `whileInView` are unmatched for declarative motion |
| **@tanstack/react-query v5** | Brief recommends it specifically; best-in-class server-state caching |
| **axios** | One HTTP client with interceptors for auth — cleaner than fetch for the token-injection pattern |
| **lucide-react** | Open-source line icons; tree-shakes to only imported icons |
| **react-router-dom v7** | Minimal — single `/` route — but kept for easy multi-page extension |
| **clsx** | Tiny className composition helper used inside `Button` |

**Deliberately NOT used:** MUI, Chakra, Ant Design, shadcn, Radix. Every UI primitive (`Text`, `Button`, `Skeleton`, `Loader`, `Navbar`, `Footer`, all section components) was built from scratch.

---

## Project structure

```
src/
  api-client/
    axiosInstance.ts          # axios + interceptor
    endpoints.ts              # flat KEY: "path" constants
  hooks/
    useGetApi.ts              # generic GET wrapper
    usePostApi.ts             # generic POST wrapper
    useCloudMetrics.ts        # domain hook with product → KPI transform
    index.ts
  components/
    ui/
      button/Button.tsx
      loader/Loader.tsx
      skeleton/Skeleton.tsx
      text/Text.tsx
    layout/
      Navbar.tsx              # sticky, backdrop-blur, mobile menu
      Footer.tsx              # 4-column grid + socials + system status
    ScrollToTop.tsx
    index.ts                  # barrel re-export
  pages/
    home/
      Home.tsx                # uses Sections registry
      sections/
        Sections.ts           # component registry (namespace pattern)
        index.ts              # barrel
        hero/                 # HeroSection + FloatingPreview
        cloud-viz/            # CloudVizSection (3 visuals in one file)
        metrics/              # MetricsSection + KpiCard
        cta/                  # CtaSection
  routes/AppRoutes.tsx
  App.css                     # tokens + surface helpers + reduced motion
  App.tsx
  main.tsx                    # QueryClientProvider + BrowserRouter
```

Path aliases: `@/*` → `src/*` (configured in both `vite.config.ts` and `tsconfig.app.json`).

---

## Tradeoffs / decisions I made

- **No sticky-scroll choreography.** The brief reference video shows a sticky-scroll section, and I built one first — but it consistently felt fragile (text states colliding, visualization morphing creating "what just changed?" moments). I split it into three normal scroll sections, each with its own dedicated widget.
- **Brand colors retained on provider SVG logos.** A strict reading of "only use the 5 tokens" would mean recoloring AWS/Azure/GCP marks. I treated brand logos as **content**, not chrome — same way Datadog/Grafana dashboards work in real life.
- **Container queries on a dedicated wrapper, not the grid itself.** Initial implementation set `container-type: inline-size` on the same `.kpi-grid` element that ran `@container` queries — that interaction is unreliable cross-browser. Moved `container-type` to a parent `.kpi-grid-wrap`, now resolves predictably.
- **`axios` over `fetch`.** Marginal call. Picked it for the request-interceptor pattern (auto-attach Bearer token) — cleaner than re-implementing per call.
- **Light theme only.** Dark mode is bonus per the brief; I chose to spend the time on visual variety across sections instead. Dark mode would require a parallel set of `:root[data-theme="dark"]` token values — easy because every color is already centralized.
- **Three different visual idioms** for the three Feature sections (status list / ops console / billboard) instead of three similar cards — felt more honest to the brief's "surprise us" line.

---

## What I would improve with more time

- **Animated topology with real data.** I built and removed a sticky-scroll SVG topology with connection lines and traveling particles — it was technically impressive but visually noisy. Given more time I'd revisit it as an interactive `<canvas>` element with WebGL particles riding actual data-flow paths driven by the live API.
- **Dark mode** — token-level swap, no component changes needed.
- **Storybook + visual regression** — `Text`, `Button`, `Skeleton`, `Loader`, `KpiCard`, the section visuals all deserve isolated documentation.
- **Bundle splitting per section** — Framer Motion is ~60 KB gzipped; route-level code split for `Home` already happens, but I'd lazy-load `CloudVizSection` and `MetricsSection` so the Hero ships first-paint-ready.
- **Real Lighthouse / Core Web Vitals pass** — I targeted CWV-friendly patterns (no layout shift, transform/opacity-only animations) but didn't profile with throttling.
- **Better empty states** — the API has a happy path. I have an error state but no "no data yet" state because the API always returns 3 products.
- **Deeper a11y pass** — semantic landmarks (`<nav>`, `<main>`, `<footer>`) are in place, heading hierarchy is correct, `aria-hidden` on decorative SVGs, `prefers-reduced-motion` honored, focus rings present. A full WCAG 2.2 AA audit (color contrast on `accentPrimary` over `bgPrimary` for body text, screen-reader walkthrough) would be next.

---

## Running locally

```bash
npm install
npm run dev          # http://localhost:5173
```

Optional `.env`:
```
VITE_API_URL=https://dummyjson.com
```

Build / typecheck:
```bash
npm run build        # tsc -b && vite build
npx tsc --noEmit -p tsconfig.app.json
```
