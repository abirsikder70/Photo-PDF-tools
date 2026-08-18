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

      <header className="mb-9">
        <div className="mb-5 inline-flex h-13 w-13 items-center justify-center rounded-[14px] bg-gradient-to-b from-primary-500 to-primary-600 p-3.5 text-white shadow-glow">
          <Icon name="pdf" className="h-6 w-6" />
        </div>
        <h1 className="text-3xl font-semibold tracking-[-0.02em] sm:text-4xl">PDF Tools</h1>
        <p className="mt-3 max-w-2xl text-base leading-relaxed text-slate-500 sm:text-lg dark:text-slate-400">
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
      <section className="mt-16">
        <h2 className="text-xl font-semibold tracking-[-0.02em] sm:text-2xl">Coming soon</h2>
        <p className="mt-2 max-w-2xl text-slate-500 dark:text-slate-400">
          We are working on more PDF tools. Stay tuned!
        </p>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {futurePdfTools.map((tool) => (
            <div
              key={tool.name}
              className="flex items-center gap-4 rounded-2xl border border-dashed border-slate-300/80 bg-slate-50/60 p-5 dark:border-slate-700 dark:bg-slate-900/60"
            >
              <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-slate-200/70 bg-white text-slate-400 dark:border-slate-700/60 dark:bg-slate-800/60 dark:text-slate-500">
                <Icon name={tool.icon} className="h-5 w-5" />
              </span>
              <div>
                <h3 className="text-[15px] font-semibold tracking-tight">{tool.name}</h3>
                <p className="mt-0.5 text-[13px] text-slate-500 dark:text-slate-400">
                  <span className="inline-flex items-center gap-1.5">
                    <Icon name="sparkles" className="h-3 w-3" />
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
