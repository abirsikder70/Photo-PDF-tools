import { Icon } from './Icons'

/**
 * ComingSoon — honest placeholder for tools that are not implemented yet.
 * Shown on tool pages during the staged build (Stage 2/3 replace it).
 */
export default function ComingSoon() {
  return (
    <div className="rounded-2xl border border-dashed border-primary-300 bg-primary-50/50 px-6 py-10 text-center dark:border-primary-700 dark:bg-primary-500/5">
      <span className="mx-auto mb-4 inline-flex h-14 w-14 items-center justify-center rounded-full bg-primary-100 text-primary-600 dark:bg-primary-500/10 dark:text-primary-400">
        <Icon name="sparkles" className="h-7 w-7" />
      </span>
      <h2 className="text-lg font-semibold">This tool is on its way</h2>
      <p className="mx-auto mt-2 max-w-md text-sm text-slate-500 dark:text-slate-400">
        The interface and routing are ready. The file-processing logic is implemented in
        the next build stage — check back soon!
      </p>
    </div>
  )
}
