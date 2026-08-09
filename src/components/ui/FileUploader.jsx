import { useRef, useState } from 'react'
import { Icon } from './Icons'
import ErrorMessage from './ErrorMessage'

/**
 * FileUploader — a reusable drag-and-drop + click-to-browse file input.
 *
 * @param {string}   accept    — accepted types, e.g. "image/*" or ".pdf"
 * @param {boolean}  multiple  — allow more than one file
 * @param {number}   maxFiles  — optional max number of files
 * @param {number}   maxSizeMB — optional max file size in MB
 * @param {Function} onFiles   — called with the selected File array
 * @param {string}   title     — headline text
 * @param {string}   hint      — helper text shown under the headline
 */
export default function FileUploader({
  accept,
  multiple = false,
  maxFiles,
  maxSizeMB,
  onFiles,
  title = 'Drop your file here',
  hint = 'or click to browse from your computer',
}) {
  const inputRef = useRef(null)
  const [dragActive, setDragActive] = useState(false)
  const [error, setError] = useState('')

  function matchesAccept(file) {
    if (!accept || accept === '*/*') return true

    return accept
      .split(',')
      .map((part) => part.trim().toLowerCase())
      .some((pattern) => {
        if (pattern.endsWith('/*')) {
          const base = pattern.slice(0, -1)
          return file.type.toLowerCase().startsWith(base)
        }
        if (pattern.startsWith('.')) {
          return file.name.toLowerCase().endsWith(pattern)
        }
        return file.type.toLowerCase() === pattern
      })
  }

  function handleFiles(fileList) {
    const files = Array.from(fileList)

    if (files.length === 0) return

    if (maxFiles && files.length > maxFiles) {
      setError(`You can upload up to ${maxFiles} file${maxFiles > 1 ? 's' : ''} at a time.`)
      return
    }

    const rejected = files.filter((file) => !matchesAccept(file))
    if (rejected.length > 0) {
      const names = rejected.map((f) => f.name).join(', ')
      setError(`"${names}" is not a supported file type.`)
      return
    }

    if (maxSizeMB) {
      const tooBig = files.filter((f) => f.size > maxSizeMB * 1024 * 1024)
      if (tooBig.length > 0) {
        const names = tooBig.map((f) => f.name).join(', ')
        setError(`"${names}" exceeds the ${maxSizeMB} MB size limit.`)
        return
      }
    }

    setError('')
    onFiles(files)
  }

  function handleDrop(event) {
    event.preventDefault()
    setDragActive(false)
    handleFiles(event.dataTransfer.files)
  }

  return (
    <div>
      <div
        role="button"
        tabIndex={0}
        aria-label={title}
        onClick={() => inputRef.current?.click()}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault()
            inputRef.current?.click()
          }
        }}
        onDragOver={(e) => {
          e.preventDefault()
          setDragActive(true)
        }}
        onDragLeave={() => setDragActive(false)}
        onDrop={handleDrop}
        className={`focus-ring flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed px-6 py-12 text-center transition-colors ${
          dragActive
            ? 'border-primary-500 bg-primary-50 dark:border-primary-400 dark:bg-primary-500/10'
            : 'border-slate-300 bg-slate-50 hover:border-primary-400 hover:bg-primary-50/50 dark:border-slate-700 dark:bg-slate-900 dark:hover:border-primary-600 dark:hover:bg-primary-500/5'
        }`}
      >
        <span className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-full bg-white text-primary-600 shadow-sm dark:bg-slate-800 dark:text-primary-400">
          <Icon name="upload" className="h-7 w-7" />
        </span>
        <p className="text-base font-semibold text-slate-800 dark:text-white">{title}</p>
        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{hint}</p>

        <input
          ref={inputRef}
          type="file"
          accept={accept}
          multiple={multiple}
          className="sr-only"
          onChange={(e) => {
            handleFiles(e.target.files)
            e.target.value = ''
          }}
        />
      </div>

      {error && <ErrorMessage message={error} onDismiss={() => setError('')} />}
    </div>
  )
}
