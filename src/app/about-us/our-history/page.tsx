import type { Metadata } from "next"
import PageHeader from "@/lib/components/page-header"
import Related from "@/lib/components/related"
import { Rich } from "@/lib/components/rich"
import type { Block, Inline } from "@/lib/content"
import data from "@/content/pages/our-history.json"

export const metadata: Metadata = {
  title: "Our History",
  description:
    "How RDRC began in 1978, and how three smaller agencies were consolidated in 1987 into the Rockaways' first peninsula-wide development organization.",
}

export default function Page() {
  const paragraphs = (data as Block[]).filter((b): b is { t: "p"; c: Inline[] } => b.t === "p")
  const closing = paragraphs[paragraphs.length - 1]
  return (
    <>
      <PageHeader
        title="Our History"
        trail={[{ label: "About Us", href: "/about-us/" }]}
        image={{ src: "/media/2019/05/home-slider-06.jpg", alt: "A group of children, some with painted faces, smiling together at a plaza event" }}
      />
      <div className="wrap grid12 gap-y-10 border-t border-line pb-[var(--s-normal)] pt-[var(--s-tight)]">
        <p className="col-span-12 font-display text-[clamp(3.5rem,2rem+7vw,8rem)] leading-[0.9] tracking-[-0.03em] text-violet lg:col-span-3" aria-hidden="true" data-reveal>
          1978
        </p>
        <div className="col-span-12 lg:col-span-7 lg:col-start-4">
          <div className="prose" data-reveal>
            {paragraphs.slice(0, -1).map((p, i) => (
              <p key={i}><Rich c={p.c} /></p>
            ))}
          </div>
          <p className="mt-10 max-w-[41rem] border-t border-line pt-8 serif-italic text-[clamp(1.25rem,1.1rem+0.7vw,1.625rem)] leading-[1.3] text-violet" data-reveal>
            <Rich c={closing.c.flatMap((n) => (typeof n !== "string" && n.t === "i" ? n.c : [n]))} />
          </p>
        </div>
      </div>
      <Related
        title="More about RDRC"
        links={[
          { label: "Board of Directors", href: "/about-us/board-of-directors/" },
          { label: "Staff Directory", href: "/about-us/staff-directory/" },
        ]}
      />
    </>
  )
}
