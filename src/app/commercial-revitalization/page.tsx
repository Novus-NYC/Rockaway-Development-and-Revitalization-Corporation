import type { Metadata } from "next"
import { LongPage, sections } from "@/lib/components/flow"
import PageHeader from "@/lib/components/page-header"
import Related from "@/lib/components/related"
import { Rich } from "@/lib/components/rich"
import type { Block } from "@/lib/content"
import data from "@/content/pages/commercial-revitalization.json"

export const metadata: Metadata = {
  title: "Commercial Revitalization",
  description:
    "RDRC in Downtown Far Rockaway: the Beach 20th Street Plaza, the redevelopment project, merchant organizing, storefront improvement and business attraction.",
}

export default function Page() {
  const blocks = data as Block[]
  const { lead } = sections(blocks)
  const intro = lead[0]
  return (
    <>
      <PageHeader
        title="Commercial Revitalization"
        trail={[{ label: "Areas of focus" }]}
        intro={intro?.t === "p" ? <p><Rich c={intro.c} /></p> : undefined}
        image={{ src: "/media/2019/04/page-slider-commercial.jpg", alt: "A tree-lined plaza under renovation behind construction fencing" }}
      />
      <LongPage
        blocks={blocks.slice(1)}
        alts={{
          "/media/2019/04/commercial-project-03.jpg": "A page from “With Pleasure: A Plan for Far Rockaway’s Future”",
          "/media/2019/04/commercial-project-01.jpg": "Cover of the Beach 20th Street Plaza design presentation, April 22, 2013",
          "/media/2019/04/commercial-project-02.jpg": "Cover of the Downtown Far Rockaway Urban Design and Streetscape Reconstruction review",
          "/media/2019/04/commercial-project-04.jpg": "Rendering of a redeveloped Downtown Far Rockaway street with new buildings, trees and a public plaza",
          "/media/2019/04/commercial-project-06-before.jpg": "A storefront before the program: a worn facade and a faded sign",
          "/media/2019/04/commercial-project-06-after.jpg": "The same storefront after: a new black sign reading Tino’s Unisex Hair Styling",
        }}
        captions={{
          "/media/2019/04/commercial-project-06-before.jpg": "Before",
          "/media/2019/04/commercial-project-06-after.jpg": "After",
        }}
      />
      <Related title="More in Commercial Revitalization" links={[{ label: "Far Rockaway Businesses Information", href: "/far-rockaway-businesses-information/" }]} />
    </>
  )
}
