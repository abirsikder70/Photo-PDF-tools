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

const tool = tools.find((t) => t.slug === 'compare')

export default function CompareImage() {
  const { file, dimensions, error, setError, selectFiles } = useImageUpload()
  const [quality, setQuality] = useState(0.6)
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState(null)

  async function compare() {
    if (!file) return
    setLoading(true)
    setError('')
    try {
      const img = await loadImageFromFile(file)
      const canvas = drawImageToCanvas(img, img.width, img.height)
      const blob = await canvasToBlob(canvas, 'image/jpeg', quality)
      setResult({ blob, width: img.width, height: img.height })
    } catch (err) {
      setError(err.message || 'Comparison failed. Please try a different image.')
    } finally {
      setLoading(false)
    }
  }

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
          <div className="card p-5">
            <label
              htmlFor="compare-quality"
              className="field-label flex items-center justify-between"
            >
              <span>Compression quality for the comparison</span>
              <span className="chip-value">
                {Math.round(quality * 100)}%
              </span>
            </label>
            <input
              id="compare-quality"
              type="range"
              min="0.1"
              max="1"
              step="0.01"
              value={quality}
              onChange={(e) => setQuality(Number(e.target.value))}
              className="mt-3 w-full accent-primary-600"
              aria-label="Comparison quality"
            />
            <div className="mt-1 flex justify-between text-xs text-slate-400">
              <span>Smaller file</span>
              <span>Better quality</span>
            </div>

            <button
              type="button"
              onClick={compare}
              disabled={loading}
              className="btn-primary mt-5"
            >
              Compare
            </button>
          </div>

          {loading && <LoadingState message="Generating comparison…" />}
          {error && <ErrorMessage message={error} onDismiss={() => setError('')} />}

          {result && (
            <div className="grid gap-6 md:grid-cols-2">
              <FilePreview file={file} large dimensions={dimensions} label="Original" />
              <ToolResultPanel
                blob={result.blob}
                fileName={`${baseName(file.name)}-compressed.jpg`}
                width={result.width}
                height={result.height}
                originalSize={file.size}
                heading="Compressed"
                note={`Compressed at ${Math.round(quality * 100)}% quality.`}
              />
            </div>
          )}
        </div>
      )}
    </ToolPageLayout>
  )
}
