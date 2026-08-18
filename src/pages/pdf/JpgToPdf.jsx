import { useState } from 'react'
import { PDFDocument } from 'pdf-lib'
import { tools } from '../../data/tools'
import ToolPageLayout from '../../components/ui/ToolPageLayout'
import FileUploader from '../../components/ui/FileUploader'
import FilePreview from '../../components/ui/FilePreview'
import PdfResultPanel from '../../components/ui/PdfResultPanel'
import LoadingState from '../../components/ui/LoadingState'
import ErrorMessage from '../../components/ui/ErrorMessage'
import { Icon } from '../../components/ui/Icons'
import { loadImageFromFile, canvasToBlob } from '../../utils/image'

const tool = tools.find((t) => t.slug === 'jpg-to-pdf')

const A4 = { width: 595.28, height: 841.89 }
const MARGIN = 24

function fitWithin(dimWidth, dimHeight, maxWidth, maxHeight) {
  const ratio = Math.min(maxWidth / dimWidth, maxHeight / dimHeight)
  return { width: dimWidth * ratio, height: dimHeight * ratio }
}

export default function JpgToPdf() {
  const [files, setFiles] = useState([])
  const [pageSize, setPageSize] = useState('original')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [result, setResult] = useState(null)

  function addFiles(list) {
    setFiles((prev) => [...prev, ...list])
    setResult(null)
  }

  function removeFile(index) {
    setFiles((prev) => prev.filter((_, i) => i !== index))
    setResult(null)
  }

  function moveFile(index, direction) {
    setFiles((prev) => {
      const next = [...prev]
      const target = index + direction
      if (target < 0 || target >= next.length) return prev
      ;[next[index], next[target]] = [next[target], next[index]]
      return next
    })
    setResult(null)
  }

  async function embedImage(out, file) {
    if (file.type === 'image/webp') {
      const img = await loadImageFromFile(file)
      const canvas = document.createElement('canvas')
      canvas.width = img.width
      canvas.height = img.height
      canvas.getContext('2d').drawImage(img, 0, 0)
      const png = await canvasToBlob(canvas, 'image/png')
      return out.embedPng(await png.arrayBuffer())
    }
    const bytes = await file.arrayBuffer()
    if (file.type === 'image/png') return out.embedPng(bytes)
    return out.embedJpg(bytes)
  }

  async function createPdf() {
    if (files.length === 0) {
      setError('Please add at least one image.')
      return
    }
    setLoading(true)
    setError('')
    try {
      const out = await PDFDocument.create()
      for (const file of files) {
        const img = await embedImage(out, file)
        const imageWidth = img.width
        const imageHeight = img.height

        let pageWidth = imageWidth
        let pageHeight = imageHeight
        let x = 0
        let y = 0

        if (pageSize === 'a4') {
          const fitted = fitWithin(
            imageWidth,
            imageHeight,
            A4.width - MARGIN * 2,
            A4.height - MARGIN * 2,
          )
          pageWidth = A4.width
          pageHeight = A4.height
          x = (A4.width - fitted.width) / 2
          y = (A4.height - fitted.height) / 2
          pageWidth = fitted.width
          pageHeight = fitted.height
        }

        const pdfPage = out.addPage([pageWidth, pageHeight])
        pdfPage.drawImage(img, { x, y, width: pageWidth, height: pageHeight })
      }
      const bytes = await out.save()
      setResult({ blob: new Blob([bytes], { type: 'application/pdf' }) })
    } catch {
      setError('Could not create the PDF. One of the images may be unsupported.')
    } finally {
      setLoading(false)
    }
  }

  const sizeOptionClass = (value) =>
    `rounded-lg px-4 py-2 text-[13px] font-medium transition-colors ${
      pageSize === value
        ? 'choice-on'
        : 'choice-off'
    }`

  return (
    <ToolPageLayout tool={tool}>
      <FileUploader
        accept="image/*"
        multiple
        onFiles={addFiles}
        title="Drop images here"
        hint="JPG, PNG or WebP — or click to browse"
      />

      {files.length > 0 && (
        <div className="mt-6 space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h2 className="text-[15px] font-semibold tracking-tight">
              {files.length} image{files.length === 1 ? '' : 's'} to convert
            </h2>
            <button
              type="button"
              onClick={() => {
                setFiles([])
                setResult(null)
              }}
              className="focus-ring rounded-lg text-sm font-medium text-slate-500 underline-offset-4 transition-colors hover:text-red-600 hover:underline dark:text-slate-400"
            >
              Clear all
            </button>
          </div>

          <div className="card p-5">
            <span className="field-label">
              Page size
            </span>
            <div className="mt-3 inline-flex gap-2" role="radiogroup" aria-label="Page size">
              <button type="button" onClick={() => setPageSize('original')} className={sizeOptionClass('original')} role="radio" aria-checked={pageSize === 'original'}>
                Original size
              </button>
              <button type="button" onClick={() => setPageSize('a4')} className={sizeOptionClass('a4')} role="radio" aria-checked={pageSize === 'a4'}>
                A4 (fits on page)
              </button>
            </div>
          </div>

          {files.map((file, index) => (
            <div key={`${file.name}-${index}`} className="flex items-center gap-3">
              <span className="w-6 shrink-0 text-center text-sm font-semibold tabular-nums text-slate-400">
                {index + 1}.
              </span>
              <div className="min-w-0 flex-1">
                <FilePreview file={file} label="Image" />
              </div>
              <div className="flex shrink-0 gap-1">
                <button
                  type="button"
                  onClick={() => moveFile(index, -1)}
                  disabled={index === 0}
                  aria-label={`Move ${file.name} up`}
                  className="icon-btn-xs"
                >
                  <Icon name="chevronRight" className="h-4 w-4 -rotate-90" />
                </button>
                <button
                  type="button"
                  onClick={() => moveFile(index, 1)}
                  disabled={index === files.length - 1}
                  aria-label={`Move ${file.name} down`}
                  className="icon-btn-xs"
                >
                  <Icon name="chevronRight" className="h-4 w-4 rotate-90" />
                </button>
                <button
                  type="button"
                  onClick={() => removeFile(index)}
                  aria-label={`Remove ${file.name}`}
                  className="focus-ring rounded-md border border-red-200/70 bg-white p-1.5 text-red-500 transition-colors hover:bg-red-50 dark:border-red-900/40 dark:bg-slate-900 dark:hover:bg-red-950/40"
                >
                  <Icon name="trash" className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}

          <button
            type="button"
            onClick={createPdf}
            disabled={loading}
            className="btn-primary mt-2"
          >
            <Icon name="pdf" className="h-4 w-4" />
            Create PDF
          </button>
        </div>
      )}

      {loading && <LoadingState message="Creating your PDF…" />}
      {error && <ErrorMessage message={error} onDismiss={() => setError('')} />}

      {result && (
        <div className="mt-6">
          <PdfResultPanel
            blob={result.blob}
            fileName="images.pdf"
            note="Your PDF is ready to download."
          />
        </div>
      )}
    </ToolPageLayout>
  )
}
