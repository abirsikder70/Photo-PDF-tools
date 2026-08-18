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

const tool = tools.find((t) => t.slug === 'jpg-to-png')

export default function JpgToPng() {
  const { file, dimensions, error, setError, selectFiles } = useImageUpload()
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState(null)

  async function convert() {
    if (!file) return
    setLoading(true)
    setError('')
    try {
      const img = await loadImageFromFile(file)
      const canvas = drawImageToCanvas(img, img.width, img.height)
      const blob = await canvasToBlob(canvas, 'image/png')
      setResult({ blob, width: img.width, height: img.height })
    } catch (err) {
      setError(err.message || 'Conversion failed. Please try a different image.')
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
          title="Drop a JPG image here"
          hint="or click to browse"
        />
      ) : (
        <div className="space-y-6">
          <FilePreview file={file} large dimensions={dimensions} label="Original" />

          <button
            type="button"
            onClick={convert}
            disabled={loading}
            className="btn-primary"
          >
            Convert to PNG
          </button>

          {loading && <LoadingState message="Converting to PNG…" />}
          {error && <ErrorMessage message={error} onDismiss={() => setError('')} />}

          {result && (
            <ToolResultPanel
              blob={result.blob}
              fileName={`${baseName(file.name)}.png`}
              width={result.width}
              height={result.height}
              originalSize={file.size}
              note="PNG supports transparency — your converted image is ready to download."
            />
          )}
        </div>
      )}
    </ToolPageLayout>
  )
}
