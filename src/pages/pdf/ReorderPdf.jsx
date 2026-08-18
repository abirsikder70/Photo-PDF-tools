import { useEffect, useRef, useState } from 'react'
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

const tool = tools.find((t) => t.slug === 'reorder')

export default function ReorderPdf() {
  const { file, pdfDoc, numPages, error, setError, selectFiles } = usePdfFile()
  const thumbs = usePdfThumbnails(pdfDoc, numPages)
  const [order, setOrder] = useState([])
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState(null)
  const dragIndex = useRef(null)

  useEffect(() => {
    setOrder(Array.from({ length: numPages }, (_, i) => i + 1))
    setResult(null)
  }, [numPages])

  const thumbByPage = Object.fromEntries(thumbs.map((t) => [t.page, t.src]))

  function move(index, direction) {
    setOrder((prev) => {
      const next = [...prev]
      const target = index + direction
      if (target < 0 || target >= next.length) return prev
      ;[next[index], next[target]] = [next[target], next[index]]
      return next
    })
    setResult(null)
  }

  function onDrop(targetIndex) {
    const from = dragIndex.current
    dragIndex.current = null
    if (from === null || from === targetIndex) return
    setOrder((prev) => {
      const next = [...prev]
      const [item] = next.splice(from, 1)
      next.splice(targetIndex, 0, item)
      return next
    })
    setResult(null)
  }

  async function reorder() {
    if (!file) return
    setLoading(true)
    setError('')
    try {
      const src = await PDFDocument.load(await file.arrayBuffer())
      const out = await PDFDocument.create()
      const pages = await out.copyPages(src, order.map((p) => p - 1))
      pages.forEach((page) => out.addPage(page))
      const bytes = await out.save()
      setResult({
        blob: new Blob([bytes], { type: 'application/pdf' }),
        pageCount: numPages,
      })
    } catch {
      setError('Could not reorder this PDF. It may be password-protected or corrupted.')
    } finally {
      setLoading(false)
    }
  }

  const actionButtonClass =
    'icon-btn-xs'

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
                onClick={reorder}
                disabled={loading}
                className="btn-primary"
              >
                <Icon name="reorder" className="h-4 w-4" />
                Reorder PDF
              </button>
              <button
                type="button"
                onClick={() => setOrder(Array.from({ length: numPages }, (_, i) => i + 1))}
                className="focus-ring rounded-lg text-sm font-medium text-slate-500 underline-offset-4 transition-colors hover:text-primary-600 hover:underline dark:text-slate-400"
              >
                Reset order
              </button>
            </div>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Drag pages or use the arrows.
            </p>
          </div>

          <div className="grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-5">
            {order.map((page, index) => (
              <PageThumbnail
                key={page}
                page={page}
                src={thumbByPage[page]}
                draggable
                onDragStart={() => {
                  dragIndex.current = index
                }}
                onDragOver={(e) => e.preventDefault()}
                onDrop={() => onDrop(index)}
                footer={
                  <div className="flex items-center justify-center gap-1">
                    <button
                      type="button"
                      onClick={() => move(index, -1)}
                      disabled={index === 0}
                      aria-label={`Move page ${page} up`}
                      className={actionButtonClass}
                    >
                      <Icon name="chevronRight" className="h-4 w-4 -rotate-90" />
                    </button>
                    <span className="px-1 text-xs font-semibold text-slate-400">
                      {index + 1}
                    </span>
                    <button
                      type="button"
                      onClick={() => move(index, 1)}
                      disabled={index === order.length - 1}
                      aria-label={`Move page ${page} down`}
                      className={actionButtonClass}
                    >
                      <Icon name="chevronRight" className="h-4 w-4 rotate-90" />
                    </button>
                  </div>
                }
              />
            ))}
          </div>

          {loading && <LoadingState message="Reordering your PDF…" />}
          {error && <ErrorMessage message={error} onDismiss={() => setError('')} />}

          {result && (
            <PdfResultPanel
              blob={result.blob}
              fileName={`${baseName(file.name)}-reordered.pdf`}
              pageCount={result.pageCount}
              note="Your reordered PDF is ready to download."
            />
          )}
        </div>
      )}
    </ToolPageLayout>
  )
}
