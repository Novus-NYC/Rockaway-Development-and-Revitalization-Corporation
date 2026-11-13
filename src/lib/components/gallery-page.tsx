import Image from "next/image"
import PageHeader from "./page-header"
import { Blocks } from "./rich"
import Zoom from "./zoom"
import type { Block } from "@/lib/content"
import { media } from "@/lib/media"

/** The two SYEP 2019 pages: a paragraph and a set of photographs that open at full size. */
export default function GalleryPage({ title, blocks, image, subject }: { title: string; blocks: Block[]; image: { src: string; alt: string }; subject: string }) {
  const photos = blocks.filter((b) => b.t === "img")
  const text = blocks.filter((b) => b.t !== "img")
  return (
    <>
      <PageHeader title={title} trail={[{ label: "Areas of focus" }, { label: "Youth Services", href: "/youth-services/" }]} image={image} />
      <div className="wrap grid12 gap-y-10 border-t border-line pb-[var(--s-normal)] pt-[var(--s-tight)]">
        <div className="prose t-lede col-span-12 lg:col-span-7 lg:col-start-4" data-reveal>
          <Blocks blocks={text} />
        </div>
        <ul className="gallery col-span-12">
          {photos.map((b, i) => {
            if (b.t !== "img") return null
            const m = media(b.src)
            const alt = `${subject}, photograph ${i + 1} of ${photos.length}`
            return (
              <li key={b.src + i}>
                <Zoom src={m.src} w={m.w} h={m.h} alt={alt} className="w-full">
                  <span className="frame revive aspect-[4/3]">
                    <Image src={m.src} alt={alt} width={360} height={Math.round((360 * m.h) / m.w)} />
                  </span>
                </Zoom>
              </li>
            )
          })}
        </ul>
      </div>
    </>
  )
}
