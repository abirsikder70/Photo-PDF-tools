import { useEffect, useState } from 'react'

/**
 * useDarkMode — manages the light / dark theme toggle.
 *
 * - Uses the user's system preference the first time.
 * - Remembers the choice in localStorage for next visits.
 * - Applies the `dark` class on the <html> element, which
 *   Tailwind v4 uses for class-based dark mode.
 */
export function useDarkMode() {
  const [dark, setDark] = useState(() => {
    const stored = localStorage.getItem('photo-pdf-tools-theme')
    if (stored) return stored === 'dark'

    return window.matchMedia('(prefers-color-scheme: dark)').matches
  })

  useEffect(() => {
    const root = document.documentElement
    if (dark) {
      root.classList.add('dark')
    } else {
      root.classList.remove('dark')
    }
    localStorage.setItem('photo-pdf-tools-theme', dark ? 'dark' : 'light')
  }, [dark])

  const toggle = () => setDark((prev) => !prev)

  return { dark, toggle }
}
