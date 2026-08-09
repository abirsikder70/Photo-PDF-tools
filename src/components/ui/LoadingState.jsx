/**
 * LoadingState — centered spinner with an optional message.
 *
 * @param {string} [message] — text shown under the spinner
 */
export default function LoadingState({ message = 'Processing your file…' }) {
  return (
    <div role="status" aria-live="polite" className="flex flex-col items-center gap-3 py-10">
      <span className="h-10 w-10 animate-spin rounded-full border-4 border-primary-200 border-t-primary-600 dark:border-primary-800 dark:border-t-primary-400" />
      <p className="text-sm text-slate-500 dark:text-slate-400">{message}</p>
      <span className="sr-only">Loading</span>
    </div>
  )
}
