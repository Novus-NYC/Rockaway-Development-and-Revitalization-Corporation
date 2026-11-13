export function SocialIcon({ name }: { name: string }) {
  const common = { width: 16, height: 16, viewBox: "0 0 24 24", "aria-hidden": true, fill: "currentColor" } as const
  if (name === "Facebook")
    return (
      <svg {...common}>
        <path d="M13.5 21v-7.6h2.6l.4-3h-3V8.5c0-.9.3-1.5 1.6-1.5h1.6V4.3c-.3 0-1.2-.1-2.3-.1-2.3 0-3.9 1.4-3.9 4v2.2H8v3h2.5V21h3z" />
      </svg>
    )
  if (name === "Instagram")
    return (
      <svg {...common} fill="none" stroke="currentColor" strokeWidth="1.7">
        <rect x="3.5" y="3.5" width="17" height="17" rx="4.5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.2" cy="6.8" r="0.9" fill="currentColor" stroke="none" />
      </svg>
    )
  return (
    <svg {...common}>
      <path d="M21 6.3c-.6.3-1.3.5-2 .6.7-.4 1.300-1.100 1.500-1.900-.7.4-1.400.7-2.200.8a3.500 3.500 0 0 0-6 3.200A9.900 9.900 0 0 1 4.200 5.300a3.500 3.500 0 0 0 1.100 4.700c-.6 0-1.100-.2-1.600-.4 0 1.700 1.200 3.100 2.800 3.500-.5.100-1.100.200-1.600.100a3.500 3.500 0 0 0 3.300 2.400A7 7 0 0 1 3 17.100a9.900 9.900 0 0 0 5.400 1.600c6.500 0 10-5.400 10-10v-.5c.700-.5 1.300-1.100 1.700-1.800l.9-.1z" />
    </svg>
  )
}

/** The disc from the RDRC logo (traced from the original artwork), used large and quiet. */
export function Seal({ className = "" }: { className?: string }) {
  return <span aria-hidden="true" className={`seal ${className}`} />
}
