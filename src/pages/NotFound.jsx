import { Link } from 'react-router-dom'
import { Icon } from '../components/ui/Icons'
import Seo from '../components/ui/Seo'

export default function NotFound() {
  return (
    <div className="animate-rise flex flex-col items-center py-24 text-center">
      <Seo title="Page not found" description="This page could not be found." />

      <span className="inline-flex h-16 w-16 items-center justify-center rounded-2xl border border-slate-200/70 bg-white text-primary-600 shadow-card dark:border-slate-700/60 dark:bg-slate-900 dark:text-primary-400">
        <Icon name="alert" className="h-8 w-8" />
      </span>
      <h1 className="mt-7 text-3xl font-semibold tracking-[-0.02em] sm:text-4xl">404 — Page not found</h1>
      <p className="mt-3 max-w-md leading-relaxed text-slate-500 dark:text-slate-400">
        The page you are looking for doesn’t exist or has been moved.
      </p>
      <Link to="/" className="btn-primary mt-8">
        <Icon name="arrowRight" className="h-4 w-4" />
        Back to home
      </Link>
    </div>
  )
}
