import type { Metadata } from "next"
import PageHeader from "@/lib/components/page-header"
import Related from "@/lib/components/related"

export const metadata: Metadata = {
  title: "SEQBI Eligibility Requirements",
  description: "The minimum criteria a business must meet to apply to the Southeast Queens Business Incubator.",
}

const criteria = [
  "Proof of NYS incorporation/formation as business entity for a minimum of 2 years.",
  "Business checking account.",
  "Business tax identification number (TIN).",
  "Queens-based business, or non-Queens business doing business in Queens County.",
]

export default function Page() {
  return (
    <>
      <PageHeader
        title="Eligibility Requirements"
        trail={[{ label: "SEQBI", href: "/seqbi/" }]}
        intro={<p>Eligible businesses must meet the following minimum criteria:</p>}
        image={{ src: "/media/2025/09/Bitmap-11.webp", alt: "A SEQBI session in a conference room, with Fellows at round tables facing a projected presentation" }}
      />
      <div className="wrap grid12 border-t border-line pb-[var(--s-normal)] pt-[var(--s-tight)]">
        <ul className="col-span-12 border-b border-line lg:col-span-9 lg:col-start-4">
          {criteria.map((c, i) => (
            <li key={c} className="flex gap-5 border-t border-line py-5" data-reveal style={{ "--i": i } as React.CSSProperties}>
              <span aria-hidden="true" className="mt-[0.7em] size-2 shrink-0 rounded-full bg-brass" />
              <span className="t-h3 max-w-[38rem]">{c}</span>
            </li>
          ))}
        </ul>
      </div>
      <Related
        title="More in SEQBI"
        links={[
          { label: "Meet the Fellows", href: "/seqbi/meet-the-fellows/" },
          { label: "Partners", href: "/seqbi/partners/" },
        ]}
      />
    </>
  )
}
