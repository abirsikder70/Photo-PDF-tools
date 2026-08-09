# PixelTools

An all-in-one Image and PDF tools website. Free, private and fast — every file is
processed locally in your browser and never uploaded to a server.

## Tech Stack

- [React 19](https://react.dev) + [Vite](https://vite.dev)
- [Tailwind CSS v4](https://tailwindcss.com) (CSS-first config in `src/index.css`)
- [React Router v7](https://reactrouter.com)

## Getting Started

```bash
npm install
npm run dev      # start the dev server at http://localhost:5173
npm run build    # production build (outputs to dist/)
npm run preview  # preview the production build
npm run lint     # run oxlint
```

## Project Structure

```
src/
├─ main.jsx              → entry point (wraps the app in BrowserRouter)
├─ App.jsx               → all routes
├─ index.css             → Tailwind + theme tokens + dark mode
├─ data/tools.js         → single source of truth for every tool
├─ hooks/useDarkMode.js  → light/dark theme toggle
├─ components/
│  ├─ layout/            → Header, Footer, Layout, ScrollToTop
│  └─ ui/                → reusable UI: ToolCard, FileUploader, FilePreview,
│                          DownloadButton, LoadingState, ErrorMessage,
│                          ToolPageLayout, Seo, Icons, Logo, ComingSoon
└─ pages/
   ├─ Home.jsx · ImageTools.jsx · PdfTools.jsx · About.jsx · NotFound.jsx
   ├─ image/             → one page per image tool (9)
   └─ pdf/               → one page per PDF tool (8)
```

## Privacy

All processing happens locally in the browser using open-source libraries. Files are
never uploaded to any server.

## Roadmap (Staged Build)

- Stage 1 (done): project setup, design system, layout, homepage, tool listing pages, routing
- Stage 2 (done): all 9 image tools implemented (compress, resize, crop, JPG↔PNG↔WebP,
  compare, rotate/flip) using the native Canvas API + react-easy-crop
- Stage 3: implement all PDF tools (pdf-lib + pdfjs-dist)
- Stage 4: responsive polish
- Stage 5: test every tool and fix bugs
- Stage 6: production build + fixes
