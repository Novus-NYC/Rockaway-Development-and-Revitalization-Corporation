import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { Arrow } from "@/lib/components/icons"
import PageHeader from "@/lib/components/page-header"
import { fellowsPages } from "@/data/fellows"
import { media } from "@/lib/media"

export const dynamicParams = false

export function generateStaticParams() {
  return fellowsPages.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const page = fellowsPages.find((p) => p.slug === slug)
  if (!page) return {}
  return {
    title: `SEQBI ${page.title}`,
    description:
      page.kind === "roster"
        ? `The ${page.roster.length} Fellows of the Southeast Queens Business Incubator ${page.cohort}, with their businesses.`
        : `First, second and third place in the Southeast Queens Business Incubator pitch competition, ${page.cohort}.`,
  }
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const page = fellowsPages.find((p) => p.slug === slug)
  if (!page) notFound()

  return (
    <>
      <PageHeader title={page.title} trail={[{ label: "SEQBI", href: "/seqbi/" }, { label: "Meet the Fellows", href: "/seqbi/meet-the-fellows/" }]} image={page.image} />

      <div className="wrap border-t border-line pb-[var(--s-normal)] pt-[var(--s-tight)]">
        {page.kind === "roster" ? (
          <ul className="grid gap-x-[var(--gutter)] sm:grid-cols-2 lg:grid-cols-3">
            {page.roster.map((f, i) => (
              <li key={f.name + i} className="border-t border-line py-5" data-reveal style={{ "--i": i % 3 } as React.CSSProperties}>
                <p className="t-h3">{f.name}</p>
                <p className="mt-1 text-muted">{f.business}</p>
              </li>
            ))}
          </ul>
        ) : (
          <ol className="grid gap-x-[var(--gutter)] gap-y-12 md:grid-cols-3">
            {page.winners.map((w, i) => (
              <li key={w.place} className="border-t border-line pt-6" data-reveal style={{ "--i": i } as React.CSSProperties}>
                <div className="flex">
                  {w.photos.map((src, k) => {
                    const m = media(src)
                    return (
                      <span key={src} className={`disc settle w-[min(46%,11rem)] ${k ? "-ml-[8%] ring-4 ring-paper" : ""}`}>
                        <Image src={m.src} alt={w.photos.length > 1 ? w.name.split(" & ")[k] ?? w.name : w.name} width={200} height={Math.round((200 * m.h) / m.w)} />
                      </span>
                    )
                  })}
                </div>
                <p className="t-label mt-6">{w.place}</p>
                <p className="t-h2 mt-2 !text-[clamp(1.5rem,1.25rem+1vw,2rem)]">{w.name}</p>
                <p className="mt-1.5 text-muted">{w.business}</p>
              </li>
            ))}
          </ol>
        )}
      </div>

      <nav aria-label="Classes" className="border-t border-line bg-mist">
        <div className="wrap grid12 gap-y-4 py-[var(--s-tight)]">
          <p className="t-label col-span-12 lg:col-span-3">Meet the Fellows</p>
          <ul className="col-span-12 grid gap-x-[var(--gutter)] sm:grid-cols-2 lg:col-span-9">
            {fellowsPages.map((p) => (
              <li key={p.slug} className="border-t border-line">
                <Link href={p.href} aria-current={p.slug === page.slug ? "page" : undefined} className="group flex items-baseline justify-between gap-4 py-3.5 aria-[current]:text-brass-ink">
                  <span className="draw">{p.title}</span>
                  <Arrow className="text-brass-ink" />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </>
  )
}
