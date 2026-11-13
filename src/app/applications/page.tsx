import type { Metadata } from "next"
import DocList from "@/lib/components/doc-list"
import PageHeader from "@/lib/components/page-header"

export const metadata: Metadata = {
  title: "Applications",
  description: "RDRC housing forms and the credit counseling consent form, to download and print.",
}

export default function Page() {
  return (
    <>
      <PageHeader
        title="Applications"
        trail={[{ label: "Areas of focus" }, { label: "Neighborhood Preservation", href: "/neighborhood-preservation/" }]}
        intro={<p>Download and Print</p>}
        image={{
          src: "/media/2019/04/home-slider-05.jpg",
          alt: "Homes at Arverne By The Sea, with a garden path leading toward the ocean",
          caption: "Image provided by Arverne By The Sea",
        }}
      />
      <div className="wrap grid12 border-t border-line pb-[var(--s-normal)] pt-[var(--s-tight)]">
        <DocList
          className="col-span-12 lg:col-span-9 lg:col-start-4"
          docs={[
            { label: "RDRC Housing Forms", href: "/documents/Housing-Forms.pdf" },
            { label: "Fillable Form – RDRC CREDIT COUNSELING CONSENT FORM", href: "/documents/Fillable-Form-RDRC-CREDIT-COUNSELING-CONSENT-FORM.pdf" },
          ]}
        />
      </div>
    </>
  )
}
