/**
 * pdf.js — browser-side PDF helpers built on pdfjs-dist (rendering) and
 * used together with pdf-lib (writing). Everything runs locally.
 */
import * as pdfjsLib from 'pdfjs-dist'
import workerUrl from 'pdfjs-dist/build/pdf.worker.min.mjs?url'

pdfjsLib.GlobalWorkerOptions.workerSrc = workerUrl

/** Open a PDF from its bytes (Uint8Array) with pdf.js. */
export function loadPdfDocument(bytes) {
  return pdfjsLib.getDocument({ data: bytes }).promise
}

/** Render one page of a pdf.js document to a canvas. */
export async function renderPageToCanvas(pdfDoc, pageNumber, scale = 1) {
  const page = await pdfDoc.getPage(pageNumber)
  const viewport = page.getViewport({ scale })
  const canvas = document.createElement('canvas')
  canvas.width = Math.max(1, Math.floor(viewport.width))
  canvas.height = Math.max(1, Math.floor(viewport.height))
  const ctx = canvas.getContext('2d')
  await page.render({ canvasContext: ctx, viewport }).promise
  return canvas
}

/** Render a small thumbnail (data URL) of a page. */
export async function renderThumbnail(pdfDoc, pageNumber, scale = 0.25) {
  const canvas = await renderPageToCanvas(pdfDoc, pageNumber, scale)
  return canvas.toDataURL('image/jpeg', 0.7)
}

/**
 * Parse a page-range string like "1-3,5,8-10" into a sorted, unique,
 * in-range array of 1-based page numbers.
 */
export function parsePageRanges(input, numPages) {
  const seen = new Set()
  const parts = String(input ?? '')
    .split(',')
    .map((p) => p.trim())

  for (const part of parts) {
    if (!part) continue
    if (part.includes('-')) {
      const [a, b] = part.split('-').map(Number)
      if (!Number.isFinite(a) || !Number.isFinite(b)) continue
      const start = Math.min(a, b)
      const end = Math.max(a, b)
      for (let i = start; i <= end; i++) {
        if (i >= 1 && i <= numPages) seen.add(i)
      }
    } else {
      const n = Number(part)
      if (Number.isFinite(n) && n >= 1 && n <= numPages) seen.add(n)
    }
  }
  return [...seen].sort((a, b) => a - b)
}
