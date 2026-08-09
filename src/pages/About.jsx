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
        description="Learn about PixelTools — a free, private, all-in-one suite of image and PDF tools that run entirely in your browser."
      />

      <header className="mb-10">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">About PixelTools</h1>
        <p className="mt-4 max-w-2xl text-lg text-slate-600 dark:text-slate-400">
          PixelTools is an all-in-one suite of image and PDF tools. Whether you need to
          compress a photo, convert a format or organize a PDF, you can do it here — fast,
          free and completely private.
        </p>
      </header>

      <section className="grid gap-6 md:grid-cols-3">
        {values.map((value) => (
          <div
            key={value.title}
            className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900"
          >
            <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-primary-50 text-primary-600 dark:bg-primary-500/10 dark:text-primary-400">
              <Icon name={value.icon} className="h-5 w-5" />
            </span>
            <h2 className="mt-4 text-base font-semibold">{value.title}</h2>
            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{value.text}</p>
          </div>
        ))}
      </section>

      <section className="mt-12 rounded-3xl border border-slate-200 bg-white p-8 dark:border-slate-800 dark:bg-slate-900">
        <h2 className="text-2xl font-bold tracking-tight">How it works</h2>
        <ol className="mt-6 space-y-6">
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
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary-600 text-sm font-bold text-white">
                {item.step}
              </span>
              <div>
                <h3 className="font-semibold">{item.title}</h3>
                <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{item.text}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section className="mt-12 rounded-3xl bg-gradient-to-r from-primary-600 to-violet-600 px-6 py-12 text-center text-white">
        <h2 className="text-2xl font-bold tracking-tight">Start using PixelTools today</h2>
        <p className="mx-auto mt-2 max-w-xl text-primary-100">
          It is free, private and takes seconds.
        </p>
        <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link
            to={categories.image.path}
            className="focus-ring inline-flex w-full items-center justify-center rounded-xl bg-white px-6 py-3 font-semibold text-primary-700 shadow-lg hover:-translate-y-0.5 sm:w-auto"
          >
            Explore Image Tools
          </Link>
          <Link
            to={categories.pdf.path}
            className="focus-ring inline-flex w-full items-center justify-center rounded-xl border border-white/30 bg-white/10 px-6 py-3 font-semibold backdrop-blur hover:bg-white/20 sm:w-auto"
          >
            Explore PDF Tools
          </Link>
        </div>
      </section>
    </div>
  )
}
