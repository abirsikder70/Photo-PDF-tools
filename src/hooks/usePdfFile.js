import { useCallback, useState } from 'react'
import { loadPdfDocument } from '../utils/pdf'

/**
 * usePdfFile — shared state for tools that process a single PDF.
 *
 * Returns:
 *  - file        the selected File (or null)
 *  - pdfDoc      the opened pdf.js document (for rendering thumbnails/pages)
 *  - numPages    total page count
 *  - error       error message (or '')
 *  - setError    clear/set the error manually
 *  - selectFiles pass straight into <FileUploader onFiles={...}>
 */
export function usePdfFile() {
  const [file, setFile] = useState(null)
  const [pdfDoc, setPdfDoc] = useState(null)
  const [numPages, setNumPages] = useState(0)
  const [error, setError] = useState('')

  const selectFiles = useCallback(async (files) => {
    const selected = files && files[0]
    if (!selected) return

    const isPdf =
      selected.type === 'application/pdf' ||
      selected.name.toLowerCase().endsWith('.pdf')
    if (!isPdf) {
      setError('Please choose a valid PDF file.')
      return
    }

    setError('')
    try {
      // Keep a separate copy for pdf.js: it may take ownership of the bytes.
      const bytes = await selected.arrayBuffer()
      const doc = await loadPdfDocument(new Uint8Array(bytes.slice(0)))
      setFile(selected)
      setPdfDoc(doc)
      setNumPages(doc.numPages)
    } catch {
      setError(
        'Could not open this PDF. It may be password-protected or corrupted.',
      )
    }
  }, [])

  return { file, pdfDoc, numPages, error, setError, selectFiles }
}
