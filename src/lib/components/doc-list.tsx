import { Arrow } from "./icons"

export type Doc = { label: string; href: string; note?: string }

const isFile = (href: string) => href.startsWith("/documents/")

/** A list of documents or outside links: one row each, the whole row is the link. */
export default function DocList({ docs, className = "" }: { docs: Doc[]; className?: string }) {
  return (
    <ul className={`border-b border-line ${className}`}>
      {docs.map((d, i) => (
        <li key={d.href + i} className="border-t border-line" data-reveal style={{ "--i": Math.min(i, 6) } as React.CSSProperties}>
          <a href={d.href} target="_blank" rel="noopener noreferrer" className="group grid grid-cols-[minmax(0,1fr)_auto] items-baseline gap-x-6 py-4">
            <span className="t-h3">
              <span className="draw">{d.label}</span>
            </span>
            <span className="t-label flex items-baseline gap-3 whitespace-nowrap">
              {d.note ?? (isFile(d.href) ? "PDF" : "Link")}
              <Arrow dir={isFile(d.href) ? "down" : "out"} className="text-base" />
            </span>
          </a>
        </li>
      ))}
    </ul>
  )
}
