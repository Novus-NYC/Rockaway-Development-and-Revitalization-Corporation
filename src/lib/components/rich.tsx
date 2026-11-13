import Link from "next/link"
import type { Block, Inline, ListBlock } from "@/lib/content"
import { textOf } from "@/lib/content"
import Photo from "./photo"

const external = (href: string) => /^https?:\/\//.test(href)

/** Inline content: text, emphasis and links, exactly as written in the source. */
export function Rich({ c }: { c: Inline[] }) {
  return (
    <>
      {c.map((n, i) => {
        if (typeof n === "string") return n
        switch (n.t) {
          case "br":
            return <br key={i} />
          case "b":
            return <strong key={i}><Rich c={n.c} /></strong>
          case "i":
            return <em key={i}><Rich c={n.c} /></em>
          case "u":
            return <strong key={i} className="font-medium"><Rich c={n.c} /></strong>
          case "sup":
            return <sup key={i}><Rich c={n.c} /></sup>
          case "hl":
            return <span key={i} className="hl"><Rich c={n.c} /></span>
          case "a":
            if (!n.href || n.href === "#") return <Rich key={i} c={n.c} />
            if (n.href.startsWith("/") && !n.href.startsWith("/documents/") && !n.href.startsWith("/media/"))
              return <Link key={i} href={n.href} className="link"><Rich c={n.c} /></Link>
            return (
              <a key={i} href={n.href} className="link" {...(external(n.href) || n.href.startsWith("/documents/") || n.href.startsWith("/media/") ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
                <Rich c={n.c} />
              </a>
            )
        }
      })}
    </>
  )
}

function List({ list }: { list: ListBlock }) {
  const Tag = list.t
  return (
    <Tag>
      {list.items.map((item, i) => (
        <li key={i}>
          <Rich c={item.c} />
          {item.sub ? <List list={item.sub} /> : null}
        </li>
      ))}
    </Tag>
  )
}

/** A paragraph that is only one short emphasized phrase reads as a small heading. */
function isRunIn(c: Inline[]) {
  if (c.length !== 1 || typeof c[0] === "string") return false
  const n = c[0]
  return (n.t === "hl" || n.t === "b") && textOf(n.c).length < 110 && !n.c.some((x) => typeof x !== "string" && x.t === "a")
}

/** A whole paragraph set in bold italics and opened with a quotation mark is a quotation. */
function unwrapEmphasis(c: Inline[]): Inline[] {
  if (c.length === 1 && typeof c[0] !== "string" && (c[0].t === "b" || c[0].t === "i")) return unwrapEmphasis(c[0].c)
  return c
}
function isQuote(c: Inline[]) {
  const inner = unwrapEmphasis(c)
  return inner !== c && textOf(inner).trimStart().startsWith("“") && textOf(inner).length > 140
}

type BlocksProps = {
  blocks: Block[]
  /** Heading level for source headings (the page supplies its own h1). */
  level?: 2 | 3
  /** Let images open at full size (flyers carry small print). */
  zoom?: boolean
  imageSizes?: string
  /** Alt text for images the source left undescribed. */
  fallbackAlt?: string
}

export function Blocks({ blocks, level = 2, zoom, imageSizes = "(min-width: 64rem) 41rem, 92vw", fallbackAlt = "" }: BlocksProps) {
  const H = level === 2 ? "h2" : "h3"
  return (
    <>
      {blocks.map((b, i) => {
        switch (b.t) {
          case "h":
            return <H key={i} className={level === 2 ? "t-h2" : "t-h3"}><Rich c={b.c} /></H>
          case "p":
            if (b.label && !b.c.length) return <h3 key={i} className="t-h3 !mt-8">{b.label}</h3>
            if (b.label)
              return (
                <div key={i} className="callout">
                  <p className="t-label">{b.label}</p>
                  <p className="callout__text"><Rich c={b.c} /></p>
                </div>
              )
            if (isQuote(b.c))
              return (
                <blockquote key={i} className="pullquote">
                  <p><Rich c={unwrapEmphasis(b.c)} /></p>
                </blockquote>
              )
            if (isRunIn(b.c)) return <p key={i} className="run-in"><Rich c={(b.c[0] as { c: Inline[] }).c} /></p>
            return <p key={i} className={b.align === "center" ? "text-center" : undefined}><Rich c={b.c} /></p>
          case "ul":
          case "ol":
            return <List key={i} list={b} />
          case "img": {
            const alt = b.alt && !/^[\w-]+$/.test(b.alt) ? b.alt : b.caption ? textOf(b.caption) : fallbackAlt
            const photo = (
              <Photo key={i} src={b.src} alt={alt} sizes={imageSizes} reveal="color" zoom={zoom && !b.href} caption={b.caption ? <Rich c={b.caption} /> : undefined} className="!my-7" />
            )
            return b.href && b.href !== "#" ? (
              <a key={i} href={b.href} target={external(b.href) ? "_blank" : undefined} rel={external(b.href) ? "noopener noreferrer" : undefined} className="block">
                {photo}
              </a>
            ) : (
              photo
            )
          }
          default:
            return null
        }
      })}
    </>
  )
}
