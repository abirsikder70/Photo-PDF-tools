import { useState } from 'react'
import { tools } from '../../data/tools'
import ToolPageLayout from '../../components/ui/ToolPageLayout'
import FileUploader from '../../components/ui/FileUploader'
import FilePreview from '../../components/ui/FilePreview'
import ToolResultPanel from '../../components/ui/ToolResultPanel'
import LoadingState from '../../components/ui/LoadingState'
import ErrorMessage from '../../components/ui/ErrorMessage'
import { useImageUpload } from '../../hooks/useImageUpload'
import { loadImageFromFile, drawImageToCanvas, canvasToBlob } from '../../utils/image'
import { baseName } from '../../utils/format'

const tool = tools.find((t) => t.slug === 'from-webp')

export default function FromWebp() {
  const { file, dimensions, error, setError, selectFiles } = useImageUpload()
  const [format, setFormat] = useState('jpg')
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState(null)

  async function convert() {
    if (!file) return
    setLoading(true)
    setError('')
    try {
      const img = await loadImageFromFile(file)
      const canvas = drawImageToCanvas(
        img,
        img.width,
        img.height,
        format === 'jpg' ? '#ffffff' : undefined,
      )
      const blob = await canvasToBlob(
        canvas,
        format === 'png' ? 'image/png' : 'image/jpeg',
        0.92,
      )
      setResult({ blob, width: img.width, height: img.height })
    } catch (err) {
      setError(err.message || 'Conversion failed. Please try a different image.')
    } finally {
      setLoading(false)
    }
  }

  const optionClass = (value) =>
    `rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
      format === value
        ? 'bg-primary-600 text-white'
        : 'bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700'
    }`

  return (
    <ToolPageLayout tool={tool}>
      {!file ? (
        <FileUploader
          accept="image/*"
          onFiles={selectFiles}
          title="Drop a WebP image here"
          hint="or click to browse"
        />
      ) : (
        <div className="space-y-6">
          <FilePreview file={file} large dimensions={dimensions} label="Original" />

          <div className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
            <p className="text-sm font-medium text-slate-700 dark:text-slate-300">
              Convert to:
            </p>
            <div className="mt-3 inline-flex gap-2" role="radiogroup" aria-label="Output format">
              <button type="button" onClick={() => setFormat('jpg')} className={optionClass('jpg')} role="radio" aria-checked={format === 'jpg'}>
                JPG
              </button>
              <button type="button" onClick={() => setFormat('png')} className={optionClass('png')} role="radio" aria-checked={format === 'png'}>
                PNG
              </button>
            </div>
            {format === 'jpg' && (
              <p className="mt-4 rounded-lg bg-amber-50 px-3 py-2 text-xs text-amber-700 dark:bg-amber-950/40 dark:text-amber-400">
                Transparent areas are filled with white, since JPG does not support
                transparency.
              </p>
            )}

            <button
              type="button"
              onClick={convert}
              disabled={loading}
              className="focus-ring mt-5 inline-flex items-center justify-center gap-2 rounded-xl bg-primary-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-primary-700 disabled:opacity-60"
            >
              Convert to {format.toUpperCase()}
            </button>
          </div>

          {loading && <LoadingState message={`Converting to ${format.toUpperCase()}…`} />}
          {error && <ErrorMessage message={error} onDismiss={() => setError('')} />}

          {result && (
            <ToolResultPanel
              blob={result.blob}
              fileName={`${baseName(file.name)}.${format}`}
              width={result.width}
              height={result.height}
              originalSize={file.size}
              note={`Your ${format.toUpperCase()} image is ready to download.`}
            />
          )}
        </div>
      )}
    </ToolPageLayout>
  )
}
