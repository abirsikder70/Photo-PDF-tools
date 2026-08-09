/**
 * PageThumbnail — a reusable page card for PDF tools.
 *
 * @param {number}  page        — 1-based page number
 * @param {string}  src         — thumbnail data URL (empty while loading)
 * @param {boolean} selected    — highlight as selected
 * @param {Function} [onClick]  — toggle selection when clicking the page
 * @param {ReactNode} [footer]  — action buttons shown under the page
 * @param {boolean} [draggable] — enable HTML5 drag on the card
 * @param {Function} [onDragStart]
 * @param {Function} [onDragOver]
 * @param {Function} [onDrop]
 * @param {string}  [className] — extra classes for the outer card
 * @param {Object}  [style]     — inline styles for the outer card
 */
export default function PageThumbnail({
  page,
  src,
  selected = false,
  onClick,
  footer,
  draggable,
  onDragStart,
  onDragOver,
  onDrop,
  className,
  style,
}) {
  const image = src ? (
    <img src={src} alt={`Page ${page}`} className="block w-full object-contain" />
  ) : (
    <div className="flex h-44 items-center justify-center">
      <span className="h-6 w-6 animate-spin rounded-full border-2 border-primary-200 border-t-primary-600" />
    </div>
  )

  const outerClass = `relative w-full overflow-hidden rounded-xl border bg-white transition-shadow dark:bg-slate-900 ${
    selected
      ? 'border-primary-500 ring-2 ring-primary-500/60'
      : 'border-slate-200 dark:border-slate-700'
  } ${className || ''}`

  const inner = onClick ? (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={selected}
      aria-label={`Page ${page}`}
      className="focus-ring block w-full"
    >
      {image}
    </button>
  ) : (
    <div>{image}</div>
  )

  return (
    <div
      className={outerClass}
      style={style}
      draggable={draggable}
      onDragStart={onDragStart}
      onDragOver={onDragOver}
      onDrop={onDrop}
    >
      <span className="absolute left-2 top-2 z-10 rounded-md bg-slate-900/70 px-2 py-0.5 text-xs font-semibold text-white">
        {page}
      </span>
      {inner}
      {footer && (
        <div className="border-t border-slate-200 bg-white p-2 dark:border-slate-700 dark:bg-slate-900">
          {footer}
        </div>
      )}
    </div>
  )
}
