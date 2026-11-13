import type { Metadata } from "next"
import PageHeader from "@/lib/components/page-header"
import Related from "@/lib/components/related"
import { Rich } from "@/lib/components/rich"
import type { Block, Inline } from "@/lib/content"
import { aboutNav } from "@/data/site"
import data from "@/content/pages/about-us.json"

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Rockaway Development & Revitalization Corporation was organized in 1978 by community leaders to address social and economic conditions throughout the Rockaways.",
}

export default function Page() {
  const paragraphs = (data as Block[]).filter((b): b is { t: "p"; c: Inline[] } => b.t === "p")
  const [story, mission] = paragraphs
  return (
    <>
      <PageHeader
        title="About Us"
        image={{ src: "/media/2018/12/header-image-slider-4.webp", alt: "A crowd at an outdoor concert on the plaza; a woman in a striped dress raises her phone to take a picture" }}
      />
      <div className="wrap grid12 gap-y-8 border-t border-line py-[var(--s-tight)]">
        <div className="prose t-lede col-span-12 lg:col-span-7 lg:col-start-4" data-reveal>
          <p><Rich c={story.c} /></p>
        </div>
      </div>
      <section className="bg-mist" aria-labelledby="mission-h">
        <div className="wrap grid12 gap-y-5 py-[var(--s-normal)]">
          <h2 id="mission-h" className="t-label col-span-12 lg:col-span-3 lg:pt-3">
            Our Mission
          </h2>
          <p className="col-span-12 serif-italic text-[clamp(1.625rem,1.1rem+2.3vw,3.125rem)] leading-[1.12] tracking-[-0.016em] text-violet lg:col-span-9" data-reveal>
            <Rich c={mission.c.flatMap((n) => (typeof n !== "string" && n.t === "i" ? n.c : [n]))} />
          </p>
        </div>
      </section>
      <Related title="More about RDRC" links={aboutNav.filter((l) => l.href !== "/about-us/")} />
    </>
  )
}
