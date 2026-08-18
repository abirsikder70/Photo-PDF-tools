import { useState } from 'react'
import { PDFDocument } from 'pdf-lib'
import { tools } from '../../data/tools'
import ToolPageLayout from '../../components/ui/ToolPageLayout'
import FileUploader from '../../components/ui/FileUploader'
import FilePreview from '../../components/ui/FilePreview'
import PdfResultPanel from '../../components/ui/PdfResultPanel'
import ProgressBar from '../../components/ui/ProgressBar'
import ErrorMessage from '../../components/ui/ErrorMessage'
import { Icon } from '../../components/ui/Icons'
import { usePdfFile } from '../../hooks/usePdfFile'
import { renderPageToCanvas } from '../../utils/pdf'
import { canvasToBlob } from '../../utils/image'

const tool = tools.find((t) => t.slug === 'compress' && t.category === 'pdf')

const scaleOptions = [
  { label: '0.5× (very small)', value: 0.5 },
  { label: '1×', value: 1 },
  { label: '1.5×', value: 1.5 },
  { label: '2× (best quality)', value: 2 },
]

export default function CompressPdf() {
  const { file, pdfDoc, numPages, error, setError, selectFiles } = usePdfFile()
  const [quality, setQuality] = useState(0.6)
  const [scale, setScale] = useState(1)
  const [loading, setLoading] = useState(false)
  const [progress, setProgress] = useState({ current: 0, total: 0 })
  const [result, setResult] = useState(null)

  async function compress() {
    if (!file || !pdfDoc) return
    setLoading(true)
    setError('')
    setResult(null)
    setProgress({ current: 0, total: numPages })
    try {
      const out = await PDFDocument.create()
      for (let i = 1; i <= numPages; i++) {
        setProgress({ current: i, total: numPages })
        const viewport = await pdfDoc.getPage(i).then((p) => p.getViewport({ scale }))
        const canvas = await renderPageToCanvas(pdfDoc, i, scale)
        const jpeg = await canvasToBlob(canvas, 'image/jpeg', quality)
        const img = await out.embedJpg(await jpeg.arrayBuffer())
        const page = out.addPage([viewport.width, viewport.height])
        page.drawImage(img, {
          x: 0,
          y: 0,
          width: viewport.width,
          height: viewport.height,
        })
      }
      const bytes = await out.save()
      setResult({
        blob: new Blob([bytes], { type: 'application/pdf' }),
        pageCount: numPages,
      })
    } catch {
      setError(
        'Compression failed. The PDF may be password-protected, corrupted, or too large for the browser.',
      )
    } finally {
      setLoading(false)
      setProgress({ current: 0, total: 0 })
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

          <div className="card p-5">
            <div className="flex items-start gap-3 rounded-xl border border-amber-200/70 bg-amber-50/60 px-4 py-3 text-sm leading-relaxed text-amber-800 dark:border-amber-500/15 dark:bg-amber-500/5 dark:text-amber-300">
              <Icon name="info" className="mt-0.5 h-5 w-5 shrink-0" />
              <p>
                PDF compression is lossy: every page is re-rendered as a JPEG image and
                rebuilt into a new PDF. Text will no longer be selectable. Lower
                resolution and quality mean a smaller file.
              </p>
            </div>

            <div className="mt-5 grid gap-5 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="pdf-quality"
                  className="field-label flex items-center justify-between"
                >
                  <span>Image quality</span>
                  <span className="chip-value">
                    {Math.round(quality * 100)}%
                  </span>
                </label>
                <input
                  id="pdf-quality"
                  type="range"
                  min="0.1"
                  max="1"
                  step="0.01"
                  value={quality}
                  onChange={(e) => setQuality(Number(e.target.value))}
                  className="mt-3 w-full accent-primary-600"
                  aria-label="PDF image quality"
                />
              </div>

              <div>
                <span className="field-label">
                  Page resolution
                </span>
                <div className="mt-3 grid grid-cols-2 gap-2">
                  {scaleOptions.map((opt) => (
                    <button
                      key={opt.value}
                      type="button"
                      onClick={() => setScale(opt.value)}
                      className={`rounded-lg px-3 py-2 text-xs font-medium transition-colors ${
                        scale === opt.value
                          ? 'choice-on'
                          : 'choice-off'
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={compress}
              disabled={loading}
              className="btn-primary mt-6"
            >
              Compress PDF
            </button>
          </div>

          {loading && (
            <ProgressBar
              value={progress.current}
              max={progress.total}
              label="Compressing pages"
            />
          )}
          {error && <ErrorMessage message={error} onDismiss={() => setError('')} />}

          {result && (
            <PdfResultPanel
              blob={result.blob}
              fileName="compressed.pdf"
              pageCount={result.pageCount}
              originalSize={file.size}
              note="Your compressed PDF is ready to download. Remember it is a rasterized (image) PDF."
            />
          )}
        </div>
      )}
    </ToolPageLayout>
  )
}
