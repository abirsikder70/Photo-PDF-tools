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

const tool = tools.find((t) => t.slug === 'to-webp')

export default function ToWebp() {
  const { file, dimensions, error, setError, selectFiles } = useImageUpload()
  const [quality, setQuality] = useState(0.85)
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState(null)

  async function convert() {
    if (!file) return
    setLoading(true)
    setError('')
    try {
      const img = await loadImageFromFile(file)
      const canvas = drawImageToCanvas(img, img.width, img.height)
      const blob = await canvasToBlob(canvas, 'image/webp', quality)
      setResult({ blob, width: img.width, height: img.height })
    } catch (err) {
      setError(
        err.message ||
          'WebP conversion is not supported in this browser. Please try Chrome, Edge, Firefox or Safari.',
      )
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
          title="Drop a JPG or PNG image here"
          hint="or click to browse"
        />
      ) : (
        <div className="space-y-6">
          <FilePreview file={file} large dimensions={dimensions} label="Original" />

          <div className="card p-5">
            <label
              htmlFor="webp-quality"
              className="field-label flex items-center justify-between"
            >
              <span>Quality</span>
              <span className="chip-value">
                {Math.round(quality * 100)}%
              </span>
            </label>
            <input
              id="webp-quality"
              type="range"
              min="0.1"
              max="1"
              step="0.01"
              value={quality}
              onChange={(e) => setQuality(Number(e.target.value))}
              className="mt-3 w-full accent-primary-600"
              aria-label="WebP quality"
            />
            <div className="mt-1 flex justify-between text-xs text-slate-400">
              <span>Smaller file</span>
              <span>Better quality</span>
            </div>

            <button
              type="button"
              onClick={convert}
              disabled={loading}
              className="btn-primary mt-5"
            >
              Convert to WebP
            </button>
          </div>

          {loading && <LoadingState message="Converting to WebP…" />}
          {error && <ErrorMessage message={error} onDismiss={() => setError('')} />}

          {result && (
            <ToolResultPanel
              blob={result.blob}
              fileName={`${baseName(file.name)}.webp`}
              width={result.width}
              height={result.height}
              originalSize={file.size}
              note="WebP is smaller and loads faster on the web. Download your file below."
            />
          )}
        </div>
      )}
    </ToolPageLayout>
  )
}
