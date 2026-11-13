import newsData from "@/content/news.json"

// A small document model. The news archive and the long program pages were converted from
// the original WordPress markup into this shape, so the wording is carried over exactly.
export type Inline =
  | string
  | { t: "b" | "i" | "u" | "sup" | "hl"; c: Inline[] }
  | { t: "a"; href: string; c: Inline[] }
  | { t: "br" }

export type ListItem = { c: Inline[]; sub?: ListBlock }
export type ListBlock = { t: "ul" | "ol"; items: ListItem[] }
export type ImageBlock = { t: "img"; src: string; alt?: string; caption?: Inline[]; href?: string }
export type Block =
  | { t: "p"; c: Inline[]; align?: "center" | "right"; label?: string }
  | { t: "h"; level: number; c: Inline[] }
  | ListBlock
  | ImageBlock
  | { t: "iframe"; src: string }

export type Post = {
  id: number
  slug: string
  title: string
  date: string
  excerpt: string
  image: string | null
  body: Block[]
  external?: string
}

export const posts = newsData as unknown as Post[]

export function getPost(slug: string) {
  return posts.find((p) => p.slug === slug)
}

export function textOf(c: Inline[]): string {
  return c.map((n) => (typeof n === "string" ? n : n.t === "br" ? " " : textOf(n.c))).join("")
}

const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

/** "2021-06-11" → "June 11, 2021" (no Date object: no time zone surprises). */
export function longDate(iso: string) {
  const [y, m, d] = iso.split("-").map(Number)
  return `${MONTHS[m - 1]} ${d}, ${y}`
}
export function shortDate(iso: string) {
  const [, m, d] = iso.split("-").map(Number)
  return `${MONTHS[m - 1].slice(0, 3)} ${d}`
}
