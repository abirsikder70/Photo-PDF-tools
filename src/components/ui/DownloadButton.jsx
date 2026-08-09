import { Icon } from './Icons'

/**
 * DownloadButton — triggers a download for a file or blob.
 *
 * @param {Blob|string} href      — the blob / data URL to download
 * @param {string}      fileName  — suggested file name
 * @param {string}      [label]   — button text (default "Download")
 * @param {boolean}     [disabled]
 */
export default function DownloadButton({ href, fileName, label = 'Download', disabled }) {
  function handleDownload() {
    if (!href) return

    const url = typeof href === 'string' ? href : URL.createObjectURL(href)
    const link = document.createElement('a')
    link.href = url
    link.download = fileName || 'download'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)

    if (typeof href !== 'string') {
      setTimeout(() => URL.revokeObjectURL(url), 1000)
    }
  }

  return (
    <button
      type="button"
      onClick={handleDownload}
      disabled={disabled || !href}
      className="focus-ring inline-flex items-center justify-center gap-2 rounded-xl bg-primary-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-primary-700 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-primary-600 dark:hover:bg-primary-500"
    >
      <Icon name="download" className="h-5 w-5" />
      {label}
    </button>
  )
}
