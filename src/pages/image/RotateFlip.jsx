import { useEffect, useState } from 'react'
import { tools } from '../../data/tools'
import ToolPageLayout from '../../components/ui/ToolPageLayout'
import FileUploader from '../../components/ui/FileUploader'
import FilePreview from '../../components/ui/FilePreview'
import ToolResultPanel from '../../components/ui/ToolResultPanel'
import LoadingState from '../../components/ui/LoadingState'
import ErrorMessage from '../../components/ui/ErrorMessage'
import { Icon } from '../../components/ui/Icons'
import { useImageUpload } from '../../hooks/useImageUpload'
import { loadImageFromFile, canvasToBlob } from '../../utils/image'
import { baseName } from '../../utils/format'

const tool = tools.find((t) => t.slug === 'rotate-flip')

function renderTransform(img, rotation, flipH, flipV, isPng) {
  const { width: w, height: h } = img
  const swap = rotation % 180 !== 0
  const canvas = document.createElement('canvas')
  canvas.width = swap ? h : w
  canvas.height = swap ? w : h
  const ctx = canvas.getContext('2d')
  if (!ctx) throw new Error('Canvas is not supported in this browser.')

  if (!isPng) {
    ctx.fillStyle = '#ffffff'
    ctx.fillRect(0, 0, canvas.width, canvas.height)
  }

  ctx.translate(canvas.width / 2, canvas.height / 2)
  ctx.rotate((rotation * Math.PI) / 180)
  if (flipH) ctx.scale(-1, 1)
  if (flipV) ctx.scale(1, -1)
  ctx.imageSmoothingEnabled = true
  ctx.drawImage(img, -w / 2, -h / 2)
  return canvas
}

export default function RotateFlip() {
  const { file, dimensions, error, setError, selectFiles } = useImageUpload()
  const [rotation, setRotation] = useState(0)
  const [flipH, setFlipH] = useState(false)
  const [flipV, setFlipV] = useState(false)
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState(null)

  useEffect(() => {
    if (!file) return
    let cancelled = false
    setLoading(true)
    setError('')

    ;(async () => {
      try {
        const img = await loadImageFromFile(file)
        const isPng = file.type === 'image/png'
        const canvas = renderTransform(img, rotation, flipH, flipV, isPng)
        const blob = await canvasToBlob(canvas, isPng ? 'image/png' : 'image/jpeg', 0.92)
        if (!cancelled) {
          setResult({ blob, width: canvas.width, height: canvas.height })
        }
      } catch (err) {
        if (!cancelled) setError(err.message || 'Could not process this image.')
      } finally {
        if (!cancelled) setLoading(false)
      }
    })()

    return () => {
      cancelled = true
    }
  }, [file, rotation, flipH, flipV, setLoading, setError])

  function rotateBy(degrees) {
    setRotation((prev) => (prev + degrees + 360) % 360)
  }

  const actionButtonClass =
    'focus-ring inline-flex flex-1 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-slate-800'

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

          <div className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
            <div className="flex flex-wrap gap-3">
              <button type="button" onClick={() => rotateBy(90)} className={actionButtonClass}>
                <Icon name="rotate" className="h-4 w-4" />
                Rotate 90°
              </button>
              <button type="button" onClick={() => rotateBy(-90)} className={actionButtonClass}>
                <Icon name="rotateAlt" className="h-4 w-4" />
                Rotate -90°
              </button>
              <button
                type="button"
                onClick={() => setFlipH((prev) => !prev)}
                className={`${actionButtonClass} ${flipH ? '!border-primary-400 !text-primary-600 dark:!text-primary-400' : ''}`}
              >
                Flip horizontal
              </button>
              <button
                type="button"
                onClick={() => setFlipV((prev) => !prev)}
                className={`${actionButtonClass} ${flipV ? '!border-primary-400 !text-primary-600 dark:!text-primary-400' : ''}`}
              >
                Flip vertical
              </button>
            </div>
            <button
              type="button"
              onClick={() => {
                setRotation(0)
                setFlipH(false)
                setFlipV(false)
              }}
              className="focus-ring mt-3 text-sm font-medium text-slate-500 underline-offset-2 hover:text-primary-600 hover:underline dark:text-slate-400"
            >
              Reset
            </button>
          </div>

          {loading && <LoadingState message="Updating preview…" />}
          {error && <ErrorMessage message={error} onDismiss={() => setError('')} />}

          {result && (
            <ToolResultPanel
              blob={result.blob}
              fileName={`${baseName(file.name)}-rotated.${file.type === 'image/png' ? 'png' : 'jpg'}`}
              width={result.width}
              height={result.height}
              originalSize={file.size}
              note="The preview updates automatically. Download your image below."
            />
          )}
        </div>
      )}
    </ToolPageLayout>
  )
}
