/**
 * Icons.jsx — a small set of inline SVG icons.
 *
 * Every icon is a 24x24 outline icon that inherits the current text color,
 * so you can size and color it with Tailwind classes:
 *
 *   <Icon name="compress" className="h-6 w-6 text-indigo-500" />
 */

const paths = {
  compress: (
    <>
      <path d="M8 3H3v5M21 3l-6 6M3 21l6-6M16 21h5v-5M3 3l6 6M21 21l-6-6M8 21H3v-5M21 8h-5" />
    </>
  ),
  resize: (
    <>
      <path d="M8 3H3v5M21 3l-6 6M3 21l6-6M16 21h5v-5M3 3l6 6M21 21l-6-6M3 8V3h5M21 8V3h-5M16 3h5v5M8 21H3v-5" />
    </>
  ),
  crop: (
    <>
      <path d="M6 2v14a2 2 0 0 0 2 2h14M18 22V8a2 2 0 0 0-2-2H2" />
    </>
  ),
  convert: (
    <>
      <path d="M8 7h12m0 0l-4-4m4 4l-4 4M16 17H4m0 0l4 4m-4-4l4-4" />
    </>
  ),
  compare: (
    <>
      <path d="M9 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h4m6-18h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4M12 3v18" />
    </>
  ),
  rotate: (
    <>
      <path d="M4.031 9.865A8.25 8.25 0 1 1 3.2 12M3 4.5V9h4.5" />
    </>
  ),
  rotateAlt: (
    <>
      <path d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
    </>
  ),
  merge: (
    <>
      <path d="M9 21a3 3 0 0 1-3-3V9m0 0l-3 3m3-3l3 3M15 3a3 3 0 0 1 3 3v12m0 0l3-3m-3 3l-3-3" />
    </>
  ),
  split: (
    <>
      <path d="M5 3h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2zM12 3v18" />
    </>
  ),
  pdf: (
    <>
      <path d="M4 3h10l6 6v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2zM14 3v6h6" />
    </>
  ),
  photo: (
    <>
      <path d="M3 5h18a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2zm15 5a1 1 0 1 0 0-2 1 1 0 0 0 0 2zM4 16l5-5 3 3 3-3 5 5" />
    </>
  ),
  reorder: (
    <>
      <path d="M8 4v16M8 4l-3 3M8 4l3 3M16 20V4M16 20l-3-3M16 20l3-3" />
    </>
  ),
  trash: (
    <>
      <path d="M3 6h18M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2m3 0v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6h14z" />
    </>
  ),
  file: (
    <>
      <path d="M3 7V5a2 2 0 0 1 2-2h5l7 7v7a2 2 0 0 1-2 2h-2" />
      <path d="M8 21H6a2 2 0 0 1-2-2v-2M14 3v6h6" />
    </>
  ),
  upload: (
    <>
      <path d="M12 16V4m0 0L8 8m4-4l4 4M4 16v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2" />
    </>
  ),
  download: (
    <>
      <path d="M12 3v12m0 0l-4-4m4 4l4-4M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2" />
    </>
  ),
  check: (
    <>
      <path d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0z" />
    </>
  ),
  shield: (
    <>
      <path d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
    </>
  ),
  zap: <path d="M13 3L4 14h6l-1 7 9-11h-6l1-7z" />,
  lock: (
    <>
      <path d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25z" />
    </>
  ),
  sparkles: (
    <>
      <path d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09z" />
    </>
  ),
  moon: (
    <>
      <path d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998z" />
    </>
  ),
  sun: (
    <>
      <path d="M12 4.5V2.25m0 19.5V21m9-9h-2.25M5.25 12H3m15.364-6.364l-1.59 1.59M7.23 16.773l-1.59 1.59M19.5 12a7.5 7.5 0 1 1-15 0 7.5 7.5 0 0 1 15 0z" />
    </>
  ),
  menu: (
    <>
      <path d="M3.75 6.75h16.5M3.75 12h16.5M3.75 17.25h16.5" />
    </>
  ),
  close: (
    <>
      <path d="M6 18L18 6M6 6l12 12" />
    </>
  ),
  chevronRight: (
    <>
      <path d="M8.25 4.5l7.5 7.5-7.5 7.5" />
    </>
  ),
  arrowRight: (
    <>
      <path d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
    </>
  ),
  alert: (
    <>
      <path d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
    </>
  ),
  info: (
    <>
      <path d="M11.25 11.25l.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0zm-9-3.75h.008v.008H12V8.25z" />
    </>
  ),
}

/**
 * Renders one of the icons above.
 * @param {string} name — key from `paths`
 * @param {string} [className] — Tailwind classes (size / color)
 */
export function Icon({ name, className = 'h-6 w-6' }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.8}
      stroke="currentColor"
      className={className}
      aria-hidden="true"
    >
      {paths[name] || paths.file}
    </svg>
  )
}
