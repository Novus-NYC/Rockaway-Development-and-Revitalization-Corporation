"use client"

import { usePathname, useRouter } from "next/navigation"
import { useEffect, useRef } from "react"
import { Seal } from "./icons"

const SWEEP = "cubic-bezier(0.7, 0, 0.2, 1)"

/** The page-to-page sweep: a violet panel with a brass edge crosses the screen like a fresh
 *  coat, and the next page is there when it has passed. The same panel lifts off the very
 *  first page of a visit (that part is CSS only, see `html.intro`).
 *  Back and forward, new-tab clicks, files, outside links and reduced motion are left alone. */
export default function Curtain() {
  const router = useRouter()
  const pathname = usePathname()
  const panel = useRef<HTMLDivElement>(null)
  const state = useRef<"idle" | "covering" | "covered">("idle")
  const mounted = useRef(false)
  const failsafe = useRef<ReturnType<typeof setTimeout> | undefined>(undefined)

  const uncover = () => {
    const el = panel.current
    clearTimeout(failsafe.current)
    if (!el || state.current === "idle") return
    delete document.documentElement.dataset.nav // page intros start as the panel leaves
    const out = el.animate([{ transform: "translateX(0)" }, { transform: "translateX(101%)" }], { duration: 640, easing: SWEEP, fill: "forwards" })
    out.finished
      .catch(() => {})
      .then(() => {
        el.getAnimations().forEach((a) => a.cancel())
        el.style.visibility = ""
        state.current = "idle"
      })
  }

  // The first-visit intro is a CSS animation; once it has played, hand the panel back.
  useEffect(() => {
    const el = panel.current
    const html = document.documentElement
    if (!el || !html.classList.contains("intro")) return
    const done = () => html.classList.remove("intro")
    el.addEventListener("animationend", done, { once: true })
    const id = setTimeout(done, 2600)
    return () => {
      clearTimeout(id)
      el.removeEventListener("animationend", done)
    }
  }, [])

  useEffect(() => {
    const reduce = matchMedia("(prefers-reduced-motion: reduce)")
    const onClick = (e: MouseEvent) => {
      if (reduce.matches || e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return
      const a = (e.target as Element | null)?.closest?.("a")
      if (!a || (a.target && a.target !== "_self") || a.hasAttribute("download") || a.hasAttribute("data-no-transition")) return
      let url: URL
      try {
        url = new URL(a.href, location.href)
      } catch {
        return
      }
      if (url.origin !== location.origin || url.pathname === location.pathname) return // outside, or a jump within this page
      if (/\.[a-z0-9]{2,5}$/i.test(url.pathname)) return // a file
      e.preventDefault() // next/link stands down when the click is already handled
      if (state.current !== "idle") return
      const el = panel.current
      const href = url.pathname + url.search + url.hash
      if (!el) return router.push(href)

      state.current = "covering"
      document.querySelector<HTMLDialogElement>("dialog[open]")?.close()
      router.prefetch(href)
      document.documentElement.dataset.nav = "1"
      el.style.visibility = "visible"
      el.animate([{ transform: "translateX(-101%)" }, { transform: "translateX(0)" }], { duration: 520, easing: SWEEP, fill: "forwards" })
        .finished.catch(() => {})
        .then(() => {
          state.current = "covered"
          router.push(href)
          failsafe.current = setTimeout(uncover, 6000) // never leave the screen covered
        })
    }
    document.addEventListener("click", onClick, true)
    return () => document.removeEventListener("click", onClick, true)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router])

  // The new page is in place: let the panel pass.
  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true
      return
    }
    if (state.current !== "idle") uncover()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname])

  return (
    <div id="curtain" aria-hidden="true">
      <div ref={panel} className="curtain__panel">
        <Seal className="curtain__seal" />
      </div>
    </div>
  )
}
