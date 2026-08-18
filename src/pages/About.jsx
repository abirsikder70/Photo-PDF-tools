import { Link } from 'react-router-dom'
import { categories, tools } from '../data/tools'
import { Icon } from '../components/ui/Icons'
import Seo from '../components/ui/Seo'

const values = [
  {
    icon: 'shield',
    title: 'Privacy first',
    text: 'Every file is processed locally in your browser with open-source libraries. Nothing is ever uploaded to a server.',
  },
  {
    icon: 'zap',
    title: 'Fast and free',
    text: 'No accounts, no sign-ups, no watermarks and no limits. Just pick a tool and go.',
  },
  {
    icon: 'check',
    title: 'Simple to use',
    text: 'A clean interface that works on mobile, tablet and desktop — designed for everyone, including beginners.',
  },
]

export default function About() {
  return (
    <div className="animate-rise">
      <Seo
        title="About"
        description="Learn about Photo-PDF Tools — a free, private, all-in-one suite of image and PDF tools that run entirely in your browser."
      />

      <header className="mb-10">
        <h1 className="text-3xl font-semibold tracking-[-0.02em] sm:text-4xl">About Photo-PDF Tools</h1>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-slate-500 sm:text-lg dark:text-slate-400">
          Photo-PDF Tools is an all-in-one suite of image and PDF tools. Whether you need to
          compress a photo, convert a format or organize a PDF, you can do it here — fast,
          free and completely private.
        </p>
      </header>

      <section className="grid gap-4 md:grid-cols-3">
        {values.map((value) => (
          <div
            key={value.title}
            className="flex gap-4 rounded-2xl border border-slate-200/80 bg-white p-5 shadow-card dark:border-slate-800 dark:bg-slate-900"
          >
            <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-slate-200/70 bg-slate-50 text-primary-600 dark:border-slate-700/60 dark:bg-slate-800/60 dark:text-primary-400">
              <Icon name={value.icon} className="h-5 w-5" />
            </span>
            <div>
              <h2 className="text-[15px] font-semibold tracking-tight">{value.title}</h2>
              <p className="mt-1 text-sm leading-relaxed text-slate-500 dark:text-slate-400">
                {value.text}
              </p>
            </div>
          </div>
        ))}
      </section>

      <section className="mt-14 rounded-3xl border border-slate-200/80 bg-white p-8 shadow-card sm:p-10 dark:border-slate-800 dark:bg-slate-900">
        <h2 className="text-2xl font-semibold tracking-[-0.02em]">How it works</h2>
        <ol className="mt-7 space-y-7">
          {[
            {
              step: 1,
              title: 'Pick a tool',
              text: `Choose from ${tools.length} tools across ${categories.image.label} and ${categories.pdf.label}.`,
            },
            {
              step: 2,
              title: 'Upload your file',
              text: 'Drag and drop a file or click to browse. Preview and file details appear instantly.',
            },
            {
              step: 3,
              title: 'Process and download',
              text: 'Your file is processed locally in your browser. Download the result in one click.',
            },
          ].map((item) => (
            <li key={item.step} className="flex gap-4">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-b from-primary-500 to-primary-600 text-[13px] font-semibold text-white shadow-glow">
                {item.step}
              </span>
              <div>
                <h3 className="text-[15px] font-semibold tracking-tight">{item.title}</h3>
                <p className="mt-1 text-sm leading-relaxed text-slate-500 dark:text-slate-400">{item.text}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section className="relative mt-14 overflow-hidden rounded-3xl bg-slate-950 px-6 py-14 text-center dark:bg-slate-900">
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
            Start using Photo-PDF Tools today
          </h2>
          <p className="mx-auto mt-2 max-w-xl text-slate-400">
            It is free, private and takes seconds.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              to={categories.image.path}
              className="focus-ring inline-flex h-11 w-full items-center justify-center rounded-xl bg-white px-6 text-sm font-semibold text-slate-950 shadow-lift transition-all hover:-translate-y-0.5 hover:bg-slate-100 active:scale-[0.98] sm:w-auto dark:text-slate-900"
            >
              Explore Image Tools
            </Link>
            <Link
              to={categories.pdf.path}
              className="focus-ring inline-flex h-11 w-full items-center justify-center rounded-xl border border-white/15 bg-white/5 px-6 text-sm font-semibold text-white backdrop-blur transition-colors hover:border-white/25 hover:bg-white/10 sm:w-auto"
            >
              Explore PDF Tools
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
