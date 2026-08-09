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

      <nav aria-label="Breadcrumb" className="mb-6 text-sm">
        <ol className="flex flex-wrap items-center gap-1.5 text-slate-500 dark:text-slate-400">
          <li>
            <Link to="/" className="hover:text-primary-600 dark:hover:text-primary-400">
              Home
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li>
            <Link
              to={category.path}
              className="hover:text-primary-600 dark:hover:text-primary-400"
            >
              {category.label}
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li aria-current="page" className="font-medium text-slate-800 dark:text-white">
            {tool.name}
          </li>
        </ol>
      </nav>

      <header className="mb-8">
        <div className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-primary-600 text-white shadow-lg shadow-primary-600/30">
          <Icon name={tool.icon} className="h-7 w-7" />
        </div>
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">{tool.name}</h1>
        <p className="mt-3 max-w-2xl text-lg text-slate-600 dark:text-slate-400">
          {tool.description}
        </p>
      </header>

      {children}

      <p className="mt-10 flex items-center gap-2 rounded-xl bg-emerald-50 px-4 py-3 text-sm text-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-300">
        <Icon name="shield" className="h-5 w-5 shrink-0" />
        <span>
          Private by design: your files are processed locally in your browser and never
          uploaded to any server.
        </span>
      </p>
    </div>
  )
}
