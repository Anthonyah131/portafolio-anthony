# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```sh
npm run dev        # Dev server at localhost:4321
npm run build      # Build to ./dist/
npm run preview    # Preview production build
```

Lighthouse audits (requires running dev server first):
```sh
npm run lighthouse          # Performance audit (general)
npm run lighthouse:mobile   # Mobile performance audit
npm run lighthouse:desktop  # Desktop performance audit
```

There are no test commands — this project has no test suite.

## Architecture Overview

This is an **Astro + React** portfolio site with a **Three.js / React Three Fiber** 3D background scene.

### Rendering model
- The site has two pages: `src/pages/index.astro` (redirects) and `src/pages/portfolio.astro` (main content).
- All React components use `client:only="react"` — there is no SSR hydration; everything runs purely client-side.
- The 3D background (`#three-background`) is `position: fixed`, full viewport, `z-index: 1`. The content sections (`#content-sections`) sit on top at `z-index: 2` with `pointer-events: none`, with individual sections overriding back to `pointer-events: auto`.

### 3D Scene pipeline
- `HeroSceneLoader` → lazy-loads `HeroSceneDynamic` → renders `HeroScene` — only on screens ≥ 1024px wide.
- `HeroScene` sets up the R3F `Canvas` with a `SheetProvider` from Theatre.js. The scene contains `StarsField`, `ColoredLights`, and `HothScene` (a GLTF model at `public/models/hothPlanet.glb`).
- Camera animation is driven by scroll position via `useTheatreScroll` hook, which lerps the Theatre.js sequence position to match scroll progress over a 12-unit animation timeline.
- Animation keyframes/state are stored in `src/data/animationState.json` and loaded via `getProject("Portfolio", { state: animationState })`. In editor mode (dev, path `/`), Theatre Studio is initialized and the state is live-editable.

### Theatre.js editor mode
- `src/theatre/studio.ts` initializes Theatre Studio **only** in dev mode AND when `window.location.pathname === '/'`.
- To edit the 3D animation, run dev server and navigate to `http://localhost:4321/` (root path). Export the updated state and replace `src/data/animationState.json`.

### Performance adaptation
- `usePerformanceMode` hook measures FPS for 3 seconds after load and detects hardware concurrency/memory to classify the device as `high`/`medium`/`low`.
- `getPerformanceConfig(mode)` returns star count, light count, and quality settings accordingly.
- `PerformanceMonitor` component renders in the wrapper to observe ongoing performance.

### Section-to-scene interaction
- `useAboutSection` and `useContactSection` hooks use `IntersectionObserver` to detect which section is visible.
- When in the About section and hovering a Snowspeeder ship in the 3D scene, a `ProfileModal` overlay appears.
- When in the Contact section and hovering the planet, `OrbitControls` replaces the Theatre camera to allow free rotation.

### Data
- Project and certificate data live in `src/data/projects.ts` and `src/data/certificates.ts` with types in `src/types/portfolio.ts`.
- Contact form uses `@emailjs/browser`.

## Styling Conventions

- Prefer Tailwind utility classes in components and Astro templates for layout, spacing, typography, hover states, and responsive behavior.
- Avoid adding page-specific styling to `src/styles/global.css` unless the style is a truly shared primitive used across multiple areas.
- Avoid CSS `clamp(...)` for spacing, sizing, and typography in new code. Prefer breakpoint-based Tailwind classes such as `sm:`, `md:`, `lg:`, `xl:` and explicit scale or arbitrary values when necessary.
- If a visual treatment is one-off for a single page or component, keep it in the markup with Tailwind classes instead of introducing new custom CSS selectors.
