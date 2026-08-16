# Photo-PDF Tools — Stage 3 Plan: Implement all PDF Tools

**Goal:** Every PDF tool page becomes fully functional — real processing with page
previews/thumbnails, selection/reordering, downloads, loading/progress and clear errors.
All processing stays in the browser.

## Libraries (to install)

- **pdf-lib** — create/modify PDFs: merge, split, extract, reorder, rotate, delete pages,
  embed images (JPG→PDF), rebuild compressed PDFs.
- **pdfjs-dist** — render PDF pages to canvas: thumbnails, previews, PDF→JPG, and the
  rasterize step for PDF compression.
- **jszip** — zip downloads (PDF→JPG "download all", Split "single pages").

## New shared files

| File | Purpose |
| --- | --- |
| `src/utils/pdf.js` | pdfjs worker setup + load doc, render page to canvas, thumbnail, range-parsing helpers |
| `src/utils/zip.js` | `createZip` wrapper around JSZip |
| `src/hooks/usePdfFile.js` | upload + validate + load pdfjs document, exposes `file, pdfDoc, numPages, error` |
| `src/hooks/usePdfThumbnails.js` | async thumbnail rendering for a pdfjs doc |
| `src/components/ui/PageThumbnail.jsx` | reusable page card (image + page number + selection ring + footer) |
| `src/components/ui/PdfResultPanel.jsx` | result block for PDFs: name, pages, size, savings, download |

## Tools (all in `src/pages/pdf/`)

1. **MergePdf** — upload multiple PDFs, reorder/remove in list, page counts shown, merge via `copyPages`.
2. **SplitPdf** — range input ("1-3,5,8-10") or click thumbnails; "Extract to new PDF" + "Split into single pages" (zip).
3. **CompressPdf** — **honest lossy**: pdfjs renders each page → JPEG at quality/scale → pdf-lib rebuilds PDF. Progress per page, warning about quality loss.
4. **JpgToPdf** — upload multiple images, preview + order + remove, page size (Original / A4), `embedJpg`/`embedPng`.
5. **PdfToJpg** — render pages at chosen scale + quality, per-page download + "Download all (ZIP)".
6. **ReorderPdf** — thumbnails with drag-and-drop + up/down buttons, `copyPages` in new order.
7. **RotatePdf** — thumbnails with per-page rotate + "rotate all", apply via `setRotation`.
8. **DeletePdfPages** — click thumbnails to mark for deletion, apply by copying remaining pages.

## Behavior requirements

- Accept only `.pdf` (or images for JPG→PDF); drag-drop + click-to-browse upload
- Loading/progress states; clear error messages (incl. password-protected PDFs)
- Page thumbnails/previews where appropriate; selection/reordering where appropriate
- Download processed PDF (or zip) with original-vs-result size comparison where relevant
- Honest privacy note is already shown by `ToolPageLayout`

## Verification

1. `npm run lint` clean, `npm run build` clean.
2. Headless-Firefox test: upload a generated multi-page PDF to every tool, run the action,
   assert result + download + zero console errors. Also test JPG→PDF with a PNG.
   (Reuse the /tmp/opencode/webtest harness; generate test PDF with pdf-lib in Node.)
