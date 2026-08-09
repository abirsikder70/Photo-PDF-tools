import { useEffect } from 'react'

/**
 * Seo — sets the page <title>, meta description and Open Graph tags
 * for the current page.
 *
 * Usage: <Seo title="Compress Image" description="Reduce image file size." />
 */
export default function Seo({ title, description }) {
  useEffect(() => {
    const fullTitle = title ? `${title} — PixelTools` : 'PixelTools'
    document.title = fullTitle

    function setMeta(attr, name, content) {
      if (!content) return
      let meta = document.querySelector(`meta[${attr}="${name}"]`)
      if (!meta) {
        meta = document.createElement('meta')
        meta.setAttribute(attr, name)
        document.head.appendChild(meta)
      }
      meta.content = content
    }

    setMeta('name', 'description', description)
    setMeta('property', 'og:title', fullTitle)
    setMeta('property', 'og:description', description)
    setMeta('property', 'og:type', 'website')
  }, [title, description])

  return null
}
