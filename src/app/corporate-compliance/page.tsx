import type { Metadata } from "next"
import DocList from "@/lib/components/doc-list"
import PageHeader from "@/lib/components/page-header"

export const metadata: Metadata = {
  title: "Corporate Compliance",
  description: "RDRC's most recent financial audits (2018, 2019 and 2020), available to download and review.",
}

export default function Page() {
  return (
    <>
      <PageHeader
        title="Corporate Compliance"
        trail={[{ label: "About Us", href: "/about-us/" }]}
        intro={<p>RDRC is pleased to provide our most recent financial audits for review:</p>}
        image={{ src: "/media/2018/12/header-image-slider-4.webp", alt: "A crowd at an outdoor concert on the plaza; a woman in a striped dress raises her phone to take a picture" }}
      />
      <div className="wrap grid12 border-t border-line pb-[var(--s-normal)] pt-[var(--s-tight)]">
        <DocList
          className="col-span-12 lg:col-span-9 lg:col-start-4"
          docs={[
            { label: "2020 Financial Audit", href: "/documents/RDRC-FY-2020-Audit.pdf" },
            { label: "2019 Financial Audit", href: "/documents/RDRC-FY-2019-Audit.pdf" },
            { label: "2018 Financial Audit", href: "/documents/RDRC-FY-2018-Audit.pdf" },
          ]}
        />
      </div>
    </>
  )
}
