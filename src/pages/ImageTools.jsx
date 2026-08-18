import { getToolsByCategory } from '../data/tools'
import ToolCard from '../components/ui/ToolCard'
import { Icon } from '../components/ui/Icons'
import Seo from '../components/ui/Seo'

export default function ImageTools() {
  const tools = getToolsByCategory('image')

  return (
    <div className="animate-rise">
      <Seo
        title="Image Tools"
        description="Free image tools — compress, resize, crop, convert (JPG, PNG, WebP), compare, rotate and flip images directly in your browser. No uploads."
      />

      <header className="mb-9">
        <div className="mb-5 inline-flex h-13 w-13 items-center justify-center rounded-[14px] bg-gradient-to-b from-primary-500 to-primary-600 p-3.5 text-white shadow-glow">
          <Icon name="photo" className="h-6 w-6" />
        </div>
        <h1 className="text-3xl font-semibold tracking-[-0.02em] sm:text-4xl">Image Tools</h1>
        <p className="mt-3 max-w-2xl text-base leading-relaxed text-slate-500 sm:text-lg dark:text-slate-400">
          Compress, resize, crop, convert and enhance your images — right in your browser.
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
    </div>
  )
}
