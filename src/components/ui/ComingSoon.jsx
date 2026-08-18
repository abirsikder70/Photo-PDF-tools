import { Icon } from './Icons'

/**
 * ComingSoon — honest placeholder for tools that are not implemented yet.
 * Shown on tool pages during the staged build (Stage 2/3 replace it).
 */
export default function ComingSoon() {
  return (
    <div className="rounded-2xl border border-dashed border-primary-300/70 bg-primary-50/40 px-6 py-12 text-center dark:border-primary-500/30 dark:bg-primary-500/5">
      <span className="mx-auto mb-4 inline-flex h-14 w-14 items-center justify-center rounded-2xl border border-primary-100 bg-white text-primary-600 shadow-card dark:border-primary-500/20 dark:bg-slate-900 dark:text-primary-400">
        <Icon name="sparkles" className="h-6 w-6" />
      </span>
      <h2 className="text-base font-semibold tracking-tight">This tool is on its way</h2>
      <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-slate-500 dark:text-slate-400">
        The interface and routing are ready. The file-processing logic is implemented in
        the next build stage — check back soon!
      </p>
    </div>
  )
}
