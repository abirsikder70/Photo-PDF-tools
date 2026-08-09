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
      className="mt-4 flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 dark:border-red-900/60 dark:bg-red-950/40 dark:text-red-300"
    >
      <Icon name="alert" className="mt-0.5 h-5 w-5 shrink-0" />
      <p className="flex-1">{message}</p>
      {onDismiss && (
        <button
          type="button"
          onClick={onDismiss}
          aria-label="Dismiss error"
          className="focus-ring rounded-md p-0.5 text-red-500 hover:text-red-700 dark:hover:text-red-200"
        >
          <Icon name="close" className="h-4 w-4" />
        </button>
      )}
    </div>
  )
}
