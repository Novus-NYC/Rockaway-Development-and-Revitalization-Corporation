"use client"

import Image from "next/image"
import { useRef, useState } from "react"

/** Click a flyer or photograph to read it at full size. Native <dialog>: Escape and focus are handled by the browser. */
export default function Zoom({ src, w, h, alt, children, className = "" }: { src: string; w: number; h: number; alt: string; children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDialogElement>(null)
  const [open, setOpen] = useState(false)
  return (
    <>
      <button
        type="button"
        className={`zoom group ${className}`}
        aria-label={alt ? `Enlarge image: ${alt}` : "Enlarge image"}
        onClick={() => {
          setOpen(true)
          ref.current?.showModal()
        }}
      >
        {children}
        <span aria-hidden="true" className="zoom__mark">
          <svg width="14" height="14" viewBox="0 0 14 14"><path d="M7 1v12M1 7h12" stroke="currentColor" strokeWidth="1.3" fill="none" /></svg>
        </span>
      </button>
      <dialog
        ref={ref}
        className="lightbox"
        aria-label={alt || "Image"}
        onClose={() => setOpen(false)}
        onClick={(e) => {
          if (e.target === ref.current) ref.current?.close()
        }}
      >
        {open && (
          <Image src={src} alt={alt} width={w} height={h} sizes="100vw" quality={85} className="lightbox__img" />
        )}
        <form method="dialog">
          <button className="lightbox__close" aria-label="Close">
            <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true"><path d="M2 2l14 14M16 2L2 16" stroke="currentColor" strokeWidth="1.3" fill="none" /></svg>
          </button>
        </form>
      </dialog>
    </>
  )
}
