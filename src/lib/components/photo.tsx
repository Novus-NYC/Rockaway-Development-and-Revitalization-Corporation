import Image from "next/image"
import { media } from "@/lib/media"
import Zoom from "./zoom"

type Props = {
  src: string
  alt: string
  /** CSS aspect-ratio for the frame, e.g. "3 / 2". Defaults to the image's own ratio. */
  ratio?: string
  sizes: string
  caption?: React.ReactNode
  /** Above the fold: load eagerly and play the restoring line with the page intro. */
  intro?: boolean
  /** "line" = the restoring line; "color" = color returns without the line; "none" = plain. */
  reveal?: "line" | "color" | "none"
  zoom?: boolean
  className?: string
  frameClassName?: string
  contain?: boolean
}

/** A photograph in its frame, with an optional caption. Images are local files with known sizes. */
export default function Photo({ src, alt, ratio, sizes, caption, intro, reveal = "line", zoom, className = "", frameClassName = "", contain }: Props) {
  const m = media(src)
  const frame = (
    <span
      className={`${reveal === "line" ? "restore" : reveal === "color" ? "revive frame" : "frame"} ${frameClassName}`}
      style={{ aspectRatio: ratio ?? `${m.w} / ${m.h}` }}
      data-intro={intro && reveal === "line" ? "" : undefined}
    >
      <Image
        src={m.src}
        alt={alt}
        width={m.w}
        height={m.h}
        sizes={sizes}
        loading={intro ? "eager" : "lazy"}
        fetchPriority={intro ? "high" : undefined}
        preload={intro}
        style={contain ? { objectFit: "contain" } : undefined}
      />
    </span>
  )
  return (
    <figure className={className}>
      {zoom ? (
        <Zoom src={m.src} w={m.w} h={m.h} alt={alt} className="block w-full">
          {frame}
        </Zoom>
      ) : (
        frame
      )}
      {caption ? <figcaption className="t-small mt-2.5 max-w-[34rem] text-muted">{caption}</figcaption> : null}
    </figure>
  )
}
