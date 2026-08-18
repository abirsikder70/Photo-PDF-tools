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
import { Icon } from '../../components/ui/Icons'
import { usePdfFile } from '../../hooks/usePdfFile'
import { usePdfThumbnails } from '../../hooks/usePdfThumbnails'
import { baseName } from '../../utils/format'

const tool = tools.find((t) => t.slug === 'delete-pages')

export default function DeletePdfPages() {
  const { file, pdfDoc, numPages, error, setError, selectFiles } = usePdfFile()
  const thumbs = usePdfThumbnails(pdfDoc, numPages)
  const [selected, setSelected] = useState(new Set())
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState(null)

  useEffect(() => {
    setSelected(new Set())
    setResult(null)
  }, [numPages])

  const thumbByPage = Object.fromEntries(thumbs.map((t) => [t.page, t.src]))

  function toggle(page) {
    setSelected((prev) => {
      const next = new Set(prev)
      if (next.has(page)) next.delete(page)
      else next.add(page)
      return next
    })
    setResult(null)
  }

  function toggleAll() {
    if (selected.size === numPages) setSelected(new Set())
    else setSelected(new Set(Array.from({ length: numPages }, (_, i) => i + 1)))
    setResult(null)
  }

  async function remove() {
    if (selected.size === 0) {
      setError('Select at least one page to delete.')
      return
    }
    if (selected.size === numPages) {
      setError('You cannot delete every page.')
      return
    }
    setLoading(true)
    setError('')
    try {
      const src = await PDFDocument.load(await file.arrayBuffer())
      const out = await PDFDocument.create()
      const keepIndices = Array.from(
        { length: numPages },
        (_, i) => i + 1,
      )
        .filter((p) => !selected.has(p))
        .map((p) => p - 1)
      const pages = await out.copyPages(src, keepIndices)
      pages.forEach((page) => out.addPage(page))
      const bytes = await out.save()
      setResult({
        blob: new Blob([bytes], { type: 'application/pdf' }),
        pageCount: keepIndices.length,
      })
    } catch {
      setError('Could not delete pages. The PDF may be password-protected or corrupted.')
    } finally {
      setLoading(false)
    }
  }

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

          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={remove}
                disabled={loading}
                className="focus-ring inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-red-600 px-5 text-sm font-semibold text-white shadow-lg shadow-red-600/25 outline-none transition-all duration-200 hover:bg-red-500 active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-500 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none dark:bg-red-600 dark:hover:bg-red-500"
              >
                <Icon name="trash" className="h-4 w-4" />
                Delete selected ({selected.size})
              </button>
              <button
                type="button"
                onClick={toggleAll}
                className="focus-ring rounded-lg text-sm font-medium text-slate-500 underline-offset-4 transition-colors hover:text-primary-600 hover:underline dark:text-slate-400"
              >
                {selected.size === numPages ? 'Clear selection' : 'Select all'}
              </button>
            </div>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Tap pages to mark them for deletion.
            </p>
          </div>

          <div className="grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-5">
            {Array.from({ length: numPages }, (_, i) => i + 1).map((page) => {
              const isSelected = selected.has(page)
              return (
                <PageThumbnail
                  key={page}
                  page={page}
                  src={thumbByPage[page]}
                  onClick={() => toggle(page)}
                  selected={isSelected}
                  className="cursor-pointer"
                  footer={
                    <div className="flex items-center justify-center gap-1.5">
                      {isSelected ? (
                        <span className="inline-flex items-center gap-1 rounded-full border border-red-200/70 bg-red-50 px-2 py-0.5 text-[11px] font-semibold text-red-700 dark:border-red-900/50 dark:bg-red-950/30 dark:text-red-400">
                          <Icon name="trash" className="h-3 w-3" />
                          delete
                        </span>
                      ) : (
                        <span className="text-xs font-semibold text-slate-400">{page}</span>
                      )}
                    </div>
                  }
                />
              )
            })}
          </div>

          {loading && <LoadingState message="Removing selected pages…" />}
          {error && <ErrorMessage message={error} onDismiss={() => setError('')} />}

          {result && (
            <PdfResultPanel
              blob={result.blob}
              fileName={`${baseName(file.name)}-trimmed.pdf`}
              pageCount={result.pageCount}
              note={`Removed ${selected.size} page${selected.size === 1 ? '' : 's'}. Your new PDF is ready.`}
            />
          )}
        </div>
      )}
    </ToolPageLayout>
  )
}
