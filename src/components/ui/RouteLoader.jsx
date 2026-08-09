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
        className="h-10 w-10 animate-spin rounded-full border-2 border-primary-200 border-t-primary-600"
        aria-label="Loading"
      />
      <span className="sr-only">Loading…</span>
    </div>
  )
}
