import { Icon } from './Icons'

/**
 * ErrorMessage — an accessible error alert.
 *
 * @param {string}   message     — the error text
 * @param {Function} [onDismiss] — optional callback to clear the error
 */
export default function ErrorMessage({ message, onDismiss }) {
  if (!message) return null

  return (
    <div
      role="alert"
      className="mt-4 flex items-start gap-3 rounded-xl border border-red-200/80 bg-red-50/80 px-4 py-3 text-sm text-red-700 shadow-card dark:border-red-900/50 dark:bg-red-950/30 dark:text-red-300"
    >
      <span className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-red-100 text-red-600 dark:bg-red-500/15 dark:text-red-400">
        <Icon name="alert" className="h-3.5 w-3.5" />
      </span>
      <p className="flex-1 leading-relaxed">{message}</p>
      {onDismiss && (
        <button
          type="button"
          onClick={onDismiss}
          aria-label="Dismiss error"
          className="focus-ring -mr-1 rounded-md p-1 text-red-400 transition-colors hover:text-red-700 dark:hover:text-red-200"
        >
          <Icon name="close" className="h-4 w-4" />
        </button>
      )}
    </div>
  )
}
