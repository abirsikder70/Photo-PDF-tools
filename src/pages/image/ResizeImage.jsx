import { useEffect, useState } from 'react'
import { tools } from '../../data/tools'
import ToolPageLayout from '../../components/ui/ToolPageLayout'
import FileUploader from '../../components/ui/FileUploader'
import FilePreview from '../../components/ui/FilePreview'
import ToolResultPanel from '../../components/ui/ToolResultPanel'
import LoadingState from '../../components/ui/LoadingState'
import ErrorMessage from '../../components/ui/ErrorMessage'
import { useImageUpload } from '../../hooks/useImageUpload'
import { loadImageFromFile, drawImageToCanvas, canvasToBlob, mimeFor } from '../../utils/image'
import { baseName } from '../../utils/format'

const tool = tools.find((t) => t.slug === 'resize')

export default function ResizeImage() {
  const { file, dimensions, error, setError, selectFiles } = useImageUpload()
  const [unit, setUnit] = useState('pixels')
  const [width, setWidth] = useState('')
  const [height, setHeight] = useState('')
  const [percent, setPercent] = useState('100')
  const [keepAspect, setKeepAspect] = useState(true)
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState(null)

  useEffect(() => {
    if (dimensions) {
      setWidth(String(dimensions.width))
      setHeight(String(dimensions.height))
    }
  }, [dimensions])

  const outWidth = unit === 'percent' ? Math.round((dimensions?.width || 0) * (Number(percent) / 100)) : Number(width)
  const outHeight = unit === 'percent' ? Math.round((dimensions?.height || 0) * (Number(percent) / 100)) : Number(height)

  const ratio = dimensions ? dimensions.height / dimensions.width : 1

  function changeWidth(value) {
    setWidth(value)
    if (keepAspect && dimensions) setHeight(String(Math.round(Number(value) * ratio)))
  }

  function changeHeight(value) {
    setHeight(value)
    if (keepAspect && dimensions) setWidth(String(Math.round(Number(value) / ratio)))
  }

  async function resize() {
    if (!file) return
    if (!outWidth || !outHeight || outWidth <= 0 || outHeight <= 0) {
      setError('Please enter a valid width and height.')
      return
    }
    setLoading(true)
    setError('')
    try {
      const img = await loadImageFromFile(file)
      const canvas = drawImageToCanvas(img, outWidth, outHeight)
      const format = file.type === 'image/png' ? 'png' : file.type === 'image/webp' ? 'webp' : 'jpg'
      const blob = await canvasToBlob(canvas, mimeFor(format), 0.92)
      setResult({ blob, width: outWidth, height: outHeight })
    } catch (err) {
      setError(err.message || 'Resizing failed. Please try a different image.')
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
          accept="image/*"
          onFiles={selectFiles}
          title="Drop an image here"
          hint="JPG, PNG or WebP — or click to browse"
        />
      ) : (
        <div className="space-y-6">
          <FilePreview file={file} large dimensions={dimensions} label="Original" />

          <div className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
            <div className="flex flex-wrap items-center gap-3 text-sm">
              <span className="font-medium text-slate-700 dark:text-slate-300">Resize by:</span>
              <div className="inline-flex rounded-xl bg-slate-100 p-1 dark:bg-slate-800">
                {['pixels', 'percent'].map((u) => (
                  <button
                    key={u}
                    type="button"
                    onClick={() => setUnit(u)}
                    className={`rounded-lg px-4 py-1.5 text-sm font-medium transition-colors ${
                      unit === u
                        ? 'bg-white text-primary-700 shadow-sm dark:bg-slate-900 dark:text-primary-400'
                        : 'text-slate-500 hover:text-slate-700 dark:text-slate-400'
                    }`}
                  >
                    {u === 'pixels' ? 'Pixels' : 'Percent'}
                  </button>
                ))}
              </div>
            </div>

            {unit === 'pixels' ? (
              <div className="mt-5 grid grid-cols-2 gap-4">
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                  Width (px)
                  <input
                    type="number"
                    min="1"
                    value={width}
                    onChange={(e) => changeWidth(e.target.value)}
                    className={`${inputClass} mt-1.5`}
                  />
                </label>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                  Height (px)
                  <input
                    type="number"
                    min="1"
                    value={height}
                    onChange={(e) => changeHeight(e.target.value)}
                    className={`${inputClass} mt-1.5`}
                  />
                </label>
              </div>
            ) : (
              <label className="mt-5 block text-sm font-medium text-slate-700 dark:text-slate-300">
                Percentage (%)
                <input
                  type="number"
                  min="1"
                  max="500"
                  value={percent}
                  onChange={(e) => setPercent(e.target.value)}
                  className={`${inputClass} mt-1.5 max-w-40`}
                />
              </label>
            )}

            {unit === 'pixels' && (
              <label className="mt-4 flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                <input
                  type="checkbox"
                  checked={keepAspect}
                  onChange={(e) => setKeepAspect(e.target.checked)}
                  className="h-4 w-4 rounded accent-primary-600"
                />
                Keep aspect ratio
              </label>
            )}

            {outWidth > 0 && outHeight > 0 && (
              <p className="mt-4 rounded-lg bg-slate-50 px-3 py-2 text-xs text-slate-500 dark:bg-slate-800 dark:text-slate-400">
                Output size: {outWidth} × {outHeight} px
              </p>
            )}

            <button
              type="button"
              onClick={resize}
              disabled={loading}
              className="focus-ring mt-5 inline-flex items-center justify-center gap-2 rounded-xl bg-primary-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-primary-700 disabled:opacity-60"
            >
              Resize Image
            </button>
          </div>

          {loading && <LoadingState message="Resizing your image…" />}
          {error && <ErrorMessage message={error} onDismiss={() => setError('')} />}

          {result && (
            <ToolResultPanel
              blob={result.blob}
              fileName={`${baseName(file.name)}-${result.width}x${result.height}.${file.type === 'image/png' ? 'png' : file.type === 'image/webp' ? 'webp' : 'jpg'}`}
              width={result.width}
              height={result.height}
              originalSize={file.size}
              note="Your resized image is ready to download."
            />
          )}
        </div>
      )}
    </ToolPageLayout>
  )
}
