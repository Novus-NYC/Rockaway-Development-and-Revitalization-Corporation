import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import Photo from "@/lib/components/photo"
import Words from "@/lib/components/words"
import { Blocks } from "@/lib/components/rich"
import { getPost, longDate, posts, textOf } from "@/lib/content"
import type { Block } from "@/lib/content"

export const dynamicParams = false

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }))
}

function firstWords(blocks: Block[]) {
  for (const b of blocks) if (b.t === "p" && textOf(b.c).length > 40) return textOf(b.c)
  return ""
}

const clip = (s: string, n: number) => (s.length > n ? `${s.slice(0, n - 3).replace(/\s+\S*$/, "")}...` : s)

// Search descriptions and titles, unique per post even when two posts share a title or a summary.
const meta = (() => {
  const draft = posts.map((p) => {
    const source = (p.excerpt.length > 60 ? p.excerpt : firstWords(p.body)).replace(/\s+/g, " ").trim()
    const text = source.length >= 90 ? source : `${source || `${p.title}.`} RDRC News, ${longDate(p.date)}.`
    return { slug: p.slug, title: p.title, description: clip(text, 158), date: longDate(p.date) }
  })
  const seen = (key: "title" | "description") => {
    const m = new Map<string, number>()
    for (const d of draft) m.set(d[key], (m.get(d[key]) ?? 0) + 1)
    return m
  }
  const titles = seen("title")
  const descriptions = seen("description")
  return new Map(
    draft.map((d) => [
      d.slug,
      {
        title: clip((titles.get(d.title) ?? 0) > 1 ? `${d.title} (${d.date})` : d.title, 60),
        description: (descriptions.get(d.description) ?? 0) > 1 ? clip(`${clip(d.title, 60)}, ${d.date}. ${d.description}`, 158) : d.description,
      },
    ]),
  )
})()

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const post = getPost(slug)
  const m = meta.get(slug)
  if (!post || !m) return {}
  return {
    title: m.title,
    description: m.description,
    openGraph: { type: "article", title: post.title, publishedTime: post.date, images: post.image ? [post.image] : undefined },
  }
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const i = posts.findIndex((p) => p.slug === slug)
  if (i < 0) notFound()
  const post = posts[i]
  const newer = posts[i - 1]
  const older = posts[i + 1]
  // A few posts are a flyer plus a short summary that only appeared on the news index.
  const bodyText = post.body.map((b) => (b.t === "p" ? textOf(b.c) : "")).join(" ")
  const summary = post.excerpt && !bodyText.replace(/\W+/g, "").startsWith(post.excerpt.replace(/\.{3}$/, "").replace(/\W+/g, "").slice(0, 40)) && post.body.length === 0 ? post.excerpt : null
  const long = post.title.length > 70

  return (
    <article>
      <header className="wrap grid12 pb-[var(--s-tight)] pt-[clamp(2.25rem,5vw,4.5rem)]">
        <div className="col-span-12 lg:col-span-10">
          <p className="t-label flex flex-wrap gap-x-2" data-intro>
            <Link href="/rdrcnews/" className="draw -my-1.5 inline-block py-1.5">RDRC News</Link>
            <span aria-hidden="true" className="text-muted">/</span>
            <time dateTime={post.date} className="tabular">{longDate(post.date)}</time>
          </p>
          <h1
            className={`mt-4 font-display leading-[1.05] tracking-[-0.02em] text-violet ${long ? "text-[clamp(1.75rem,1.25rem+2vw,3rem)]" : "text-[clamp(2.125rem,1.3rem+3.2vw,4rem)]"}`}
            data-intro="words"
            style={{ "--i": 1 } as React.CSSProperties}
          >
            <Words text={post.title} />
          </h1>
        </div>
      </header>

      <div className="wrap grid12 gap-y-8 border-t border-line pb-[var(--s-normal)] pt-[var(--s-tight)]">
        {post.image ? (
          <div className="col-span-12 lg:order-2 lg:col-span-5 lg:col-start-8">
            <div className="lg:sticky lg:top-[calc(var(--header-h)+1.5rem)]">
              <Photo src={post.image} alt={post.title} sizes="(min-width: 1024px) 38vw, 92vw" intro zoom className="mx-auto max-w-[36rem] lg:max-w-none" />
            </div>
          </div>
        ) : null}
        <div className="col-span-12 lg:order-1 lg:col-span-6">
          <div className="prose" data-intro style={{ "--i": 2 } as React.CSSProperties}>
            {summary ? <p className="t-lede">{summary}</p> : null}
            <Blocks blocks={post.body} level={2} zoom fallbackAlt={post.title} imageSizes="(min-width: 1024px) 41rem, 92vw" />
            {post.external ? (
              <p className="!mt-8">
                <a href={post.external} target="_blank" rel="noopener noreferrer" className="btn">
                  {post.external.replace(/^https?:\/\//, "").replace(/\/$/, "")} <span className="arrow arrow--up" aria-hidden="true">↗</span>
                </a>
              </p>
            ) : null}
          </div>
        </div>
      </div>

      <nav aria-label="More news" className="border-t border-line bg-mist">
        <div className="wrap grid gap-x-[var(--gutter)] py-[var(--s-tight)] md:grid-cols-2">
          {[
            { label: "Newer", post: newer },
            { label: "Older", post: older },
          ].map(({ label, post: p }) =>
            p ? (
              <Link key={label} href={`/rdrcnews/${p.slug}/`} className={`group block border-t border-line py-5 ${label === "Older" ? "md:text-right" : ""}`}>
                <span className={`t-label flex items-center gap-2 ${label === "Older" ? "md:justify-end" : ""}`}>
                  {label === "Newer" ? <span aria-hidden="true">←</span> : null}
                  {label}
                  {label === "Older" ? <span className="arrow" aria-hidden="true">→</span> : null}
                </span>
                <span className="t-h3 mt-2 block"><span className="draw">{p.title}</span></span>
                <time dateTime={p.date} className="t-small tabular mt-1 block text-muted">{longDate(p.date)}</time>
              </Link>
            ) : (
              <span key={label} className="max-md:hidden" />
            ),
          )}
        </div>
      </nav>
    </article>
  )
}
