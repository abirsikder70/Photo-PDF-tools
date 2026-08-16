# Photo-PDF Tools — Stage 1 Plan

An all-in-one Image and PDF tools website.

**Stack:** React + Vite + JavaScript + Tailwind CSS v4 + React Router
**Directory:** `/home/abir/Coding/Photo-PDF-tools`

---

## Decisions locked in

- Tailwind **v4** with `@tailwindcss/vite` plugin (no config file needed)
- Class-based **dark mode** toggle (light + dark)
- Homepage "Convert Image" card links to the **Image Tools page**
- All processing stays **in the browser** — no file uploads to any server
- Libraries reserved for Stage 2/3:
  - Images: `browser-image-compression` + native Canvas API
  - PDFs: `pdf-lib` (create/modify/merge/split/rotate/reorder/delete) + `pdfjs-dist` (render/preview/PDF→JPG)
- PDF compression will be **honest**: lossy rasterize-to-JPEG via pdfjs + rebuild with pdf-lib, documented on the page.

---

## Step 0: Skills (per user's skills.sh request)

Install `find-skills` from https://github.com/vercel-labs/skills, then install:
- `web-design-guidelines` (vercel-labs/agent-skills) — SaaS/UI quality standards
- `tailwind-design-system` (wshobson/agents) — Tailwind tokens and patterns

Ensure they land in `.opencode/skills/` so opencode can load them via the `skill` tool.

## Step 1: Project setup

- `npm create vite@latest . -- --template react` (plain JavaScript)
- `npm install`
- `npm install tailwindcss @tailwindcss/vite react-router-dom @fontsource-variable/inter`
- `vite.config.js` → add `@tailwindcss/vite` plugin
- `src/index.css` → `@import "tailwindcss";` + `@custom-variant dark` + `@theme` tokens (Indigo→Violet palette, Inter font)

## Step 2: Folder structure

```
src/
├─ main.jsx                 → entry point
├─ App.jsx                  → Router + routes + scroll restoration
├─ index.css                → Tailwind + theme + design tokens
├─ data/tools.js            → single source of truth for every tool
├─ hooks/useDarkMode.js     → light/dark toggle (localStorage + system preference)
├─ components/
│  ├─ layout/  Header.jsx · Footer.jsx · Layout.jsx
│  └─ ui/      ToolCard.jsx · FileUploader.jsx · FilePreview.jsx
│              DownloadButton.jsx · LoadingState.jsx · ErrorMessage.jsx
│              ToolPageLayout.jsx · Seo.jsx
└─ pages/
   ├─ Home.jsx · ImageTools.jsx · PdfTools.jsx · About.jsx · NotFound.jsx
   ├─ image/  9 files (compress, resize, crop, jpg-to-png, png-to-jpg, to-webp, from-webp, compare, rotate-flip)
   └─ pdf/    8 files (merge, split, compress, jpg-to-pdf, pdf-to-jpg, reorder, rotate, delete-pages)
```

## Routes

- `/` → Home
- `/image-tools` → Image Tools listing (9 tools)
- `/pdf-tools` → PDF Tools listing (8 tools)
- `/about` → About
- `/image/<slug>` → each image tool (placeholder in Stage 1)
- `/pdf/<slug>` → each PDF tool (placeholder in Stage 1)
- `*` → NotFound

## Step 3: Pages & components

- **Header** — sticky, logo, nav (Home / Image Tools / PDF Tools / About), dark-mode toggle, mobile hamburger menu.
- **Footer** — quick links, tool categories, privacy note, copyright.
- **Homepage** — hero ("Photo-PDF Tools" + "All Your Image & PDF Tools in One Place", 2 CTAs, trust badges), Image Tools section (6 cards), PDF Tools section (8 cards), "Why Photo-PDF Tools" privacy section, CTA banner.
- **Image Tools / PDF Tools pages** — header + grid of all tool cards.
- **Tool pages** — render `ToolPageLayout` with an honest "under development – coming in Stage 2/3" panel. No fake buttons.
- **Reusable UI** — `FileUploader` (drag-drop + browse + validation), `FilePreview`, `DownloadButton`, `LoadingState`, `ErrorMessage`, `ToolCard`, `Seo` (per-page title + meta description).

## Verification (Stage 1 done = all pass)

1. `npm run dev` — homepage hero, both tool grids, all 17 tool routes, nav + mobile menu, dark toggle, About, NotFound all render.
2. `npm run build` — completes with zero errors.

Then report to user: 1) what changed, 2) files created, 3) what key files do, 4) how to test. Stop for approval before Stage 2.
