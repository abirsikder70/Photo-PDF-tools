import { Link } from 'react-router-dom'
import { categories, tools } from '../../data/tools'
import { Logo } from '../ui/Logo'

export default function Footer() {
  const year = new Date().getFullYear()

  const imageTools = tools.filter((tool) => tool.category === 'image')
  const pdfTools = tools.filter((tool) => tool.category === 'pdf')

  return (
    <footer className="mt-auto border-t border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-950">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="grid gap-10 md:grid-cols-4">
          <div className="md:col-span-2">
            <Link to="/" className="focus-ring inline-flex items-center gap-2 rounded-lg">
              <Logo className="h-8 w-8" />
              <span className="text-lg font-bold tracking-tight">Photo-PDF Tools</span>
            </Link>
            <p className="mt-4 max-w-sm text-sm text-slate-500 dark:text-slate-400">
              All your image and PDF tools in one place. Fast, free and private — every
              file is processed locally in your browser and never uploaded.
            </p>
          </div>

          <nav aria-label="Footer — Image tools">
            <h3 className="text-sm font-semibold">{categories.image.label}</h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              {imageTools.map((tool) => (
                <li key={tool.slug}>
                  <Link
                    to={tool.path}
                    className="focus-ring rounded text-slate-500 hover:text-primary-600 dark:text-slate-400 dark:hover:text-primary-400"
                  >
                    {tool.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Footer — PDF tools">
            <h3 className="text-sm font-semibold">{categories.pdf.label}</h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              {pdfTools.map((tool) => (
                <li key={tool.slug}>
                  <Link
                    to={tool.path}
                    className="focus-ring rounded text-slate-500 hover:text-primary-600 dark:text-slate-400 dark:hover:text-primary-400"
                  >
                    {tool.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-slate-200 pt-6 text-sm text-slate-500 dark:border-slate-800 dark:text-slate-400 sm:flex-row">
          <p>© {year} Photo-PDF Tools. Built for everyone.</p>
          <p className="flex items-center gap-2">
            <span className="inline-block h-2 w-2 rounded-full bg-emerald-500" aria-hidden="true" />
            Files never leave your device
          </p>
        </div>
      </div>
    </footer>
  )
}
