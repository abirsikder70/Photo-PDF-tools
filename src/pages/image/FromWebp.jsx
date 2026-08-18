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
    `rounded-lg px-4 py-2 text-[13px] font-medium transition-colors ${
      format === value
        ? 'choice-on'
        : 'choice-off'
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

          <div className="card p-5">
            <p className="field-label">Convert to:</p>
            <div className="mt-3 inline-flex gap-2" role="radiogroup" aria-label="Output format">
              <button type="button" onClick={() => setFormat('jpg')} className={optionClass('jpg')} role="radio" aria-checked={format === 'jpg'}>
                JPG
              </button>
              <button type="button" onClick={() => setFormat('png')} className={optionClass('png')} role="radio" aria-checked={format === 'png'}>
                PNG
              </button>
            </div>
            {format === 'jpg' && (
              <p className="mt-4 rounded-lg border border-amber-200/70 bg-amber-50/60 px-3 py-2 text-xs leading-relaxed text-amber-800 dark:border-amber-500/15 dark:bg-amber-500/5 dark:text-amber-300">
                Transparent areas are filled with white, since JPG does not support
                transparency.
              </p>
            )}

            <button
              type="button"
              onClick={convert}
              disabled={loading}
              className="btn-primary mt-5"
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
