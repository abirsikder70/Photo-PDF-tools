import { Link } from 'react-router-dom'
import { categories, tools } from '../../data/tools'
import { Logo } from '../ui/Logo'

export default function Footer() {
  const year = new Date().getFullYear()

  const imageTools = tools.filter((tool) => tool.category === 'image')
  const pdfTools = tools.filter((tool) => tool.category === 'pdf')

  return (
    <footer className="mt-auto border-t border-slate-200/70 bg-white dark:border-slate-800/80 dark:bg-slate-950">
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
        <div className="grid gap-10 md:grid-cols-4">
          <div className="md:col-span-2">
            <Link to="/" className="focus-ring inline-flex items-center gap-2.5 rounded-lg">
              <Logo className="h-7 w-7" />
              <span className="text-[15px] font-semibold tracking-tight">Photo-PDF Tools</span>
            </Link>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-slate-500 dark:text-slate-400">
              All your image and PDF tools in one place. Fast, free and private — every
              file is processed locally in your browser and never uploaded.
            </p>
          </div>

          {[
            { label: 'Footer — Image tools', title: categories.image.label, items: imageTools },
            { label: 'Footer — PDF tools', title: categories.pdf.label, items: pdfTools },
          ].map((group) => (
            <nav key={group.label} aria-label={group.label}>
              <h3 className="text-xs font-semibold uppercase tracking-[0.08em] text-slate-400 dark:text-slate-500">
                {group.title}
              </h3>
              <ul className="mt-4 space-y-2.5 text-sm">
                {group.items.map((tool) => (
                  <li key={tool.slug}>
                    <Link
                      to={tool.path}
                      className="focus-ring rounded text-slate-500 transition-colors hover:text-primary-600 dark:text-slate-400 dark:hover:text-primary-400"
                    >
                      {tool.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-slate-200/70 pt-6 text-[13px] text-slate-500 dark:border-slate-800/80 dark:text-slate-400 sm:flex-row">
          <p>© {year} Photo-PDF Tools. Built for everyone.</p>
          <p className="flex items-center gap-2">
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" aria-hidden="true">
              <span className="absolute inset-0 rounded-full bg-emerald-500/50 animate-ping" aria-hidden="true" />
            </span>
            Files never leave your device
          </p>
        </div>
      </div>
    </footer>
  )
}
