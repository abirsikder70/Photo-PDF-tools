/**
 * RouteLoader — full-screen loading state shown while a lazily-loaded
 * route (tool page) is fetched and executed.
 */
export default function RouteLoader() {
  return (
    <div
      className="flex min-h-[50vh] items-center justify-center"
      role="status"
      aria-live="polite"
    >
      <span
        className="h-9 w-9 animate-spin rounded-full border-[3px] border-primary-500/20 border-t-primary-600 dark:border-primary-500/25 dark:border-t-primary-400"
        aria-label="Loading"
      />
      <span className="sr-only">Loading…</span>
    </div>
  )
}
