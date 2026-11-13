import type { Metadata } from "next"
import DocList from "@/lib/components/doc-list"
import PageHeader from "@/lib/components/page-header"

export const metadata: Metadata = {
  title: "Far Rockaway Businesses Information",
  description: "The directory of Downtown Far Rockaway businesses and the Downtown Far Rockaway retail vacancy reports.",
}

export default function Page() {
  return (
    <>
      <PageHeader
        title="Far Rockaway Businesses Information"
        trail={[{ label: "Areas of focus" }, { label: "Commercial Revitalization", href: "/commercial-revitalization/" }]}
        intro={<p>RDRC is pleased to provide you with our Downtown Far Rockaway Businesses Information:</p>}
        image={{
          src: "/media/2022/05/DFR-Business-Guide-April-2022-1.webp",
          alt: "Cover of the Directory of Downtown Far Rockaway’s Businesses, Services & Restaurants, April 2022 Edition",
          contain: true,
        }}
      />
      <div className="wrap grid12 border-t border-line pb-[var(--s-normal)] pt-[var(--s-tight)]">
        <DocList
          className="col-span-12 lg:col-span-9 lg:col-start-4"
          docs={[
            { label: "Directory of Downtown Far Rockaway Businesses", href: "/documents/DFR-Business-Guide-April-2022.pdf" },
            { label: "Downtown Far Rockaway Retail Vacancy Report March 2022", href: "/documents/Downtown-Far-Rockaway-Vacancy-Report-March-2022.pdf" },
            { label: "Downtown Far Rockaway Retail Vacancy Report April 2022", href: "https://acrobat.adobe.com/link/review?uri=urn:aaid:scds:US:8dadcdb0-0156-3b2b-99a9-d9974f864ff4" },
            { label: "Downtown Far Rockaway Retail Vacancy Report May 2022", href: "https://acrobat.adobe.com/link/review?uri=urn:aaid:scds:US:44da792a-2d60-3f6b-a825-65c68b414632" },
          ]}
        />
      </div>
    </>
  )
}
