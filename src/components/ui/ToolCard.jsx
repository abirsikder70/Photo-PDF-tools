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
      className="focus-ring group relative flex flex-col rounded-2xl border border-slate-200/80 bg-white p-5 shadow-card transition-all duration-200 hover:-translate-y-1 hover:border-primary-200 hover:shadow-lift dark:border-slate-800 dark:bg-slate-900 dark:hover:border-primary-500/40"
    >
      <span className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200/70 bg-slate-50 text-slate-600 transition-all duration-200 group-hover:border-primary-100 group-hover:bg-primary-50 group-hover:text-primary-600 dark:border-slate-700/60 dark:bg-slate-800/60 dark:text-slate-300 dark:group-hover:border-primary-500/30 dark:group-hover:bg-primary-500/10 dark:group-hover:text-primary-400">
        <Icon name={icon} className="h-5 w-5" />
      </span>
      <h3 className="text-[15px] font-semibold tracking-tight">{title}</h3>
      <p className="mt-1 text-sm leading-relaxed text-slate-500 dark:text-slate-400">
        {description}
      </p>
      <span className="mt-4 inline-flex items-center gap-1 text-[13px] font-medium text-slate-400 transition-colors group-hover:text-primary-600 dark:text-slate-500 dark:group-hover:text-primary-400">
        Open tool
        <Icon
          name="chevronRight"
          className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5"
        />
      </span>
    </Link>
  )
}
