import type { Block, ImageBlock } from "@/lib/content"
import { textOf } from "@/lib/content"
import Photo from "./photo"
import { Blocks, Rich } from "./rich"

export const slugify = (s: string) =>
  s.toLowerCase().replace(/&/g, "and").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "")

export type FlowSection = { id?: string; title?: string; blocks: Block[] }

/** Split a page's blocks at its headings. Anything before the first heading is the lead. */
export function sections(blocks: Block[]): { lead: Block[]; sections: FlowSection[] } {
  const lead: Block[] = []
  const out: FlowSection[] = []
  for (const b of blocks) {
    if (b.t === "h") {
      const title = textOf(b.c)
      out.push({ id: slugify(title), title, blocks: [] })
    } else if (out.length) out[out.length - 1].blocks.push(b)
    else lead.push(b)
  }
  return { lead, sections: out }
}

type Row = { text: Block[]; figs: ImageBlock[]; first: "text" | "figs" }

/** Pair each run of text with the photographs that belong to it, so figures sit in the margin. */
function rows(blocks: Block[]): Row[] {
  const out: Row[] = []
  let row: Row | null = null
  for (const b of blocks) {
    if (b.t === "img") {
      if (!row || (row.first === "figs" && row.text.length)) {
        row = { text: [], figs: [], first: "figs" }
        out.push(row)
      }
      row.figs.push(b)
    } else {
      if (!row || (row.first === "text" && row.figs.length)) {
        row = { text: [], figs: [], first: "text" }
        out.push(row)
      }
      row.text.push(b)
    }
  }
  return out
}

type FlowProps = {
  blocks: Block[]
  /** Alt text for photographs the source left undescribed, by image path. */
  alts?: Record<string, string>
  /** Captions the source implies but does not print (for example a before and after pair). */
  captions?: Record<string, string>
  fallbackAlt?: string
  level?: 2 | 3
}

/** Long-form text with its photographs set in the margin (9-column parent grid). */
export function Flow({ blocks, alts = {}, captions = {}, fallbackAlt = "", level = 3 }: FlowProps) {
  return (
    <>
      {rows(blocks).map((row, i) => (
        <div key={i} className="grid gap-x-[var(--gutter)] gap-y-6 lg:grid-cols-9 [&+&]:mt-8">
          <div className={`prose lg:col-span-5 ${row.first === "figs" ? "max-lg:order-2" : ""}`} data-reveal>
            <Blocks blocks={row.text} level={level} />
          </div>
          {row.figs.length ? (
            <div className={`grid content-start gap-5 lg:col-span-4 ${row.figs.length > 1 ? "max-lg:grid-cols-2 max-xs:grid-cols-1" : ""}`}>
              {row.figs.map((f) => (
                <Photo
                  key={f.src}
                  src={f.src}
                  alt={alts[f.src] ?? (f.caption ? textOf(f.caption) : fallbackAlt)}
                  caption={f.caption ? <Rich c={f.caption} /> : captions[f.src]}
                  sizes="(min-width: 1024px) 28vw, 92vw"
                  className="max-w-[30rem]"
                />
              ))}
            </div>
          ) : null}
        </div>
      ))}
    </>
  )
}

/** The list of sections on a long page. Sticky beside the text on wide screens. */
export function SectionIndex({ items, label = "On this page" }: { items: { id: string; title: string }[]; label?: string }) {
  return (
    <nav aria-label={label} className="lg:sticky lg:top-[calc(var(--header-h)+2rem)]">
      <p className="t-label">{label}</p>
      <ol className="mt-3 grid gap-x-[var(--gutter)] gap-y-1 text-[0.9375rem] leading-snug text-muted max-lg:sm:grid-cols-2">
        {items.map((s) => (
          <li key={s.id}>
            <a href={`#${s.id}`} className="draw inline-block py-1 hover:text-violet">
              {s.title}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  )
}

/** The standard long page body: index in columns 1-3, sections in columns 4-12. */
export function LongPage({ blocks, alts, captions, fallbackAlt, children }: FlowProps & { children?: React.ReactNode }) {
  const { lead, sections: secs } = sections(blocks)
  return (
    <div className="wrap grid12 gap-y-8 border-t border-line pb-[var(--s-normal)] pt-[var(--s-tight)]">
      <aside className="col-span-12 lg:col-span-3">
        {secs.length > 1 ? <SectionIndex items={secs.map((s) => ({ id: s.id!, title: s.title! }))} /> : null}
      </aside>
      <div className="col-span-12 lg:col-span-9">
        {lead.length ? (
          <div className="pb-[var(--s-tight)]">
            <Flow blocks={lead} alts={alts} captions={captions} fallbackAlt={fallbackAlt} />
          </div>
        ) : null}
        {secs.map((s, i) => (
          <section key={s.id} id={s.id} aria-labelledby={`${s.id}-h`} className={`${i || lead.length ? "border-t border-line pt-[var(--s-tight)]" : ""} pb-[var(--s-tight)]`}>
            <h2 id={`${s.id}-h`} className="t-h2 max-w-[44rem]" data-reveal="wipe">
              <span className="wipe">{s.title}</span>
            </h2>
            <div className="mt-6">
              <Flow blocks={s.blocks} alts={alts} captions={captions} fallbackAlt={fallbackAlt} />
            </div>
          </section>
        ))}
        {children}
      </div>
    </div>
  )
}
