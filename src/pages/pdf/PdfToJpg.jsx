import { useEffect, useState } from 'react'
import { tools } from '../../data/tools'
import ToolPageLayout from '../../components/ui/ToolPageLayout'
import FileUploader from '../../components/ui/FileUploader'
import FilePreview from '../../components/ui/FilePreview'
import ProgressBar from '../../components/ui/ProgressBar'
import ErrorMessage from '../../components/ui/ErrorMessage'
import DownloadButton from '../../components/ui/DownloadButton'
import { Icon } from '../../components/ui/Icons'
import { usePdfFile } from '../../hooks/usePdfFile'
import { renderPageToCanvas } from '../../utils/pdf'
import { canvasToBlob } from '../../utils/image'
import { createZip } from '../../utils/zip'
import { baseName, formatBytes } from '../../utils/format'

const tool = tools.find((t) => t.slug === 'pdf-to-jpg')

const scaleOptions = [
  { label: '1×', value: 1 },
  { label: '1.5×', value: 1.5 },
  { label: '2×', value: 2 },
  { label: '3× (high res)', value: 3 },
]

export default function PdfToJpg() {
  const { file, pdfDoc, numPages, error, setError, selectFiles } = usePdfFile()
  const [scale, setScale] = useState(2)
  const [quality, setQuality] = useState(0.9)
  const [loading, setLoading] = useState(false)
  const [progress, setProgress] = useState({ current: 0, total: 0 })
  const [results, setResults] = useState([])
  const [zip, setZip] = useState(null)

  useEffect(() => {
    return () => {
      results.forEach((r) => r.url && URL.revokeObjectURL(r.url))
      if (zip?.url) URL.revokeObjectURL(zip.url)
    }
  }, [results, zip])

  useEffect(() => {
    setResults([])
    setZip(null)
  }, [pdfDoc])

  async function convert() {
    if (!file || !pdfDoc) return
    setLoading(true)
    setError('')
    setProgress({ current: 0, total: numPages })
    try {
      const blobs = []
      for (let i = 1; i <= numPages; i++) {
        setProgress({ current: i, total: numPages })
        const canvas = await renderPageToCanvas(pdfDoc, i, scale)
        const blob = await canvasToBlob(canvas, 'image/jpeg', quality)
        blobs.push({ page: i, blob })
      }
      setResults(
        blobs.map((item) => ({ ...item, url: URL.createObjectURL(item.blob) })),
      )
    } catch {
      setError('Conversion failed. The PDF may be password-protected or corrupted.')
    } finally {
      setLoading(false)
      setProgress({ current: 0, total: 0 })
    }
  }

  async function downloadAll() {
    if (results.length === 0) return
    const zipBlob = await createZip(
      results.map((r) => ({ name: `page-${r.page}.jpg`, data: r.blob })),
    )
    setZip({
      url: URL.createObjectURL(zipBlob),
      name: `${baseName(file.name)}-images.zip`,
      size: zipBlob.size,
    })
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
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <span className="field-label">
                  Output resolution
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

              <div>
                <label
                  htmlFor="pj-quality"
                  className="field-label flex items-center justify-between"
                >
                  <span>JPG quality</span>
                  <span className="chip-value">
                    {Math.round(quality * 100)}%
                  </span>
                </label>
                <input
                  id="pj-quality"
                  type="range"
                  min="0.1"
                  max="1"
                  step="0.01"
                  value={quality}
                  onChange={(e) => setQuality(Number(e.target.value))}
                  className="mt-3 w-full accent-primary-600"
                  aria-label="JPG quality"
                />
              </div>
            </div>

            <button
              type="button"
              onClick={convert}
              disabled={loading}
              className="btn-primary mt-6"
            >
              Convert to JPG
            </button>
          </div>

          {loading && (
            <ProgressBar value={progress.current} max={progress.total} label="Converting pages" />
          )}
          {error && <ErrorMessage message={error} onDismiss={() => setError('')} />}

          {results.length > 0 && (
            <section aria-label="Converted images" className="space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <h2 className="text-[15px] font-semibold tracking-tight">
                  {results.length} image{results.length === 1 ? '' : 's'} ready
                </h2>
                <button
                  type="button"
                  onClick={downloadAll}
                  className="btn-primary-sm"
                >
                  <Icon name="download" className="h-4 w-4" />
                  Download all (ZIP)
                </button>
              </div>

              {zip && (
                <div className="card flex items-center gap-3 px-4 py-3.5 text-sm">
                  <Icon name="file" className="h-5 w-5 shrink-0 text-primary-600 dark:text-primary-400" />
                  <span className="text-slate-500 dark:text-slate-400">
                    ZIP ready — <span className="font-semibold tabular-nums text-slate-700 dark:text-slate-200">{formatBytes(zip.size)}</span>
                  </span>
                  <span className="ml-auto">
                    <DownloadButton href={zip.url} fileName={zip.name} label="Download ZIP" />
                  </span>
                </div>
              )}

              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
                {results.map((item) => (
                  <div
                    key={item.page}
                    className="group overflow-hidden rounded-xl border border-slate-200/80 bg-white shadow-card transition-all duration-200 hover:border-slate-300 hover:shadow-lift dark:border-slate-800 dark:bg-slate-900 dark:hover:border-slate-700"
                  >
                    <img
                      src={item.url}
                      alt={`Page ${item.page}`}
                      className="w-full object-contain"
                    />
                    <div className="flex items-center justify-between gap-2 border-t border-slate-200/80 px-3 py-2 dark:border-slate-800">
                      <span className="text-xs font-medium tabular-nums text-slate-500 dark:text-slate-400">
                        Page {item.page}
                      </span>
                      <DownloadButton
                        href={item.url}
                        fileName={`${baseName(file.name)}-page-${item.page}.jpg`}
                        label="Save"
                        small
                      />
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      )}
    </ToolPageLayout>
  )
}
