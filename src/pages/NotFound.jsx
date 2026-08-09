import { Link } from 'react-router-dom'
import { Icon } from '../components/ui/Icons'
import Seo from '../components/ui/Seo'

export default function NotFound() {
  return (
    <div className="animate-rise flex flex-col items-center py-20 text-center">
      <Seo title="Page not found" description="This page could not be found." />

      <span className="inline-flex h-20 w-20 items-center justify-center rounded-2xl bg-primary-50 text-primary-600 dark:bg-primary-500/10 dark:text-primary-400">
        <Icon name="alert" className="h-10 w-10" />
      </span>
      <h1 className="mt-6 text-4xl font-bold tracking-tight">404 — Page not found</h1>
      <p className="mt-3 max-w-md text-slate-600 dark:text-slate-400">
        The page you are looking for doesn’t exist or has been moved.
      </p>
      <Link
        to="/"
        className="focus-ring mt-8 inline-flex items-center gap-2 rounded-xl bg-primary-600 px-6 py-3 font-semibold text-white shadow-sm transition-colors hover:bg-primary-700"
      >
        <Icon name="arrowRight" className="h-5 w-5" />
        Back to home
      </Link>
    </div>
  )
}
