import type { Metadata } from "next"
import Image from "next/image"
import PageHeader from "@/lib/components/page-header"
import { media } from "@/lib/media"
import supporters from "@/content/supporters.json"

export const metadata: Metadata = {
  title: "Our Supporters",
  description: "The companies, agencies, schools and institutions that support the work of the Rockaway Development & Revitalization Corporation.",
}

type Supporter = { name: string; logo: string; href: string }

export default function Page() {
  return (
    <>
      <PageHeader
        title="Our Supporters"
        image={{ src: "/media/2019/05/home-slider-07.jpg", alt: "Dancers in bright carnival costumes parade down a Downtown Far Rockaway shopping street" }}
      />
      <div className="wrap border-t border-line pb-[var(--s-normal)] pt-[var(--s-tight)]">
        <ul className="grid grid-cols-2 gap-[clamp(0.5rem,1vw,0.875rem)] sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-6">
          {(supporters as Supporter[]).map((s, i) => {
            const m = media(s.logo)
            return (
              <li key={s.logo} data-reveal style={{ "--i": i % 6 } as React.CSSProperties}>
                <a href={s.href} target="_blank" rel="noopener noreferrer" className="logo-tile" aria-label={`${s.name} (opens in a new tab)`}>
                  <Image src={m.src} alt={s.name} width={220} height={Math.round((220 * m.h) / m.w)} />
                </a>
              </li>
            )
          })}
        </ul>
      </div>
    </>
  )
}
