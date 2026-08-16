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
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary-600 via-primary-600 to-violet-600 px-6 py-16 text-center text-white sm:py-20 lg:py-24">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-24 -right-24 h-72 w-72 rounded-full bg-white/10 blur-3xl"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-violet-400/20 blur-3xl"
        />

        <div className="relative mx-auto max-w-3xl">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-sm font-medium backdrop-blur">
            <Icon name="sparkles" className="h-4 w-4" />
            100% Free · No uploads · Works offline-ready
          </span>

          <h1 className="mt-6 text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
            Photo-PDF Tools
          </h1>
          <p className="mt-4 text-xl font-medium text-primary-100 sm:text-2xl">
            All Your Image &amp; PDF Tools in One Place
          </p>
          <p className="mx-auto mt-4 max-w-xl text-primary-100/90">
            Compress, resize, crop and convert images. Merge, split and organize PDFs.
            Everything runs privately in your browser — free, fast and secure.
          </p>

          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              to="/image-tools"
              className="focus-ring inline-flex w-full items-center justify-center gap-2 rounded-xl bg-white px-6 py-3 font-semibold text-primary-700 shadow-lg transition-transform hover:-translate-y-0.5 sm:w-auto"
            >
              Explore Image Tools
              <Icon name="arrowRight" className="h-5 w-5" />
            </Link>
            <Link
              to="/pdf-tools"
              className="focus-ring inline-flex w-full items-center justify-center gap-2 rounded-xl border border-white/30 bg-white/10 px-6 py-3 font-semibold text-white backdrop-blur transition-colors hover:bg-white/20 sm:w-auto"
            >
              Explore PDF Tools
            </Link>
          </div>
        </div>
      </section>

      {/* TRUST BADGES */}
      <section className="mt-12 grid gap-6 sm:grid-cols-3" aria-label="Why use Photo-PDF Tools">
        {trustBadges.map((badge) => (
          <div
            key={badge.title}
            className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900"
          >
            <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-primary-50 text-primary-600 dark:bg-primary-500/10 dark:text-primary-400">
              <Icon name={badge.icon} className="h-5 w-5" />
            </span>
            <h2 className="mt-4 text-base font-semibold">{badge.title}</h2>
            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{badge.text}</p>
          </div>
        ))}
      </section>

      {/* TOOL SECTIONS */}
      {homepageSections.map((section) => {
        const category = categories[section.section]
        return (
          <section key={section.section} className="mt-16">
            <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
              <div>
                <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
                  {section.title}
                </h2>
                <p className="mt-2 max-w-xl text-slate-600 dark:text-slate-400">
                  {section.description}
                </p>
              </div>
              <Link
                to={category.path}
                className="focus-ring inline-flex items-center gap-1 rounded-lg text-sm font-semibold text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300"
              >
                View all {category.label}
                <Icon name="arrowRight" className="h-4 w-4" />
              </Link>
            </div>

            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
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
      <section className="mt-16 rounded-3xl border border-slate-200 bg-white p-8 sm:p-12 dark:border-slate-800 dark:bg-slate-900">
        <div className="grid items-center gap-8 md:grid-cols-2">
          <div>
            <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
              Your files stay on your device
            </h2>
            <p className="mt-4 text-slate-600 dark:text-slate-400">
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
                  <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400">
                    <Icon name="check" className="h-4 w-4" />
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="flex justify-center">
            <div className="grid max-w-sm grid-cols-2 gap-4">
              {['Compress', 'Resize', 'Convert', 'Merge', 'Split', 'Rotate'].map(
                (word) => (
                  <span
                    key={word}
                    className="rounded-2xl border border-primary-100 bg-primary-50 px-6 py-5 text-center font-semibold text-primary-700 dark:border-primary-500/20 dark:bg-primary-500/10 dark:text-primary-300"
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
      <section className="mt-16 rounded-3xl bg-gradient-to-r from-primary-600 to-violet-600 px-6 py-12 text-center text-white sm:px-12">
        <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
          Ready to get started?
        </h2>
        <p className="mx-auto mt-2 max-w-xl text-primary-100">
          Pick a tool and start right now — no uploads, no waiting.
        </p>
        <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link
            to="/image-tools"
            className="focus-ring inline-flex w-full items-center justify-center rounded-xl bg-white px-6 py-3 font-semibold text-primary-700 shadow-lg hover:-translate-y-0.5 sm:w-auto"
          >
            Image Tools
          </Link>
          <Link
            to="/pdf-tools"
            className="focus-ring inline-flex w-full items-center justify-center rounded-xl border border-white/30 bg-white/10 px-6 py-3 font-semibold backdrop-blur hover:bg-white/20 sm:w-auto"
          >
            PDF Tools
          </Link>
        </div>
      </section>
    </div>
  )
}
