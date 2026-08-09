/**
 * ProgressBar — shows progress of a multi-step operation.
 *
 * @param {number} value — current step (1-based)
 * @param {number} max   — total steps
 * @param {string} [label] — text shown next to the percentage
 */
export default function ProgressBar({ value, max, label = 'Processing' }) {
  const pct = max ? Math.round((value / max) * 100) : 0

  return (
    <div
      role="status"
      aria-live="polite"
      className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900"
    >
      <div className="flex items-center justify-between text-sm">
        <span className="font-medium text-slate-700 dark:text-slate-300">{label}</span>
        <span className="text-slate-500 dark:text-slate-400">
          {value} / {max} ({pct}%)
        </span>
      </div>
      <div className="mt-3 h-2.5 w-full overflow-hidden rounded-full bg-slate-200 dark:bg-slate-800">
        <div
          className="h-full rounded-full bg-primary-600 transition-all duration-200"
          style={{ width: `${pct}%` }}
        />
      </div>
      <span className="sr-only">Progress: {pct}%</span>
    </div>
  )
}
