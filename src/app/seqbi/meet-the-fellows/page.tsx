import type { Metadata } from "next"
import Link from "next/link"
import { Arrow } from "@/lib/components/icons"
import PageHeader from "@/lib/components/page-header"
import { fellowsPages } from "@/data/fellows"
import { cohorts } from "@/data/site"

export const metadata: Metadata = {
  title: "Meet the SEQBI Fellows",
  description: "The Fellows of the Southeast Queens Business Incubator, class by class, and the winners of each pitch competition.",
}

export default function Page() {
  return (
    <>
      <PageHeader title="Meet the Fellows" trail={[{ label: "SEQBI", href: "/seqbi/" }]} />
      <div className="wrap border-t border-line pb-[var(--s-normal)] pt-[var(--s-tight)]">
        <ul className="grid gap-x-[var(--gutter)] gap-y-10 md:grid-cols-3">
          {cohorts.map((c, i) => {
            const roster = fellowsPages.find((p) => p.href === c.href)!
            return (
              <li key={c.key} className="border-t border-line pt-5" data-reveal style={{ "--i": i } as React.CSSProperties}>
                <h2 className="t-h2">{c.label}</h2>
                <ul className="mt-5 grid gap-1">
                  <li>
                    <Link href={c.href} className="group flex items-baseline justify-between gap-4 border-t border-line py-3.5">
                      <span><span className="draw">Fellows</span> <span className="tabular text-muted">({roster.roster.length})</span></span>
                      <Arrow className="text-brass-ink" />
                    </Link>
                  </li>
                  <li>
                    <Link href={c.winnersHref} className="group flex items-baseline justify-between gap-4 border-y border-line py-3.5">
                      <span className="draw">Pitch Competition Winners</span>
                      <Arrow className="text-brass-ink" />
                    </Link>
                  </li>
                </ul>
              </li>
            )
          })}
        </ul>
      </div>
    </>
  )
}
