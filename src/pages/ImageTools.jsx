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

      <header className="mb-8">
        <span className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-primary-600 text-white shadow-lg shadow-primary-600/30">
          <Icon name="photo" className="h-7 w-7" />
        </span>
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Image Tools</h1>
        <p className="mt-3 max-w-2xl text-lg text-slate-600 dark:text-slate-400">
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
