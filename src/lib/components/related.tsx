import Link from "next/link"

/** Closing links at the foot of a page: the related pages from the site menu. */
export default function Related({ title = "Related", links }: { title?: string; links: { label: string; href: string }[] }) {
  return (
    <nav aria-label={title} className="border-t border-line bg-mist">
      <div className="wrap grid12 gap-y-4 py-[var(--s-tight)]">
        <p className="t-label col-span-12 lg:col-span-3">{title}</p>
        <ul className="col-span-12 grid gap-x-[var(--gutter)] lg:col-span-9 sm:grid-cols-2">
          {links.map((l) => (
            <li key={l.href} className="border-t border-line">
              <Link href={l.href} className="group flex items-baseline justify-between gap-4 py-4">
                <span className="t-h3"><span className="draw">{l.label}</span></span>
                <span className="arrow text-brass-ink" aria-hidden="true">→</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  )
}
