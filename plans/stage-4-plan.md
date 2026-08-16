# Photo-PDF Tools — Stage 4 Plan: Polish & Quality Pass

**Goal:** Production-grade polish without changing tool behavior. Fix performance
(huge single JS bundle), tighten SEO/meta, improve accessibility & keyboard nav,
audit dark mode and responsive layout, and clean up favicon/branding.

## 1. Performance — code-splitting (biggest win)

Problem: `npm run build` emits one `index-*.js` at ~1300 kB (gzip 435 kB) plus the
1.2 MB pdfjs worker — all loaded on every page visit.

Fix:
- `src/App.jsx` — convert static imports of the 17 tool pages + the two listing pages
  to `React.lazy(() => import(...))` and wrap routes in `<Suspense>`.
- Keep layout (Header/Footer/Home) in the initial bundle so first paint is fast.
- Add a small route fallback loader (`src/components/ui/RouteLoader.jsx`).
- Vite/Rolldown will then split pdf-lib / pdfjs / jszip / react-easy-crop into shared
  chunks that load only when a matching tool is opened.

## 2. SEO & meta polish

- `src/components/ui/Seo.jsx` — verify each page renders `<title>` + meta description;
  add Open Graph (`og:title`, `og:description`, `og:type`) and `theme-color`.
- `index.html` — keep base title/description/favicon; add `theme-color` for light/dark
  and a default OG fallback.
- Add `public/robots.txt` (allow all) and a minimal `public/sitemap.xml` for the main
  routes (documented as "generated for static hosting").
- Verify every route already has a unique `<title>` (spot-check via headless test).

## 3. Accessibility & keyboard nav

- Add a **skip-to-content** link in `Header.jsx` → `main#main-content` in `Layout.jsx`.
- Audit icon-only buttons for `aria-label` (Header dark toggle, mobile menu, tool-page
  arrow/trash/rotate buttons).
- Ensure global `:focus-visible` styling in `index.css` (consistent `focus-ring` utility;
  add a visible outline fallback so keyboard users always see where they are).
- Check heading order (single `h1` per page), range inputs have labels/aria-labels.

## 4. Dark mode & responsive audit

- Grep for missing `dark:` variants across components (Header, Footer, ToolCard,
  FileUploader, FilePreview, result panels, thumbnails, controls).
- Check grids collapse on mobile (tool grids, thumbnail grids, home sections).
- Fix anything found; keep visual design consistent with the design-system skill.

## 5. Branding

- Keep `favicon.svg`; add `apple-touch-icon` link + `theme-color` in `index.html`.

## Verification (Stage 4 done = all pass)

1. `npm run lint` — clean. `npm run build` — zero errors, and output now shows
   **multiple chunks** with the initial bundle well under ~500 kB gzip.
2. Re-run the image + PDF headless-Firefox suites to confirm lazy loading didn't
   break any tool (routes still load and process after code-splitting).
3. Spot-check pages in headless mode: unique `<title>` per route, `h1` present,
   skip link present, dark-mode toggle has an accessible name.
4. Report to user: 1) what changed, 2) files created/modified, 3) what key files do,
   4) how to test. Stop for approval before Stage 5.
