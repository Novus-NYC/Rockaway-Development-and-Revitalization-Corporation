import type { Metadata } from "next"
import { Flow } from "@/lib/components/flow"
import PageHeader from "@/lib/components/page-header"
import Related from "@/lib/components/related"
import type { Block } from "@/lib/content"
import { textOf } from "@/lib/content"
import data from "@/content/pages/seqbi.json"

export const metadata: Metadata = {
  title: "Southeast Queens Business Incubator (SEQBI)",
  description:
    "The Southeast Queens Business Incubator is an 8-week business growth program run by RDRC and funded by a grant from Resorts World New York City.",
}

/** Shape the source for layout: lift the flyer link into the header, drop a paragraph the
 *  source repeats word for word, and let a "Pictured:" line caption the photographs it follows. */
function prepare(blocks: Block[]) {
  const out: Block[] = []
  const seen = new Set<string>()
  let flyer: { label: string; href: string } | null = null
  for (const b of blocks) {
    if (b.t === "p") {
      const text = textOf(b.c)
      const only = b.c.length === 1 && typeof b.c[0] !== "string" && b.c[0].t === "a" ? b.c[0] : null
      if (!flyer && only && only.t === "a" && only.href.startsWith("/documents/")) {
        flyer = { label: text, href: only.href }
        continue
      }
      if (text.length > 120) {
        if (seen.has(text)) continue
        seen.add(text)
      }
      const prev = out[out.length - 1]
      if (text.startsWith("Pictured:") && prev?.t === "img" && !prev.caption) {
        out[out.length - 1] = { ...prev, caption: b.c }
        continue
      }
    }
    out.push(b)
  }
  return { blocks: out, flyer }
}

export default function Page() {
  const { blocks, flyer } = prepare(data as Block[])
  return (
    <>
      <PageHeader
        title="Southeast Queens Business Incubator (SEQBI)"
        image={{ src: "/media/2025/09/Bitmap-12.webp", alt: "SEQBI Fellows seated at round tables during a class session, applauding" }}
      >
        {flyer ? (
          <a href={flyer.href} target="_blank" rel="noopener noreferrer" className="btn">
            {flyer.label} <span className="arrow" aria-hidden="true">↓</span>
          </a>
        ) : null}
      </PageHeader>
      <div className="wrap grid12 border-t border-line pb-[var(--s-normal)] pt-[var(--s-tight)]">
        <div className="col-span-12 lg:col-span-9 lg:col-start-4">
          <Flow
            blocks={blocks}
            alts={{
              "/media/2025/09/Bitmap-14-e1759305695693.webp": "Fellows and guests listening to a presentation in a conference room",
              "/media/2025/09/Bitmap-16.webp": "Kevin Alexander speaking at a microphone",
              "/media/2025/09/Bitmap-18.webp": "A Fellow is congratulated with a handshake at the graduation ceremony",
              "/media/2025/09/Bitmap-19.webp": "Fellows seated in the audience at the pitch presentations",
            }}
          />
        </div>
      </div>
      <Related
        title="More in SEQBI"
        links={[
          { label: "Meet the Fellows", href: "/seqbi/meet-the-fellows/" },
          { label: "Eligibility Requirements", href: "/seqbi/eligibility-requirements/" },
          { label: "Partners", href: "/seqbi/partners/" },
        ]}
      />
    </>
  )
}
