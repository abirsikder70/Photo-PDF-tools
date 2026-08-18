/**
 * LoadingState — centered spinner with an optional message.
 *
 * @param {string} [message] — text shown under the spinner
 */
export default function LoadingState({ message = 'Processing your file…' }) {
  return (
    <div role="status" aria-live="polite" className="flex flex-col items-center gap-3.5 py-10">
      <span className="h-9 w-9 animate-spin rounded-full border-[3px] border-primary-500/20 border-t-primary-600 dark:border-primary-500/25 dark:border-t-primary-400" />
      <p className="text-sm text-slate-500 dark:text-slate-400">{message}</p>
      <span className="sr-only">Loading</span>
    </div>
  )
}
