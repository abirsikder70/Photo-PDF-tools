import { Link } from 'react-router-dom'
import { categories, homepageSections, tools } from '../data/tools'
import ToolCard from '../components/ui/ToolCard'
import { Icon } from '../components/ui/Icons'
import Seo from '../components/ui/Seo'

function resolveCard(card) {
  if (card.slug === 'convert') {
    return {
      title: card.label,
      description:
        'JPG ⇄ PNG ⇄ WebP conversions for any image.',
      icon: card.icon,
      to: '/image-tools',
    }
  }
  const tool = tools.find((t) => t.slug === card.slug)
  return {
    title: tool.name,
    description: tool.tagline,
    icon: tool.icon,
    to: tool.path,
  }
}

const trustBadges = [
  {
    icon: 'shield',
    title: 'Private by design',
    text: 'Files are processed locally in your browser and never uploaded.',
  },
  {
    icon: 'zap',
    title: 'Fast & free',
    text: 'No accounts, no sign-ups, no waiting for a server queue.',
  },
  {
    icon: 'check',
    title: 'Works everywhere',
    text: 'Image and PDF tools for mobile, tablet and desktop browsers.',
  },
]

export default function Home() {
  return (
    <div>
      <Seo
        description="Photo-PDF Tools — all your image and PDF tools in one place. Compress, resize, crop and convert images; merge, split and compress PDFs. Free and private."
      />

      {/* HERO */}
      <section className="relative overflow-hidden rounded-3xl border border-slate-200/70 bg-white px-6 py-20 text-center shadow-card sm:py-24 dark:border-slate-800/80 dark:bg-slate-900">
        <div
          aria-hidden="true"
          className="bg-dot-grid pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_60%_60%_at_50%_40%,black_30%,transparent_75%)]"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-40 left-1/2 h-96 w-[42rem] -translate-x-1/2 rounded-full bg-primary-500/10 blur-3xl dark:bg-primary-500/15"
        />

        <div className="relative mx-auto max-w-3xl">
          <span className="inline-flex items-center gap-2 rounded-full border border-slate-200/80 bg-white/80 py-1.5 pl-2 pr-4 text-[13px] font-medium text-slate-600 shadow-card backdrop-blur dark:border-slate-700/80 dark:bg-slate-900/80 dark:text-slate-300">
            <span className="inline-flex items-center gap-1 rounded-full bg-primary-50 px-2 py-0.5 text-[11px] font-semibold text-primary-700 dark:bg-primary-500/15 dark:text-primary-300">
              <Icon name="sparkles" className="h-3 w-3" />
              100% Free
            </span>
            No uploads · Works offline-ready
          </span>

          <h1 className="mt-7 text-4xl font-semibold tracking-[-0.03em] text-slate-900 sm:text-5xl lg:text-[3.75rem] lg:leading-[1.05] dark:text-white">
            Photo-PDF Tools
          </h1>
          <p className="mt-4 text-xl font-medium tracking-tight text-slate-700 sm:text-2xl dark:text-slate-200">
            All Your Image &amp; PDF Tools in One Place
          </p>
          <p className="mx-auto mt-4 max-w-xl leading-relaxed text-slate-500 dark:text-slate-400">
            Compress, resize, crop and convert images. Merge, split and organize PDFs.
            Everything runs privately in your browser — free, fast and secure.
          </p>

          <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link to="/image-tools" className="btn-primary w-full sm:w-auto">
              Explore Image Tools
              <Icon name="arrowRight" className="h-4 w-4" />
            </Link>
            <Link to="/pdf-tools" className="btn-secondary w-full sm:w-auto">
              Explore PDF Tools
            </Link>
          </div>
        </div>
      </section>

      {/* TRUST BADGES */}
      <section className="mt-6 grid gap-4 sm:grid-cols-3" aria-label="Why use Photo-PDF Tools">
        {trustBadges.map((badge) => (
          <div
            key={badge.title}
            className="flex gap-4 rounded-2xl border border-slate-200/80 bg-white p-5 shadow-card dark:border-slate-800 dark:bg-slate-900"
          >
            <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-slate-200/70 bg-slate-50 text-primary-600 dark:border-slate-700/60 dark:bg-slate-800/60 dark:text-primary-400">
              <Icon name={badge.icon} className="h-5 w-5" />
            </span>
            <div>
              <h2 className="text-[15px] font-semibold tracking-tight">{badge.title}</h2>
              <p className="mt-1 text-sm leading-relaxed text-slate-500 dark:text-slate-400">
                {badge.text}
              </p>
            </div>
          </div>
        ))}
      </section>

      {/* TOOL SECTIONS */}
      {homepageSections.map((section) => {
        const category = categories[section.section]
        return (
          <section key={section.section} className="mt-20">
            <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
              <div>
                <h2 className="text-2xl font-semibold tracking-[-0.02em] sm:text-3xl">
                  {section.title}
                </h2>
                <p className="mt-2 max-w-xl leading-relaxed text-slate-500 dark:text-slate-400">
                  {section.description}
                </p>
              </div>
              <Link
                to={category.path}
                className="focus-ring group inline-flex items-center gap-1 rounded-lg text-sm font-semibold text-primary-600 transition-colors hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300"
              >
                View all {category.label}
                <Icon
                  name="arrowRight"
                  className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
                />
              </Link>
            </div>

            <div className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {section.cards.map((card) => {
                const resolved = resolveCard(card)
                return (
                  <ToolCard
                    key={resolved.title}
                    to={resolved.to}
                    title={resolved.title}
                    description={resolved.description}
                    icon={resolved.icon}
                  />
                )
              })}
            </div>
          </section>
        )
      })}

      {/* PRIVACY / WHY SECTION */}
      <section className="mt-20 rounded-3xl border border-slate-200/80 bg-white p-8 shadow-card sm:p-12 dark:border-slate-800 dark:bg-slate-900">
        <div className="grid items-center gap-10 md:grid-cols-2">
          <div>
            <h2 className="text-2xl font-semibold tracking-[-0.02em] sm:text-3xl">
              Your files stay on your device
            </h2>
            <p className="mt-4 leading-relaxed text-slate-500 dark:text-slate-400">
              Photo-PDF Tools runs entirely in your browser using open-source libraries. Your
              images and documents are never uploaded to a server, never stored, and never
              seen by anyone else.
            </p>
            <ul className="mt-6 space-y-3 text-sm">
              {[
                'No account or sign-up required',
                'No file size caps from our side',
                'Open-source processing libraries',
              ].map((item) => (
                <li key={item} className="flex items-center gap-3">
                  <span className="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-50 text-emerald-600 ring-1 ring-emerald-600/15 dark:bg-emerald-500/10 dark:text-emerald-400 dark:ring-emerald-400/15">
                    <Icon name="check" className="h-3.5 w-3.5" />
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="flex justify-center">
            <div className="grid max-w-sm grid-cols-2 gap-3">
              {['Compress', 'Resize', 'Convert', 'Merge', 'Split', 'Rotate'].map(
                (word) => (
                  <span
                    key={word}
                    className="rounded-xl border border-slate-200/80 bg-slate-50/80 px-6 py-4 text-center text-sm font-semibold tracking-tight text-slate-600 shadow-card transition-all duration-200 hover:-translate-y-0.5 hover:border-primary-200 hover:text-primary-700 dark:border-slate-700/60 dark:bg-slate-800/50 dark:text-slate-300 dark:hover:border-primary-500/40 dark:hover:text-primary-300"
                  >
                    {word}
                  </span>
                ),
              )}
            </div>
          </div>
        </div>
      </section>

      {/* CTA BANNER */}
      <section className="relative mt-20 overflow-hidden rounded-3xl bg-slate-950 px-6 py-16 text-center sm:px-12 dark:bg-slate-900">
        <div
          aria-hidden="true"
          className="bg-dot-grid pointer-events-none absolute inset-0 opacity-60 [mask-image:radial-gradient(ellipse_65%_65%_at_50%_50%,black_30%,transparent_75%)]"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-32 left-1/2 h-80 w-[36rem] -translate-x-1/2 rounded-full bg-primary-600/25 blur-3xl"
        />

        <div className="relative">
          <h2 className="text-2xl font-semibold tracking-[-0.02em] text-white sm:text-3xl">
            Ready to get started?
          </h2>
          <p className="mx-auto mt-2 max-w-xl text-slate-400">
            Pick a tool and start right now — no uploads, no waiting.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              to="/image-tools"
              className="focus-ring inline-flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-white px-6 text-sm font-semibold text-slate-950 shadow-lift transition-all hover:-translate-y-0.5 hover:bg-slate-100 active:scale-[0.98] sm:w-auto dark:text-slate-900"
            >
              Image Tools
            </Link>
            <Link
              to="/pdf-tools"
              className="focus-ring inline-flex h-11 w-full items-center justify-center rounded-xl border border-white/15 bg-white/5 px-6 text-sm font-semibold text-white backdrop-blur transition-colors hover:border-white/25 hover:bg-white/10 sm:w-auto"
            >
              PDF Tools
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
