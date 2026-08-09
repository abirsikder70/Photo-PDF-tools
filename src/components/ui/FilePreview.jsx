import { useEffect, useState } from 'react'
import { Icon } from './Icons'
import { formatBytes } from '../../utils/format'

/**
 * FilePreview — shows a file thumbnail or large preview, name, size and type.
 *
 * @param {File}    file        — the selected file
 * @param {string}  [src]       — optional custom preview URL (e.g. processed image)
 * @param {string}  [label]     — optional text under the file name (e.g. "Compressed")
 * @param {boolean} [large]     — render a large image preview instead of a thumbnail
 * @param {object}  [dimensions] — { width, height } in pixels to display
 */
export default function FilePreview({ file, src, label, large = false, dimensions }) {
  const [objectUrl, setObjectUrl] = useState('')

  useEffect(() => {
    if (src) {
      setObjectUrl('')
      return
    }
    if (!file) return

    const url = URL.createObjectURL(file)
    setObjectUrl(url)
    return () => URL.revokeObjectURL(url)
  }, [file, src])

  const previewUrl = src || objectUrl
  const isImage = !src && file && file.type.startsWith('image/')

  if (large) {
    return (
      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900">
        <div className="flex max-h-80 items-center justify-center bg-slate-100 p-4 dark:bg-slate-950">
          {previewUrl && isImage ? (
            <img
              src={previewUrl}
              alt={file?.name}
              className="max-h-72 w-auto rounded-lg object-contain"
            />
          ) : (
            <span className="inline-flex h-24 w-24 items-center justify-center rounded-xl bg-primary-50 text-primary-600 dark:bg-primary-500/10 dark:text-primary-400">
              <Icon name="photo" className="h-12 w-12" />
            </span>
          )}
        </div>
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 border-t border-slate-200 px-4 py-3 text-sm dark:border-slate-800">
          <p className="min-w-0 flex-1 truncate font-medium text-slate-800 dark:text-white">
            {file?.name}
          </p>
          {dimensions && (
            <span className="text-slate-500 dark:text-slate-400">
              {dimensions.width} × {dimensions.height} px
            </span>
          )}
          {file && <span className="text-slate-500 dark:text-slate-400">{formatBytes(file.size)}</span>}
        </div>
      </div>
    )
  }

  return (
    <div className="flex items-center gap-4 rounded-xl border border-slate-200 bg-white p-3 dark:border-slate-800 dark:bg-slate-900">
      {previewUrl && isImage ? (
        <img
          src={previewUrl}
          alt={file?.name}
          className="h-16 w-16 rounded-lg object-cover"
        />
      ) : (
        <span className="inline-flex h-16 w-16 shrink-0 items-center justify-center rounded-lg bg-primary-50 text-primary-600 dark:bg-primary-500/10 dark:text-primary-400">
          <Icon name="file" className="h-8 w-8" />
        </span>
      )}

      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-medium text-slate-800 dark:text-white">
          {file?.name}
        </p>
        <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-slate-500 dark:text-slate-400">
          {label && (
            <span className="font-medium text-primary-600 dark:text-primary-400">{label}</span>
          )}
          {dimensions && (
            <span>
              {dimensions.width} × {dimensions.height} px
            </span>
          )}
          {file && (
            <>
              <span>{formatBytes(file.size)}</span>
              <span className="uppercase">{file.type || file.name.split('.').pop()}</span>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
