import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import Words from "@/lib/components/words"
import { media } from "@/lib/media"

export const metadata: Metadata = { title: "Page not found", robots: { index: false } }

const photo = media("/media/2019/04/page-slider-commercial.jpg")

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
      {/* A photograph the restoring line has not reached yet. */}
      <figure className="not-found-photo col-span-12 lg:col-span-5 lg:col-start-8" data-intro style={{ "--i": 2 } as React.CSSProperties}>
        <span className="frame relative aspect-[3/2]">
          <Image src={photo.src} alt="A plaza behind construction fencing, in black and white" width={photo.w} height={photo.h} sizes="(min-width: 1024px) 36vw, 54vw" loading="eager" fetchPriority="high" preload />
        </span>
      </figure>
    </div>
  )
}
