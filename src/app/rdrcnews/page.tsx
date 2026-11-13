import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import PageHeader from "@/lib/components/page-header"
import { posts, shortDate } from "@/lib/content"
import { media } from "@/lib/media"

export const metadata: Metadata = {
  title: "RDRC News",
  description: "News, press releases, event recaps and opportunities from the Rockaway Development & Revitalization Corporation.",
}

export default function Page() {
  const years = [...new Set(posts.map((p) => p.date.slice(0, 4)))].sort().reverse()
  const byYear = years.map((y) => ({ year: y, items: posts.filter((p) => p.date.startsWith(y)) }))
  return (
    <>
      <PageHeader
        title="RDRC News"
        image={{ src: "/media/2019/12/header-slider-01.jpg", alt: "Rendering of a rebuilt Downtown Far Rockaway street: new buildings, street trees and people on a public plaza" }}
      />
      <div className="news wrap border-t border-line pb-[var(--s-normal)] pt-8">
        <fieldset className="year-filter flex flex-wrap items-center gap-2">
          <legend className="t-label mb-3">Year</legend>
          <span className="contents">
            <input type="radio" name="year" id="year-all" className="sr-only" defaultChecked />
            <label htmlFor="year-all">All <small className="tabular">{posts.length}</small></label>
          </span>
          {byYear.map(({ year, items }) => (
            <span key={year} className="contents">
              <input type="radio" name="year" id={`year-${year}`} className="sr-only" />
              <label htmlFor={`year-${year}`}>{year} <small className="tabular">{items.length}</small></label>
            </span>
          ))}
        </fieldset>

        {byYear.map(({ year, items }) => (
          <section key={year} data-year={year} aria-labelledby={`y-${year}`} className="grid12 mt-[var(--s-tight)] gap-y-4">
            <div className="col-span-12 lg:col-span-3">
              <h2 id={`y-${year}`} className="tabular font-display text-[clamp(2.75rem,2rem+3.4vw,5.5rem)] leading-[0.9] tracking-[-0.03em] text-violet lg:sticky lg:top-[calc(var(--header-h)+1.5rem)]">
                {year}
              </h2>
            </div>
            <ul className="col-span-12 border-b border-line lg:col-span-9">
              {items.map((p) => {
                const img = p.image ? media(p.image) : null
                return (
                  <li key={p.slug}>
                    <Link href={`/rdrcnews/${p.slug}/`} className="news-row group">
                      <span className="news-row__date t-label tabular pt-[0.4em]">{shortDate(p.date)}</span>
                      <span className="news-row__title block">
                        <span className="t-h3 block">{p.title}</span>
                        {p.excerpt ? <span className="clamp-2 mt-1.5 block text-[0.9375rem] leading-normal text-muted">{p.excerpt}</span> : null}
                      </span>
                      <span className="news-row__thumb">
                        {img ? <Image src={img.src} alt="" width={176} height={132} /> : null}
                      </span>
                    </Link>
                  </li>
                )
              })}
            </ul>
          </section>
        ))}
      </div>
    </>
  )
}
