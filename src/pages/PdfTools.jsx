import { getToolsByCategory, futurePdfTools } from '../data/tools'
import ToolCard from '../components/ui/ToolCard'
import { Icon } from '../components/ui/Icons'
import Seo from '../components/ui/Seo'

export default function PdfTools() {
  const tools = getToolsByCategory('pdf')

  return (
    <div className="animate-rise">
      <Seo
        title="PDF Tools"
        description="Free PDF tools — merge, split, compress, convert JPG to PDF, export PDF to JPG, reorder, rotate and delete pages. All processed locally in your browser."
      />

      <header className="mb-8">
        <span className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-primary-600 text-white shadow-lg shadow-primary-600/30">
          <Icon name="pdf" className="h-7 w-7" />
        </span>
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">PDF Tools</h1>
        <p className="mt-3 max-w-2xl text-lg text-slate-600 dark:text-slate-400">
          Merge, split, compress and organize your PDFs — privately and for free.
        </p>
      </header>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {tools.map((tool) => (
          <ToolCard
            key={tool.slug}
            to={tool.path}
            title={tool.name}
            description={tool.tagline}
            icon={tool.icon}
          />
        ))}
      </div>

      {/* FUTURE / PLANNED TOOLS */}
      <section className="mt-14">
        <h2 className="text-xl font-bold tracking-tight sm:text-2xl">Coming soon</h2>
        <p className="mt-2 max-w-2xl text-slate-600 dark:text-slate-400">
          We are working on more PDF tools. Stay tuned!
        </p>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {futurePdfTools.map((tool) => (
            <div
              key={tool.name}
              className="flex items-center gap-4 rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-5 opacity-70 dark:border-slate-700 dark:bg-slate-900"
            >
              <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-slate-200 text-slate-500 dark:bg-slate-800 dark:text-slate-400">
                <Icon name={tool.icon} className="h-6 w-6" />
              </span>
              <div>
                <h3 className="text-base font-semibold">{tool.name}</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  <span className="inline-flex items-center gap-1.5">
                    <Icon name="sparkles" className="h-3.5 w-3.5" />
                    On the roadmap
                  </span>
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
