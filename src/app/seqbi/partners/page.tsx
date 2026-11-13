import type { Metadata } from "next"
import Image from "next/image"
import { Flow, slugify } from "@/lib/components/flow"
import PageHeader from "@/lib/components/page-header"
import Related from "@/lib/components/related"
import { Rich } from "@/lib/components/rich"
import type { Block, ImageBlock } from "@/lib/content"
import { textOf } from "@/lib/content"
import { media } from "@/lib/media"
import data from "@/content/pages/seqbi-partners.json"

export const metadata: Metadata = {
  title: "SEQBI Partners",
  description:
    "The partners behind SEQBI: RDRC, Modern Community Capital, the New York Small Business Development Centers and Resorts World New York City.",
}

type Partner = { id: string; title: string; logo?: ImageBlock; blocks: Block[] }

/** Each partner in the source is a logo, a heading, then its text and photographs. */
function partners(blocks: Block[]) {
  const body = blocks.filter((b) => !(b.t === "img" && b.href?.startsWith("#")))
  const out: Partner[] = []
  let pendingLogo: ImageBlock | undefined
  for (let i = 0; i < body.length; i++) {
    const b = body[i]
    const next = body[i + 1]
    if (b.t === "img" && next?.t === "h") {
      pendingLogo = b
    } else if (b.t === "h") {
      const title = textOf(b.c)
      out.push({ id: slugify(title), title, logo: pendingLogo, blocks: [] })
      pendingLogo = undefined
    } else out[out.length - 1]?.blocks.push(b)
  }
  // The page closes with a contact line that belongs to the whole page, not the last partner.
  const last = out[out.length - 1]
  const tail = last.blocks[last.blocks.length - 1]
  const contact = tail?.t === "p" && textOf(tail.c).startsWith("To learn more about the Southeast Queens Business Incubator") ? tail : null
  if (contact) last.blocks.pop()
  return { list: out, contact }
}

const alts: Record<string, string> = {
  "/media/2025/09/IMG_3200-scaled.webp": "RDRC staff and SEQBI partners at the podium during the pitch presentations and graduation ceremony",
  "/media/2025/09/Bitmap.webp": "Demond Wilkerson speaking at a podium",
  "/media/2025/09/Bitmap-2.webp": "Four members of the SEQBI team seated at the RDRC welcome table",
}

export default function Page() {
  const { list, contact } = partners(data as Block[])
  return (
    <>
      <PageHeader
        title="SEQBI Partners"
        trail={[{ label: "SEQBI", href: "/seqbi/" }]}
        image={{ src: "/media/2025/09/Bitmap-5.webp", alt: "SEQBI Fellows and partners in a conference room, gathered around a presentation check" }}
      />

      <nav aria-label="Partners" className="wrap border-t border-line py-8">
        <ul className="grid grid-cols-2 gap-[clamp(0.5rem,1vw,0.875rem)] xs:grid-cols-3 md:grid-cols-4 lg:grid-cols-7">
          {list.map((p) => {
            const m = p.logo ? media(p.logo.src) : null
            return (
              <li key={p.id}>
                <a href={`#${p.id}`} className="logo-tile" aria-label={p.title}>
                  {m ? <Image src={m.src} alt="" width={200} height={Math.round((200 * m.h) / m.w)} /> : p.title}
                </a>
              </li>
            )
          })}
        </ul>
      </nav>

      <div className="wrap pb-[var(--s-normal)]">
        {list.map((p) => (
          <section key={p.id} id={p.id} aria-labelledby={`${p.id}-h`} className="grid12 gap-y-6 border-t border-line py-[var(--s-tight)]">
            <h2 id={`${p.id}-h`} className="t-h2 col-span-12 lg:col-span-3" data-reveal="wipe">
              <span className="wipe">{p.title}</span>
            </h2>
            <div className="col-span-12 lg:col-span-9">
              <Flow blocks={p.blocks} alts={alts} fallbackAlt={p.title} />
            </div>
          </section>
        ))}
        {contact && contact.t === "p" ? (
          <p className="t-lede border-t border-line pt-8 lg:ml-[25%] lg:max-w-[40rem]" data-reveal>
            <Rich c={contact.c} />
          </p>
        ) : null}
      </div>

      <Related
        title="More in SEQBI"
        links={[
          { label: "Meet the Fellows", href: "/seqbi/meet-the-fellows/" },
          { label: "Eligibility Requirements", href: "/seqbi/eligibility-requirements/" },
        ]}
      />
    </>
  )
}
