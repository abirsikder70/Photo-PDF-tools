import { useEffect, useState } from 'react'
import { degrees, PDFDocument } from 'pdf-lib'
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

const tool = tools.find((t) => t.slug === 'rotate')

export default function RotatePdf() {
  const { file, pdfDoc, numPages, error, setError, selectFiles } = usePdfFile()
  const thumbs = usePdfThumbnails(pdfDoc, numPages)
  const [rotations, setRotations] = useState({})
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState(null)

  useEffect(() => {
    setRotations({})
    setResult(null)
  }, [numPages])

  const thumbByPage = Object.fromEntries(thumbs.map((t) => [t.page, t.src]))
  const allAtZero = Object.values(rotations).every((deg) => deg % 360 === 0)

  function rotatePage(page, direction) {
    setRotations((prev) => ({
      ...prev,
      [page]: ((prev[page] || 0) + direction * 90 + 360) % 360,
    }))
    setResult(null)
  }

  function rotateAll(direction) {
    setRotations((prev) => {
      const next = {}
      for (let i = 1; i <= numPages; i++) {
        next[i] = ((prev[i] || 0) + direction * 90 + 360) % 360
      }
      return next
    })
    setResult(null)
  }

  async function save() {
    if (!file) return
    setLoading(true)
    setError('')
    try {
      const src = await PDFDocument.load(await file.arrayBuffer())
      src.getPages().forEach((page, index) => {
        const deg = rotations[index + 1] || 0
        if (deg) page.setRotation(degrees(deg))
      })
      const bytes = await src.save()
      setResult({
        blob: new Blob([bytes], { type: 'application/pdf' }),
        pageCount: numPages,
      })
    } catch {
      setError('Could not rotate this PDF. It may be password-protected or corrupted.')
    } finally {
      setLoading(false)
    }
  }

  const iconButtonClass =
    'focus-ring rounded-lg border border-slate-200 p-1.5 text-slate-500 transition-colors hover:bg-slate-50 dark:border-slate-700 dark:text-slate-400 dark:hover:bg-slate-800'

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
                onClick={save}
                disabled={loading}
                className="focus-ring inline-flex items-center justify-center gap-2 rounded-xl bg-primary-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-primary-700 disabled:opacity-60"
              >
                <Icon name="rotate" className="h-5 w-5" />
                Save rotated PDF
              </button>
              <button
                type="button"
                onClick={() => setRotations({})}
                disabled={allAtZero}
                className="focus-ring rounded-lg text-sm font-medium text-slate-500 underline-offset-2 hover:text-primary-600 hover:underline disabled:opacity-40 dark:text-slate-400"
              >
                Reset
              </button>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-slate-500 dark:text-slate-400">
                Rotate all
              </span>
              <button
                type="button"
                onClick={() => rotateAll(-1)}
                className={iconButtonClass}
                aria-label="Rotate all pages counter-clockwise"
              >
                <Icon name="rotate" className="h-4 w-4 -scale-x-100" />
              </button>
              <button
                type="button"
                onClick={() => rotateAll(1)}
                className={iconButtonClass}
                aria-label="Rotate all pages clockwise"
              >
                <Icon name="rotate" className="h-4 w-4" />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-5">
            {Array.from({ length: numPages }, (_, i) => i + 1).map((page) => {
              const deg = rotations[page] || 0
              return (
                <PageThumbnail
                  key={page}
                  page={page}
                  src={thumbByPage[page]}
                  style={{ transform: `rotate(${deg}deg)` }}
                  footer={
                    <div className="flex items-center justify-center gap-1">
                      <button
                        type="button"
                        onClick={() => rotatePage(page, -1)}
                        aria-label={`Rotate page ${page} counter-clockwise`}
                        className={iconButtonClass}
                      >
                        <Icon name="rotate" className="h-4 w-4 -scale-x-100" />
                      </button>
                      <span className="px-1 text-xs font-semibold text-slate-400">
                        {deg ? `${deg}°` : page}
                      </span>
                      <button
                        type="button"
                        onClick={() => rotatePage(page, 1)}
                        aria-label={`Rotate page ${page} clockwise`}
                        className={iconButtonClass}
                      >
                        <Icon name="rotate" className="h-4 w-4" />
                      </button>
                    </div>
                  }
                />
              )
            })}
          </div>

          {loading && <LoadingState message="Saving rotated PDF…" />}
          {error && <ErrorMessage message={error} onDismiss={() => setError('')} />}

          {result && (
            <PdfResultPanel
              blob={result.blob}
              fileName={`${baseName(file.name)}-rotated.pdf`}
              pageCount={result.pageCount}
              note="Your rotated PDF is ready to download."
            />
          )}
        </div>
      )}
    </ToolPageLayout>
  )
}
