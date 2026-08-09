import { useEffect, useState } from 'react'
import DownloadButton from './DownloadButton'
import { Icon } from './Icons'
import { formatBytes } from '../../utils/format'

/**
 * PdfResultPanel — shows the processed PDF (or zip), page count, size,
 * savings vs the original and a download button.
 *
 * @param {Blob}   blob          — the processed file
 * @param {string} fileName      — suggested download name
 * @param {number} [pageCount]   — number of pages (if a PDF)
 * @param {number} [originalSize] — original file size in bytes
 * @param {string} [note]
 * @param {string} [heading]
 */
export default function PdfResultPanel({
  blob,
  fileName,
  pageCount,
  originalSize,
  note,
  heading = 'Result',
}) {
  const [url, setUrl] = useState('')

  useEffect(() => {
    if (!blob) {
      setUrl('')
      return
    }
    const objectUrl = URL.createObjectURL(blob)
    setUrl(objectUrl)
    return () => URL.revokeObjectURL(objectUrl)
  }, [blob])

  if (!blob) return null

  const savings = originalSize ? Math.max(0, originalSize - blob.size) : 0
  const savingsPct =
    originalSize && originalSize > 0 ? Math.round((savings / originalSize) * 100) : 0

  return (
    <section
      aria-label={heading}
      className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900"
    >
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h2 className="text-lg font-semibold">{heading}</h2>
        {savingsPct > 0 && (
          <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400">
            <Icon name="check" className="h-3.5 w-3.5" />
            {savingsPct}% smaller
          </span>
        )}
      </div>
      {note && <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{note}</p>}

      <div className="mt-4 flex items-center gap-3 rounded-xl bg-slate-50 p-3 dark:bg-slate-800">
        <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary-50 text-primary-600 dark:bg-primary-500/10 dark:text-primary-400">
          <Icon name="pdf" className="h-5 w-5" />
        </span>
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-medium text-slate-800 dark:text-white">
            {fileName}
          </p>
          <div className="mt-0.5 flex flex-wrap items-center gap-x-3 gap-y-0.5 text-xs text-slate-500 dark:text-slate-400">
            {pageCount && <span>{pageCount} page{pageCount === 1 ? '' : 's'}</span>}
            <span className="font-medium text-slate-700 dark:text-slate-300">
              {formatBytes(blob.size)}
            </span>
            {originalSize && <span>from {formatBytes(originalSize)}</span>}
          </div>
        </div>
      </div>

      <div className="mt-4">
        <DownloadButton href={url} fileName={fileName} />
      </div>
    </section>
  )
}
