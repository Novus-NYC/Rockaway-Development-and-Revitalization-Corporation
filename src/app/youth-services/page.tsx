import type { Metadata } from "next"
import { LongPage } from "@/lib/components/flow"
import PageHeader from "@/lib/components/page-header"
import Related from "@/lib/components/related"
import type { Block } from "@/lib/content"
import blocks from "@/content/pages/youth-services.json"

export const metadata: Metadata = {
  title: "Youth Services",
  description:
    "RDRC youth programs in the Rockaways: school-based and community-based summer youth employment, Work, Learn & Grow, and Youth Leaders Learn & Earn.",
}

export default function Page() {
  return (
    <>
      <PageHeader
        title="Youth Services"
        trail={[{ label: "Areas of focus" }]}
        image={{ src: "/media/2019/04/page-slider-youth.jpg", alt: "A large group of young people and staff on an auditorium stage, holding a hand-painted poster" }}
      />
      <LongPage
        blocks={blocks as Block[]}
        alts={{ "/media/2020/07/youth-learn-to-learn.jpg": "Young people seated in a workshop while two presenters speak" }}
      />
      <Related
        title="More in Youth Services"
        links={[
          { label: "SYEP 2019 Project Base Learning Technology", href: "/syep-2019-project-base-learning-technology/" },
          { label: "SYEP 2019 Project Base Learning", href: "/syep-2019-project-base-learning/" },
        ]}
      />
    </>
  )
}
