import { useEffect, useState } from 'react'
import DownloadButton from './DownloadButton'
import { Icon } from './Icons'
import { formatBytes } from '../../utils/format'

/**
 * ToolResultPanel — shows the processed image, its dimensions/size,
 * a savings badge (compared to the original) and a download button.
 *
 * @param {Blob}    blob         — the processed image blob
 * @param {string}  fileName     — suggested download name
 * @param {number}  [width]      — output width in px
 * @param {number}  [height]     — output height in px
 * @param {number}  [originalSize] — original file size in bytes (for savings %)
 * @param {string}  [heading]    — section heading (default "Result")
 * @param {string}  [note]       — extra text under the heading
 * @param {ReactNode} [extra]    — optional extra content (e.g. controls)
 */
export default function ToolResultPanel({
  blob,
  fileName,
  width,
  height,
  originalSize,
  heading = 'Result',
  note,
  extra,
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
      className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-card dark:border-slate-800 dark:bg-slate-900"
    >
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h2 className="text-base font-semibold tracking-tight">{heading}</h2>
        {savingsPct > 0 && (
          <span className="badge-success">
            <Icon name="check" className="h-3.5 w-3.5" />
            {savingsPct}% smaller
          </span>
        )}
      </div>
      {note && <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{note}</p>}

      {url && (
        <img
          src={url}
          alt={`${heading} image`}
          className="mt-4 max-h-72 w-auto rounded-xl object-contain shadow-card"
        />
      )}

      <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-slate-600 dark:text-slate-400">
        {width && height && (
          <span className="tabular-nums">
            {width} × {height} px
          </span>
        )}
        <span className="font-semibold tabular-nums text-slate-800 dark:text-white">{formatBytes(blob.size)}</span>
        {originalSize && (
          <span className="text-slate-500 dark:text-slate-500">
            from {formatBytes(originalSize)}
          </span>
        )}
      </div>

      {extra && <div className="mt-4">{extra}</div>}

      <div className="mt-5">
        <DownloadButton href={url} fileName={fileName} />
      </div>
    </section>
  )
}
