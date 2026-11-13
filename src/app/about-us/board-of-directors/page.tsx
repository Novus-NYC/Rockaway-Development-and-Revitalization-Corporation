import type { Metadata } from "next"
import PageHeader from "@/lib/components/page-header"
import board from "@/content/board.json"

export const metadata: Metadata = {
  title: "Board of Directors",
  description: "The members of the RDRC Board of Directors, with their offices and affiliations.",
}

type Member = { name: string; role?: string; affiliation?: string }

export default function Page() {
  return (
    <>
      <PageHeader
        title="RDRC Board of Directors"
        trail={[{ label: "About Us", href: "/about-us/" }]}
        image={{ src: "/media/2018/12/header-image-slider-2.webp", alt: "A large crowd gathered outdoors at a community event; a man in front holds up his phone" }}
      />
      <div className="wrap border-t border-line pb-[var(--s-normal)] pt-[var(--s-tight)]">
        <ul className="grid gap-x-[var(--gutter)] sm:grid-cols-2 lg:grid-cols-3">
          {(board as Member[]).map((m, i) => (
            <li key={m.name} className="border-t border-line py-6" data-reveal style={{ "--i": i % 3 } as React.CSSProperties}>
              <p className="t-label min-h-[1.3em]">{m.role}</p>
              <p className="t-h3 mt-2 !text-[clamp(1.375rem,1.2rem+0.7vw,1.75rem)]">{m.name}</p>
              {m.affiliation ? <p className="mt-1.5 text-muted">{m.affiliation}</p> : null}
            </li>
          ))}
        </ul>
      </div>
    </>
  )
}
