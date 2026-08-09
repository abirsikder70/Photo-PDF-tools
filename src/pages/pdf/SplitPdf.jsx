import { useEffect, useState } from 'react'
import { PDFDocument } from 'pdf-lib'
import { tools } from '../../data/tools'
import ToolPageLayout from '../../components/ui/ToolPageLayout'
import FileUploader from '../../components/ui/FileUploader'
import FilePreview from '../../components/ui/FilePreview'
import PageThumbnail from '../../components/ui/PageThumbnail'
import PdfResultPanel from '../../components/ui/PdfResultPanel'
import LoadingState from '../../components/ui/LoadingState'
import ErrorMessage from '../../components/ui/ErrorMessage'
import { usePdfFile } from '../../hooks/usePdfFile'
import { usePdfThumbnails } from '../../hooks/usePdfThumbnails'
import { parsePageRanges } from '../../utils/pdf'
import { createZip } from '../../utils/zip'
import { baseName } from '../../utils/format'

const tool = tools.find((t) => t.slug === 'split')

export default function SplitPdf() {
  const { file, pdfDoc, numPages, error, setError, selectFiles } = usePdfFile()
  const thumbs = usePdfThumbnails(pdfDoc, numPages)
  const [selected, setSelected] = useState(new Set())
  const [rangeInput, setRangeInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState(null)

  useEffect(() => {
    setSelected(new Set())
    setRangeInput('')
    setResult(null)
  }, [pdfDoc])

  function togglePage(page) {
    setSelected((prev) => {
      const next = new Set(prev)
      if (next.has(page)) next.delete(page)
      else next.add(page)
      return next
    })
  }

  const pageNums = rangeInput.trim()
    ? parsePageRanges(rangeInput, numPages)
    : [...selected].sort((a, b) => a - b)

  async function extract() {
    if (!file) return
    if (pageNums.length === 0) {
      setError('Select some pages (or enter a range) to extract first.')
      return
    }
    setLoading(true)
    setError('')
    try {
      const src = await PDFDocument.load(await file.arrayBuffer())
      const out = await PDFDocument.create()
      const pages = await out.copyPages(src, pageNums.map((p) => p - 1))
      pages.forEach((page) => out.addPage(page))
      const bytes = await out.save()
      setResult({
        blob: new Blob([bytes], { type: 'application/pdf' }),
        pageCount: pages.length,
      })
    } catch {
      setError('Could not split this PDF. It may be password-protected or corrupted.')
    } finally {
      setLoading(false)
    }
  }

  async function splitIntoPages() {
    if (!file) return
    setLoading(true)
    setError('')
    try {
      const src = await PDFDocument.load(await file.arrayBuffer())
      const zipFiles = []
      for (let p = 1; p <= numPages; p++) {
        const out = await PDFDocument.create()
        const [page] = await out.copyPages(src, [p - 1])
        out.addPage(page)
        const bytes = await out.save()
        zipFiles.push({ name: `page-${p}.pdf`, data: bytes })
      }
      const blob = await createZip(zipFiles)
      setResult({ blob, pageCount: numPages, isZip: true })
    } catch {
      setError('Could not split this PDF. It may be password-protected or corrupted.')
    } finally {
      setLoading(false)
    }
  }

  const inputClass =
    'focus-ring w-full rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm text-slate-800 placeholder:text-slate-400 dark:border-slate-700 dark:bg-slate-900 dark:text-white'

  return (
    <ToolPageLayout tool={tool}>
      {!file ? (
        <FileUploader
          accept=".pdf,application/pdf"
          onFiles={selectFiles}
          title="Drop a PDF here"
          hint="or click to browse"
        />
      ) : (
        <div className="space-y-6">
          <FilePreview file={file} label="PDF" />

          <div className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
            <label
              htmlFor="split-range"
              className="block text-sm font-medium text-slate-700 dark:text-slate-300"
            >
              Page range (e.g. 1-3,5,8-10)
            </label>
            <input
              id="split-range"
              type="text"
              value={rangeInput}
              onChange={(e) => setRangeInput(e.target.value)}
              placeholder={`1-${numPages}`}
              className={`${inputClass} mt-1.5`}
            />

            <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <button
                type="button"
                onClick={extract}
                disabled={loading}
                className="focus-ring rounded-xl bg-primary-600 px-4 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-primary-700 disabled:opacity-60"
              >
                Extract to new PDF ({pageNums.length})
              </button>
              <button
                type="button"
                onClick={splitIntoPages}
                disabled={loading}
                className="focus-ring rounded-xl border border-slate-300 px-4 py-3 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-50 dark:border-slate-600 dark:text-slate-300 dark:hover:bg-slate-800 disabled:opacity-60"
              >
                Split into single pages (ZIP)
              </button>
            </div>
            <p className="mt-3 text-xs text-slate-500 dark:text-slate-400">
              Tip: click pages below to select them, or type a range above.
            </p>
          </div>

          <div>
            <h2 className="mb-3 text-base font-semibold">
              Pages ({selected.size} selected)
            </h2>
            <div className="grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-5">
              {thumbs.map((t) => (
                <PageThumbnail
                  key={t.page}
                  page={t.page}
                  src={t.src}
                  selected={selected.has(t.page)}
                  onClick={() => togglePage(t.page)}
                />
              ))}
            </div>
          </div>

          {loading && <LoadingState message="Splitting your PDF…" />}
          {error && <ErrorMessage message={error} onDismiss={() => setError('')} />}

          {result && (
            <PdfResultPanel
              blob={result.blob}
              fileName={
                result.isZip
                  ? `${baseName(file.name)}-pages.zip`
                  : `${baseName(file.name)}-extracted.pdf`
              }
              pageCount={result.pageCount}
              note={
                result.isZip
                  ? 'Each page was saved as its own PDF inside the ZIP.'
                  : 'Your extracted PDF is ready to download.'
              }
            />
          )}
        </div>
      )}
    </ToolPageLayout>
  )
}
