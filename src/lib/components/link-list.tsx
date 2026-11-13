import Link from "next/link"
import { Arrow } from "./icons"
import type { ListBlock } from "@/lib/content"
import { textOf } from "@/lib/content"

/** A compact list of links (resource documents): two columns on wide screens. */
export default function LinkList({ lists }: { lists: ListBlock[] }) {
  const items = lists.flatMap((l) => l.items)
  return (
    <ul className="grid gap-x-[var(--gutter)] md:grid-cols-2">
      {items.map((item, i) => {
        const a = item.c.find((n) => typeof n !== "string" && n.t === "a")
        const label = textOf(item.c).trim()
        if (!a || typeof a === "string" || a.t !== "a") return <li key={i} className="border-t border-line py-3 text-[0.9375rem]">{label}</li>
        const internal = a.href.startsWith("/") && !a.href.startsWith("/documents/")
        const cls = "group grid grid-cols-[minmax(0,1fr)_auto] items-baseline gap-4 py-3 text-[0.9375rem] leading-snug"
        const inner = (
          <>
            <span><span className="draw">{label}</span></span>
            <Arrow dir={internal ? "right" : "out"} className="text-brass-ink" />
          </>
        )
        return (
          <li key={i} className="border-t border-line">
            {internal ? (
              <Link href={a.href} className={cls}>{inner}</Link>
            ) : (
              <a href={a.href} className={cls} {...(a.href.startsWith("mailto:") ? {} : { target: "_blank", rel: "noopener noreferrer" })}>{inner}</a>
            )}
          </li>
        )
      })}
    </ul>
  )
}
