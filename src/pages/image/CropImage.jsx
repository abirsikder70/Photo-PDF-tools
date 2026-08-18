import { useEffect, useState } from 'react'
import Cropper from 'react-easy-crop'
import 'react-easy-crop/react-easy-crop.css'
import { tools } from '../../data/tools'
import ToolPageLayout from '../../components/ui/ToolPageLayout'
import FileUploader from '../../components/ui/FileUploader'
import FilePreview from '../../components/ui/FilePreview'
import ToolResultPanel from '../../components/ui/ToolResultPanel'
import LoadingState from '../../components/ui/LoadingState'
import ErrorMessage from '../../components/ui/ErrorMessage'
import { useImageUpload } from '../../hooks/useImageUpload'
import { getCroppedBlob } from '../../utils/image'
import { baseName } from '../../utils/format'

const tool = tools.find((t) => t.slug === 'crop')

export default function CropImage() {
  const { file, previewUrl, dimensions, error, setError, selectFiles } = useImageUpload()
  const [crop, setCrop] = useState({ x: 0, y: 0 })
  const [zoom, setZoom] = useState(1)
  const [croppedArea, setCroppedArea] = useState(null)
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState(null)

  useEffect(() => {
    setCrop({ x: 0, y: 0 })
    setZoom(1)
    setCroppedArea(null)
    setResult(null)
  }, [file])

  const outMime = file?.type === 'image/png' ? 'image/png' : 'image/jpeg'
  const outExt = file?.type === 'image/png' ? 'png' : 'jpg'

  async function cropImage() {
    if (!previewUrl || !croppedArea) {
      setError('Please select the area you want to keep first.')
      return
    }
    setLoading(true)
    setError('')
    try {
      const blob = await getCroppedBlob(previewUrl, croppedArea, outMime, 0.92)
      setResult({ blob, width: croppedArea.width, height: croppedArea.height })
    } catch (err) {
      setError(err.message || 'Cropping failed. Please try again.')
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
          <FilePreview file={file} dimensions={dimensions} label="Original" />

          {previewUrl && (
            <div className="relative h-96 w-full overflow-hidden rounded-2xl border border-slate-200/80 shadow-card dark:border-slate-800">
              <Cropper
                image={previewUrl}
                crop={crop}
                zoom={zoom}
                cropShape="rect"
                showGrid
                onCropChange={setCrop}
                onZoomChange={setZoom}
                onCropComplete={(_, areaPixels) => setCroppedArea(areaPixels)}
              />
            </div>
          )}

          <p className="text-sm text-slate-500 dark:text-slate-400">
            Drag inside the box to move it, drag a corner or edge to resize it. The dark
            area will be removed.
          </p>

          <button
            type="button"
            onClick={cropImage}
            disabled={loading}
            className="btn-primary"
          >
            Crop Image
          </button>

          {loading && <LoadingState message="Cropping your image…" />}
          {error && <ErrorMessage message={error} onDismiss={() => setError('')} />}

          {result && (
            <ToolResultPanel
              blob={result.blob}
              fileName={`${baseName(file.name)}-cropped.${outExt}`}
              width={result.width}
              height={result.height}
              originalSize={file.size}
              note="Your cropped image is ready to download."
            />
          )}
        </div>
      )}
    </ToolPageLayout>
  )
}
