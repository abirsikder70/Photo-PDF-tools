import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { useDarkMode } from '../../hooks/useDarkMode'
import { Icon } from '../ui/Icons'
import { Logo } from '../ui/Logo'

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/image-tools', label: 'Image Tools' },
  { to: '/pdf-tools', label: 'PDF Tools' },
  { to: '/about', label: 'About' },
]

export default function Header() {
  const { dark, toggle } = useDarkMode()
  const [open, setOpen] = useState(false)

  const navLinkClass = ({ isActive }) =>
    `focus-ring rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
      isActive
        ? 'bg-primary-50 text-primary-700 dark:bg-primary-500/10 dark:text-primary-400'
        : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white'
    }`

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/80 backdrop-blur-md dark:border-slate-800 dark:bg-slate-950/80">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
        <Link
          to="/"
          className="focus-ring flex items-center gap-2 rounded-lg"
          aria-label="Photo-PDF Tools — home"
          onClick={() => setOpen(false)}
        >
          <Logo className="h-8 w-8" />
          <span className="text-lg font-bold tracking-tight">Photo-PDF Tools</span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex" aria-label="Primary">
          {navLinks.map((link) => (
            <NavLink key={link.to} to={link.to} className={navLinkClass}>
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={toggle}
            aria-label={dark ? 'Switch to light mode' : 'Switch to dark mode'}
            className="focus-ring rounded-lg p-2 text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white"
          >
            {dark ? <Icon name="sun" className="h-5 w-5" /> : <Icon name="moon" className="h-5 w-5" />}
          </button>

          <Link
            to="/image-tools"
            className="focus-ring hidden rounded-xl bg-primary-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-primary-700 sm:inline-flex"
          >
            Get Started
          </Link>

          <button
            type="button"
            onClick={() => setOpen((prev) => !prev)}
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            className="focus-ring rounded-lg p-2 text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800 md:hidden"
          >
            <Icon name={open ? 'close' : 'menu'} className="h-6 w-6" />
          </button>
        </div>
      </div>

      {open && (
        <nav
          aria-label="Mobile"
          className="border-t border-slate-200 bg-white px-4 py-3 md:hidden dark:border-slate-800 dark:bg-slate-950"
        >
          <ul className="flex flex-col gap-1">
            {navLinks.map((link) => (
              <li key={link.to}>
                <NavLink
                  to={link.to}
                  onClick={() => setOpen(false)}
                  className={navLinkClass}
                >
                  {link.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  )
}
