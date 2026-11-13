"use client"

import Image from "next/image"
import { useCallback, useEffect, useRef, useState } from "react"

export type Slide = { src: string; w: number; h: number; caption: string }

const HOLD = 7000

const loaded = (img: HTMLImageElement | null | undefined) => !!img && img.complete && img.naturalWidth > 0

/** The home photo sequence. Each photograph slides in over the last.
 *  It advances slowly by itself, can be paused or stepped, and holds still under reduced motion.
 *  A photograph is never shown before it has loaded, and the block never changes height. */
export default function HeroSequence({ slides }: { slides: Slide[] }) {
  const [index, setIndex] = useState(0)
  const [previous, setPrevious] = useState<number | null>(null)
  const [playing, setPlaying] = useState(true)
  const [auto, setAuto] = useState(false)
  // The other photographs are fetched once the first one is on screen, never before it.
  const [warm, setWarm] = useState(false)
  const imgs = useRef<(HTMLImageElement | null)[]>([])
  const current = useRef(0)
  const busy = useRef(false)

  useEffect(() => {
    setAuto(!matchMedia("(prefers-reduced-motion: reduce)").matches)
    let id: ReturnType<typeof setTimeout>
    const start = () => (id = setTimeout(() => setWarm(true), 700))
    if (document.readyState === "complete") start()
    else addEventListener("load", start, { once: true })
    return () => {
      clearTimeout(id)
      removeEventListener("load", start)
    }
  }, [])

  const show = useCallback(
    async (target: number) => {
      const next = (target + slides.length) % slides.length
      if (busy.current || next === current.current) return
      busy.current = true
      setWarm(true)
      const img = imgs.current[next]
      if (img && !loaded(img)) {
        img.loading = "eager"
        // Wait for the picture (briefly) rather than wipe in an empty frame.
        await Promise.race([img.decode().catch(() => {}), new Promise((r) => setTimeout(r, 2500))])
      }
      setPrevious(current.current)
      current.current = next
      setIndex(next)
      busy.current = false
    },
    [slides.length],
  )

  useEffect(() => {
    if (!auto || !playing) return
    const id = setInterval(() => {
      if (!document.hidden) show(current.current + 1)
    }, HOLD)
    return () => clearInterval(id)
  }, [auto, playing, show])

  const step = (dir: 1 | -1) => {
    setPlaying(false)
    show(current.current + dir)
  }

  return (
    <figure className="hero-seq">
      <div className="hero-seq__frame">
        {slides.map((s, i) => (
          <div
            key={s.src}
            className="hero-seq__slide"
            data-state={i === index ? "current" : i === previous ? "previous" : "idle"}
            // The opening photograph is uncovered with the page; later ones slide in over the last.
            data-first={previous === null ? "" : undefined}
            aria-hidden={i !== index}
          >
            <Image
              ref={(el) => {
                imgs.current[i] = el
              }}
              src={s.src}
              alt={s.caption}
              width={s.w}
              height={s.h}
              sizes="(min-width: 1024px) 42vw, 54vw"
              loading={i === 0 || warm ? "eager" : "lazy"}
              fetchPriority={i === 0 ? "high" : undefined}
              preload={i === 0}
            />
          </div>
        ))}
      </div>
      <figcaption className="mt-3 flex items-start justify-between gap-x-6 gap-y-1 max-sm:flex-col">
        <div className="hero-seq__captions t-small max-w-[30rem] flex-1 text-muted" aria-live={playing && auto ? "off" : "polite"}>
          {/* The other captions only lend their height, so the block never jumps. */}
          {slides.map((s, i) => (i === index ? null : <span key={s.src} className="hero-seq__ghost" data-text={s.caption} aria-hidden="true" />))}
          <p key={index} className="hero-seq__caption">
            {slides[index].caption}
          </p>
        </div>
        <div className="-mr-2 flex shrink-0 items-center gap-1 text-violet max-sm:-ml-3">
          <span className="t-small tabular mr-2 text-muted max-sm:ml-3" aria-hidden="true">
            {index + 1} / {slides.length}
          </span>
          <button type="button" className="seq-btn" aria-label="Previous photograph" onClick={() => step(-1)}>
            <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true"><path d="M9 2L4 7l5 5" fill="none" stroke="currentColor" strokeWidth="1.4" /></svg>
          </button>
          <button type="button" className="seq-btn" aria-label="Next photograph" onClick={() => step(1)}>
            <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true"><path d="M5 2l5 5-5 5" fill="none" stroke="currentColor" strokeWidth="1.4" /></svg>
          </button>
          {auto && (
            <button type="button" className="seq-btn" aria-label={playing ? "Pause photographs" : "Play photographs"} aria-pressed={!playing} onClick={() => setPlaying((p) => !p)}>
              {playing ? (
                <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true"><path d="M4.5 2.5v9M9.5 2.5v9" fill="none" stroke="currentColor" strokeWidth="1.6" /></svg>
              ) : (
                <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true"><path d="M4 2.5l7 4.5-7 4.5z" fill="currentColor" /></svg>
              )}
            </button>
          )}
        </div>
      </figcaption>
    </figure>
  )
}
