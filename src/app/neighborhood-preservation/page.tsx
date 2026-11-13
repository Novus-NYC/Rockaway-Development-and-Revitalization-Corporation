import type { Metadata } from "next"
import { LongPage, sections } from "@/lib/components/flow"
import PageHeader from "@/lib/components/page-header"
import { Rich } from "@/lib/components/rich"
import type { Block } from "@/lib/content"
import data from "@/content/pages/neighborhood-preservation.json"

export const metadata: Metadata = {
  title: "Neighborhood Preservation",
  description:
    "RDRC is a HUD Certified Counseling Agency: first time homebuyer courses, foreclosure prevention, credit counseling and financial literacy, free of charge.",
}

export default function Page() {
  const blocks = data as Block[]
  const { lead } = sections(blocks)
  const intro = lead[0]
  return (
    <>
      <PageHeader
        title="Neighborhood Preservation Services"
        trail={[{ label: "Areas of focus" }, { label: "Neighborhood Preservation" }]}
        intro={intro?.t === "p" ? <p><Rich c={intro.c} /></p> : undefined}
        image={{
          src: "/media/2019/04/home-slider-05.jpg",
          alt: "Homes at Arverne By The Sea, with a garden path leading toward the ocean",
          caption: "Image provided by Arverne By The Sea",
        }}
      />
      <LongPage
        blocks={blocks.slice(1)}
        alts={{
          "/media/2020/02/Workshop.2019-e1580924329542.jpg": "Residents at tables during a housing workshop",
          "/media/2019/04/neighborhood-03.jpg": "Close-up of credit cards",
        }}
      />
    </>
  )
}
