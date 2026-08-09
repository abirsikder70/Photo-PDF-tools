import { Link } from 'react-router-dom'
import { Icon } from './Icons'

/**
 * ToolCard — a clickable card used to list tools on the homepage and
 * the Image/PDF tool listing pages.
 *
 * @param {string}   to         — route the card links to
 * @param {string}   title      — tool name
 * @param {string}   icon       — icon name from Icons.jsx
 * @param {string}   description — short one-line description
 */
export default function ToolCard({ to, title, description, icon }) {
  return (
    <Link
      to={to}
      className="focus-ring group flex flex-col rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-primary-200 hover:shadow-lg hover:shadow-primary-500/10 dark:border-slate-800 dark:bg-slate-900 dark:hover:border-primary-700"
    >
      <span className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-primary-50 text-primary-600 transition-colors group-hover:bg-primary-600 group-hover:text-white dark:bg-primary-500/10 dark:text-primary-400 dark:group-hover:bg-primary-600 dark:group-hover:text-white">
        <Icon name={icon} className="h-6 w-6" />
      </span>
      <h3 className="text-base font-semibold">{title}</h3>
      <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{description}</p>
      <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary-600 dark:text-primary-400">
        Open tool
        <Icon
          name="chevronRight"
          className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
        />
      </span>
    </Link>
  )
}
