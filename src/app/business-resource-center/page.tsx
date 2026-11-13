import type { Metadata } from "next"
import { SectionIndex, slugify } from "@/lib/components/flow"
import LinkList from "@/lib/components/link-list"
import PageHeader from "@/lib/components/page-header"
import { Blocks } from "@/lib/components/rich"
import type { Block, ListBlock } from "@/lib/content"
import { textOf } from "@/lib/content"
import data from "@/content/pages/business-resource-center.json"

export const metadata: Metadata = {
  title: "COVID-19 Business Resource Center",
  description:
    "RDRC's COVID-19 resources for Rockaway businesses: resource center pamphlets and guides, restaurant listings, PPE, the E-Help Desk and city programs.",
}

type Group = { title?: string; text: Block[]; lists: ListBlock[] }
type Section = { id: string; title: string; subtitle?: string; groups: Group[] }

const isLinkList = (b: Block): b is ListBlock => b.t === "ul" && b.items.every((i) => i.c.some((n) => typeof n !== "string" && n.t === "a"))

/** Sections at each h2, groups at each h3. A heading directly under a heading is its subtitle. */
function outline(blocks: Block[]): Section[] {
  const out: Section[] = []
  for (const b of blocks) {
    const sec = out[out.length - 1]
    if (b.t === "h" && b.level === 2) {
      const title = textOf(b.c)
      if (sec && sec.groups.length === 1 && !sec.groups[0].text.length && !sec.groups[0].lists.length && !sec.subtitle) sec.subtitle = title
      else out.push({ id: slugify(title), title, groups: [{ text: [], lists: [] }] })
    } else if (b.t === "h") {
      sec.groups.push({ title: textOf(b.c), text: [], lists: [] })
    } else if (isLinkList(b)) {
      sec.groups[sec.groups.length - 1].lists.push(b)
    } else {
      sec.groups[sec.groups.length - 1].text.push(b)
    }
  }
  return out
}

export default function Page() {
  const secs = outline(data as Block[])
  return (
    <>
      <PageHeader title="COVID-19 Business Resource Center" trail={[{ label: "Areas of focus" }, { label: "Commercial Revitalization", href: "/commercial-revitalization/" }]} />
      <div className="wrap grid12 gap-y-8 border-t border-line pb-[var(--s-normal)] pt-[var(--s-tight)]">
        <aside className="col-span-12 lg:col-span-3">
          <SectionIndex items={secs.map((s) => ({ id: s.id, title: s.title }))} />
        </aside>
        <div className="col-span-12 lg:col-span-9">
          {secs.map((s, si) => (
            <section key={s.id} id={s.id} aria-labelledby={`${s.id}-h`} className={`${si ? "border-t border-line pt-[var(--s-tight)]" : ""} pb-[var(--s-tight)]`}>
              <h2 id={`${s.id}-h`} className="t-h2 max-w-[44rem]" data-reveal="wipe">
                <span className="wipe">{s.title}</span>
              </h2>
              {s.subtitle ? <p className="t-h3 mt-3 max-w-[40rem] !text-muted">{s.subtitle}</p> : null}
              {s.groups.map((g, gi) =>
                g.title ? (
                  <details key={gi} className="group-d border-t border-line last:border-b">
                    <summary>
                      <span className="t-h3 transition-colors duration-300">{g.title}</span>
                      <span className="flex items-center gap-4">
                        <span className="t-label tabular">{g.lists.reduce((n, l) => n + l.items.length, 0)}</span>
                        <span className="group-d__mark" aria-hidden="true" />
                      </span>
                    </summary>
                    <div className="pb-6">
                      {g.text.length ? <div className="prose mb-4"><Blocks blocks={g.text} level={3} /></div> : null}
                      <LinkList lists={g.lists} />
                    </div>
                  </details>
                ) : g.text.length || g.lists.length ? (
                  <div key={gi} className="mt-6 [&+details]:mt-8">
                    {g.text.length ? <div className="prose" data-reveal><Blocks blocks={g.text} level={3} /></div> : null}
                    {g.lists.length ? <div className={g.text.length ? "mt-7" : ""}><LinkList lists={g.lists} /></div> : null}
                  </div>
                ) : null,
              )}
            </section>
          ))}
        </div>
      </div>
    </>
  )
}
