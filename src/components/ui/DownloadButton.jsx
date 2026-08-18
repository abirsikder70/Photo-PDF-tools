import { Icon } from './Icons'

/**
 * DownloadButton — triggers a download for a file or blob.
 *
 * @param {Blob|string} href      — the blob / data URL to download
 * @param {string}      fileName  — suggested file name
 * @param {string}      [label]   — button text (default "Download")
 * @param {boolean}     [disabled]
 * @param {boolean}     [small]   — render a compact button
 */
export default function DownloadButton({ href, fileName, label = 'Download', disabled, small }) {
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
      className={small ? 'btn-primary-sm' : 'btn-primary'}
    >
      <Icon name="download" className="h-4 w-4" />
      {label}
    </button>
  )
}
