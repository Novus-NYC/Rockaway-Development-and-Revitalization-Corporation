import manifest from "@/content/media.json"

export type Media = { src: string; w: number; h: number }

const sizes = manifest as Record<string, { w: number; h: number }>

/** Look up a local image by its public path. Fails the build if the file is not in the manifest. */
export function media(src: string): Media {
  const m = sizes[src]
  if (!m) throw new Error(`Unknown media: ${src}`)
  return { src, w: m.w, h: m.h }
}
