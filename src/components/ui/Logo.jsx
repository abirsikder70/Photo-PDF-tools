/**
 * Logo — the PixelTools logo mark (matches public/favicon.svg).
 */
export function Logo({ className = 'h-8 w-8' }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 32 32"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="pt-logo-g" x1="0" y1="0" x2="32" y2="32" gradientUnits="userSpaceOnUse">
          <stop stopColor="#6366f1" />
          <stop offset="1" stopColor="#8b5cf6" />
        </linearGradient>
      </defs>
      <rect x="2" y="2" width="28" height="28" rx="7" fill="url(#pt-logo-g)" />
      <rect x="8" y="8" width="9" height="9" rx="1.5" fill="white" fillOpacity="0.95" />
      <rect x="19" y="8" width="5" height="5" rx="1.5" fill="white" fillOpacity="0.55" />
      <rect x="8" y="19" width="5" height="5" rx="1.5" fill="white" fillOpacity="0.55" />
      <path
        d="M15.5 21.5h8a1 1 0 0 0 1-1v-4"
        stroke="white"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
