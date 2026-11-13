import type { Metadata } from "next"
import { LongPage } from "@/lib/components/flow"
import PageHeader from "@/lib/components/page-header"
import type { Block } from "@/lib/content"
import blocks from "@/content/pages/workforce-development.json"

export const metadata: Metadata = {
  title: "Workforce Development",
  description:
    "Adult workforce development at RDRC: job readiness training, placement assistance, the Spectrum Learning Lab, computer courses and MOS certification.",
}

export default function Page() {
  return (
    <>
      <PageHeader
        title="Adult Workforce Development"
        trail={[{ label: "Areas of focus" }, { label: "Workforce Development" }]}
        image={{ src: "/media/2018/12/header-image-slider-6.webp", alt: "Graduates in blue caps and gowns, one holding up her certificate" }}
      />
      <LongPage blocks={blocks as Block[]} />
    </>
  )
}
