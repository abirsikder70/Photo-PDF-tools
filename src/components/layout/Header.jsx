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
    `focus-ring rounded-lg px-3 py-1.5 text-[13.5px] font-medium transition-colors ${
      isActive
        ? 'bg-primary-50/80 text-primary-700 dark:bg-primary-500/10 dark:text-primary-300'
        : 'text-slate-600 hover:bg-slate-100/70 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800/60 dark:hover:text-slate-100'
    }`

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/70 bg-white/75 backdrop-blur-xl backdrop-saturate-150 dark:border-slate-800/80 dark:bg-slate-950/75">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
        <Link
          to="/"
          className="focus-ring group flex items-center gap-2.5 rounded-lg"
          aria-label="Photo-PDF Tools — home"
          onClick={() => setOpen(false)}
        >
          <Logo className="h-7 w-7 transition-transform duration-300 group-hover:scale-105" />
          <span className="text-[15px] font-semibold tracking-tight">Photo-PDF Tools</span>
        </Link>

        <nav className="hidden items-center gap-0.5 md:flex" aria-label="Primary">
          {navLinks.map((link) => (
            <NavLink key={link.to} to={link.to} className={navLinkClass}>
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={toggle}
            aria-label={dark ? 'Switch to light mode' : 'Switch to dark mode'}
            className="focus-ring rounded-lg p-2 text-slate-500 transition-colors hover:bg-slate-100/70 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800/60 dark:hover:text-slate-100"
          >
            {dark ? <Icon name="sun" className="h-[18px] w-[18px]" /> : <Icon name="moon" className="h-[18px] w-[18px]" />}
          </button>

          <Link
            to="/image-tools"
            className="btn-primary-sm mr-1 hidden sm:inline-flex"
          >
            Get Started
          </Link>

          <button
            type="button"
            onClick={() => setOpen((prev) => !prev)}
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            className="focus-ring rounded-lg p-2 text-slate-600 hover:bg-slate-100/70 dark:text-slate-400 dark:hover:bg-slate-800/60 md:hidden"
          >
            <Icon name={open ? 'close' : 'menu'} className="h-[22px] w-[22px]" />
          </button>
        </div>
      </div>

      {open && (
        <nav
          aria-label="Mobile"
          className="border-t border-slate-200/70 bg-white/95 px-4 py-3 backdrop-blur-xl md:hidden dark:border-slate-800/80 dark:bg-slate-950/95"
        >
          <ul className="flex flex-col gap-0.5">
            {navLinks.map((link) => (
              <li key={link.to}>
                <NavLink
                  to={link.to}
                  onClick={() => setOpen(false)}
                  className={({ isActive }) =>
                    `block ${navLinkClass({ isActive })} px-3 py-2.5`
                  }
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
