import data from "@/content/fellows.json"
import { cohorts } from "@/data/site"

export type Fellow = { name: string; business: string }
export type Winner = { place: string; name: string; business: string; photos: string[] }

const all = data as Record<string, { roster: Fellow[]; winners: Winner[] }>

// The banner photograph of each page on rdrc.org (the Spring 2025 winners page has none).
const images: Record<string, { src: string; alt: string }> = {
  "fall-2024": { src: "/media/2025/09/Bitmap-png.webp", alt: "The Fall 2024 class standing together in front of a living green wall at Resorts World" },
  "fall-2024-winners": { src: "/media/2025/09/Bitmap-1-png.webp", alt: "Pitch competition winners being interviewed after the Fall 2024 final" },
  "spring-2025": { src: "/media/2025/09/Bitmap-5.webp", alt: "The Spring 2025 class in a conference room, gathered around a presentation check" },
  "summer-2025": { src: "/media/2025/09/Bitmap-9.webp", alt: "The Summer 2025 class holding their certificates in front of a Resorts World backdrop" },
  "summer-2025-winners": { src: "/media/2025/09/Bitmap-10.webp", alt: "The Summer 2025 class with three presentation checks for the pitch competition winners" },
}

export type FellowsPage = {
  slug: string
  href: string
  title: string
  cohort: string
  kind: "roster" | "winners"
  roster: Fellow[]
  winners: Winner[]
  image?: { src: string; alt: string }
}

export const fellowsPages: FellowsPage[] = cohorts.flatMap((c) => {
  const d = all[c.key]
  const slug = (href: string) => href.replace(/\/$/, "").split("/").pop()!
  return [
    { slug: slug(c.href), href: c.href, title: c.label, cohort: c.label, kind: "roster" as const, roster: d.roster, winners: d.winners, image: images[c.key] },
    {
      slug: slug(c.winnersHref),
      href: c.winnersHref,
      title: `${c.label} Pitch Competition Winners`,
      cohort: c.label,
      kind: "winners" as const,
      roster: d.roster,
      winners: d.winners,
      image: images[`${c.key}-winners`],
    },
  ]
})
