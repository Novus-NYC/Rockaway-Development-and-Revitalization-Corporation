"use client"

import { usePathname } from "next/navigation"
import { useEffect } from "react"

// One IntersectionObserver for the whole site. It adds `is-in` to anything that reveals on
// entry (text with data-reveal, photographs with .unmask or .settle). No scroll listeners and
// no animation loops: the motion itself is CSS. Above-the-fold content uses data-intro instead,
// which is pure CSS and does not wait for this script.
let io: IntersectionObserver | null = null

function scan() {
  if (!document.documentElement.classList.contains("motion")) return
  io ??= new IntersectionObserver(
    (entries) => {
      for (const e of entries) {
        if (!e.isIntersecting) continue
        e.target.classList.add("is-in")
        io?.unobserve(e.target)
      }
    },
    { rootMargin: "0px 0px -6% 0px", threshold: 0.08 },
  )
  document
    .querySelectorAll("[data-reveal]:not(.is-in), .unmask:not(.is-in):not([data-intro]), .settle:not(.is-in)")
    .forEach((el) => io!.observe(el))
}

export default function Motion() {
  const pathname = usePathname()
  useEffect(() => {
    const id = requestAnimationFrame(scan)
    return () => cancelAnimationFrame(id)
  }, [pathname])
  return null
}
