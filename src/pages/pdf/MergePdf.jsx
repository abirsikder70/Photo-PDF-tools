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

const tool = tools.find((t) => t.slug === 'merge')

export default function MergePdf() {
  const [files, setFiles] = useState([])
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

  async function merge() {
    if (files.length < 2) {
      setError('Please add at least two PDFs to merge.')
      return
    }
    setLoading(true)
    setError('')
    try {
      const out = await PDFDocument.create()
      let total = 0
      for (const file of files) {
        const src = await PDFDocument.load(await file.arrayBuffer())
        const pages = await out.copyPages(src, src.getPageIndices())
        pages.forEach((page) => out.addPage(page))
        total += pages.length
      }
      const bytes = await out.save()
      setResult({
        blob: new Blob([bytes], { type: 'application/pdf' }),
        pageCount: total,
      })
    } catch {
      setError(
        'Merging failed. One of the PDFs may be password-protected or corrupted.',
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <ToolPageLayout tool={tool}>
      <FileUploader
        accept=".pdf,application/pdf"
        multiple
        onFiles={addFiles}
        title="Drop PDF files here"
        hint="Add two or more PDFs — or click to browse"
      />

      {files.length > 0 && (
        <div className="mt-6 space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-[15px] font-semibold tracking-tight">
              {files.length} file{files.length === 1 ? '' : 's'} to merge
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

          {files.map((file, index) => (
            <div key={`${file.name}-${index}`} className="flex items-center gap-3">
              <span className="w-6 shrink-0 text-center text-sm font-semibold tabular-nums text-slate-400">
                {index + 1}.
              </span>
              <div className="min-w-0 flex-1">
                <FilePreview file={file} label="PDF" />
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
            onClick={merge}
            disabled={loading}
            className="btn-primary mt-2"
          >
            <Icon name="merge" className="h-4 w-4" />
            Merge PDFs
          </button>
        </div>
      )}

      {loading && <LoadingState message="Merging your PDFs…" />}
      {error && <ErrorMessage message={error} onDismiss={() => setError('')} />}

      {result && (
        <div className="mt-6">
          <PdfResultPanel
            blob={result.blob}
            fileName="merged.pdf"
            pageCount={result.pageCount}
            note="Your merged PDF is ready to download."
          />
        </div>
      )}
    </ToolPageLayout>
  )
}
