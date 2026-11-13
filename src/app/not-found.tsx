import type { Metadata } from "next"
import Link from "next/link"
import Words from "@/lib/components/words"
import Photo from "@/lib/components/photo"

export const metadata: Metadata = { title: "Page not found", robots: { index: false } }

export default function NotFound() {
  return (
    <div className="wrap grid12 items-center gap-y-10 py-[var(--s-normal)]">
      <div className="col-span-12 lg:col-span-6">
        <p className="t-label tabular" data-intro>Error 404</p>
        <h1 className="t-h1 mt-4" data-intro="words" style={{ "--i": 1 } as React.CSSProperties}>
          <Words text="This page is not here." />
        </h1>
        <p className="t-lede mt-6 max-w-[32rem]" data-intro style={{ "--i": 2 } as React.CSSProperties}>
          The address may have changed when the site was rebuilt. Try one of these.
        </p>
        <ul className="mt-8 flex flex-wrap gap-3" data-intro style={{ "--i": 3 } as React.CSSProperties}>
          <li><Link href="/" className="btn">Home <span className="arrow" aria-hidden="true">→</span></Link></li>
          <li><Link href="/rdrcnews/" className="btn btn--line">RDRC News</Link></li>
          <li><Link href="/contact-us/" className="btn btn--line">Contact Us</Link></li>
        </ul>
      </div>
      <Photo
        src="/media/2019/04/page-slider-commercial.jpg"
        alt="A tree-lined plaza behind construction fencing"
        ratio="3 / 2"
        sizes="(min-width: 1024px) 36vw, 54vw"
        intro
        parallax
        className="col-span-12 lg:col-span-5 lg:col-start-8"
      />
    </div>
  )
}
