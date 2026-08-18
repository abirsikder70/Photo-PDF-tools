import { Link } from 'react-router-dom'
import { categories } from '../../data/tools'
import { Icon } from './Icons'
import Seo from './Seo'

/**
 * ToolPageLayout — shared layout for every individual tool page.
 * Renders breadcrumb, title, description and a privacy note.
 *
 * @param {object} tool — a tool object from data/tools.js
 * @param {ReactNode} children — the tool's own UI
 */
export default function ToolPageLayout({ tool, children }) {
  const category = categories[tool.category]

  return (
    <div className="animate-rise">
      <Seo title={tool.name} description={tool.description} />

      <nav aria-label="Breadcrumb" className="mb-7 text-[13px]">
        <ol className="flex flex-wrap items-center gap-1 text-slate-500 dark:text-slate-400">
          <li>
            <Link
              to="/"
              className="rounded px-1 py-0.5 transition-colors hover:text-primary-600 dark:hover:text-primary-400"
            >
              Home
            </Link>
          </li>
          <li aria-hidden="true" className="text-slate-300 dark:text-slate-600">
            <Icon name="chevronRight" className="h-3 w-3" />
          </li>
          <li>
            <Link
              to={category.path}
              className="rounded px-1 py-0.5 transition-colors hover:text-primary-600 dark:hover:text-primary-400"
            >
              {category.label}
            </Link>
          </li>
          <li aria-hidden="true" className="text-slate-300 dark:text-slate-600">
            <Icon name="chevronRight" className="h-3 w-3" />
          </li>
          <li aria-current="page" className="px-1 font-medium text-slate-800 dark:text-slate-100">
            {tool.name}
          </li>
        </ol>
      </nav>

      <header className="mb-9">
        <div className="mb-5 inline-flex h-13 w-13 items-center justify-center rounded-[14px] bg-gradient-to-b from-primary-500 to-primary-600 p-3.5 text-white shadow-glow">
          <Icon name={tool.icon} className="h-6 w-6" />
        </div>
        <h1 className="text-3xl font-semibold tracking-[-0.02em] sm:text-4xl">{tool.name}</h1>
        <p className="mt-3 max-w-2xl text-base leading-relaxed text-slate-500 sm:text-lg dark:text-slate-400">
          {tool.description}
        </p>
      </header>

      {children}

      <p className="mt-12 flex items-start gap-3 rounded-2xl border border-emerald-200/70 bg-emerald-50/60 px-4 py-3.5 text-sm text-emerald-800 dark:border-emerald-500/15 dark:bg-emerald-500/5 dark:text-emerald-300 sm:items-center">
        <span className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-emerald-100 text-emerald-600 dark:bg-emerald-500/15 dark:text-emerald-400">
          <Icon name="shield" className="h-4 w-4" />
        </span>
        <span>
          Private by design: your files are processed locally in your browser and never
          uploaded to any server.
        </span>
      </p>
    </div>
  )
}
