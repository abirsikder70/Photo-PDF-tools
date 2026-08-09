import { useEffect, useState } from 'react'
import { renderThumbnail } from '../utils/pdf'

/**
 * usePdfThumbnails — renders a small thumbnail for every page of a
 * pdf.js document. Returns an array of { page, src } in page order.
 */
export function usePdfThumbnails(pdfDoc, numPages, scale = 0.25) {
  const [thumbs, setThumbs] = useState([])

  useEffect(() => {
    if (!pdfDoc) {
      setThumbs([])
      return
    }

    let cancelled = false
    const initial = Array.from({ length: numPages }, (_, i) => ({
      page: i + 1,
      src: '',
    }))
    setThumbs(initial)

    initial.forEach((item) => {
      renderThumbnail(pdfDoc, item.page, scale)
        .then((src) => {
          if (!cancelled) {
            setThumbs((prev) =>
              prev.map((t) => (t.page === item.page ? { ...t, src } : t)),
            )
          }
        })
        .catch(() => {
          /* a page that fails to render stays as a spinner */
        })
    })

    return () => {
      cancelled = true
    }
  }, [pdfDoc, numPages, scale])

  return thumbs
}
