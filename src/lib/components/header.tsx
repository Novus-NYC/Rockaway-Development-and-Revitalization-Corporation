"use client"

import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect, useRef, useState } from "react"
import { aboutNav, areas, seqbiNav, site, type NavLink } from "@/data/site"
import { Arrow, SocialIcon } from "./icons"

type PanelKey = "areas" | "seqbi" | "about"

const same = (a: string, b: string) => a.replace(/\/$/, "") === b.replace(/\/$/, "")
const within = (path: string, links: NavLink[]): boolean =>
  links.some((l) => same(path, l.href) || (l.children ? within(path, l.children) : false))

export default function Header() {
  const pathname = usePathname() || "/"
  const [open, setOpen] = useState<PanelKey | null>(null)
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const bar = useRef<HTMLDivElement>(null)
  const sentinel = useRef<HTMLDivElement>(null)
  const menu = useRef<HTMLDialogElement>(null)

  // Close everything when the route changes.
  useEffect(() => {
    setOpen(null)
    if (menu.current?.open) menu.current.close()
  }, [pathname])

  useEffect(() => {
    if (menuOpen && menu.current && !menu.current.open) menu.current.showModal()
  }, [menuOpen])

  // The bar gains its hairline once the page has moved under it (no scroll listener).
  useEffect(() => {
    const el = sentinel.current
    if (!el) return
    const io = new IntersectionObserver(([e]) => setScrolled(!e.isIntersecting))
    io.observe(el)
    return () => io.disconnect()
  }, [])

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return
      const trigger = bar.current?.querySelector<HTMLButtonElement>(`[aria-controls="panel-${open}"]`)
      setOpen(null)
      trigger?.focus()
    }
    const onDown = (e: PointerEvent) => {
      if (bar.current && !bar.current.contains(e.target as Node)) setOpen(null)
    }
    document.addEventListener("keydown", onKey)
    document.addEventListener("pointerdown", onDown)
    return () => {
      document.removeEventListener("keydown", onKey)
      document.removeEventListener("pointerdown", onDown)
    }
  }, [open])

  const current = (href: string) => (same(pathname, href) ? ("page" as const) : undefined)
  const trigger = (key: PanelKey, label: string, links: NavLink[]) => (
    <button
      type="button"
      className="nav-trigger draw flex items-center gap-1.5 py-2"
      aria-expanded={open === key}
      aria-controls={`panel-${key}`}
      data-active={within(pathname, links) || undefined}
      onClick={() => setOpen(open === key ? null : key)}
    >
      {label}
      <svg width="9" height="6" viewBox="0 0 9 6" aria-hidden="true" className={open === key ? "[rotate:180deg]" : ""}>
        <path d="M1 1l3.5 3.5L8 1" fill="none" stroke="currentColor" strokeWidth="1.4" />
      </svg>
    </button>
  )

  return (
    <>
      {/* Utility strip: scrolls away with the page */}
      <div className="bg-violet text-paper">
        <div className="wrap flex min-h-9 flex-wrap items-center justify-between gap-x-6 gap-y-1 py-1.5 text-[0.8125rem] leading-snug">
          <Link href={site.announcement.href} className="group py-1 text-lilac transition-colors hover:text-paper">
            <span className="draw">{site.announcement.text}</span> <Arrow />
          </Link>
          <div className="hidden items-center gap-5 lg:flex">
            <a href={site.phone.href} className="draw tabular py-1">{site.phone.label}</a>
            <a href={`mailto:${site.email}`} className="draw py-1">{site.email}</a>
            <a href={site.newsletterUrl} target="_blank" rel="noopener noreferrer" className="draw py-1">Newsletter Sign Up</a>
            <ul className="flex items-center gap-1">
              {site.social.map((s) => (
                <li key={s.label}>
                  <a href={s.href} target="_blank" rel="noopener noreferrer" aria-label={`RDRC on ${s.label}`} className="grid size-7 place-items-center text-lilac transition-colors hover:text-paper">
                    <SocialIcon name={s.label} />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <div ref={sentinel} aria-hidden="true" />

      <header
        ref={bar}
        className={`sticky top-0 z-50 bg-white transition-shadow duration-300 ${scrolled || open ? "shadow-[0_1px_0_var(--line)]" : ""}`}
      >
        <div className="wrap flex h-[var(--header-h)] items-center justify-between gap-6">
          <Link href="/" className="brand flex shrink-0 items-center gap-3" aria-label={`${site.name}, home`}>
            <Image src="/media/2018/09/rdrc-logo.webp" alt="" width={112} height={112} loading="eager" className="brand__mark size-12 sm:size-[3.25rem]" />
            <span className="font-display text-[0.9375rem] leading-[1.15] text-violet max-[350px]:hidden">
              <span className="brand__name draw">
              Rockaway Development &amp;
              <br />
              Revitalization Corporation
              </span>
            </span>
          </Link>

          <nav aria-label="Main" className="hidden items-center gap-7 text-[0.9375rem] font-medium text-violet nav:flex">
            {trigger("areas", "Areas of focus", areas)}
            {trigger("seqbi", "SEQBI", seqbiNav)}
            {trigger("about", "About Us", aboutNav)}
            <Link href="/rdrcnews/" className="draw py-2" aria-current={pathname.startsWith("/rdrcnews") ? "page" : undefined}>RDRC News</Link>
            <Link href="/our-supporters/" className="draw py-2" aria-current={current("/our-supporters/")}>Our Supporters</Link>
            <Link href="/contact-us/" className="draw py-2" aria-current={current("/contact-us/")}>Contact Us</Link>
            <Link href={site.donateUrl} className="btn ml-1">Donate Now</Link>
          </nav>

          <button
            type="button"
            className="group flex h-11 items-center gap-3 text-[0.9375rem] font-medium text-violet nav:hidden"
            aria-haspopup="dialog"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen(true)}
          >
            Menu
            <span aria-hidden="true" className="grid gap-[5px]">
              <span className="block h-px w-6 bg-current" />
              <span className="block h-px w-6 bg-current" />
            </span>
          </button>
        </div>

        {/* Desktop panels */}
        <div className="absolute inset-x-0 top-full hidden nav:block">
          <Panel id="panel-areas" open={open === "areas"}>
            <ul className="grid grid-cols-4 gap-x-[var(--gutter)]">
              {areas.map((a, i) => (
                <li key={a.href} style={{ "--i": i } as React.CSSProperties} className="panel-item border-t border-line pt-4">
                  <Link href={a.href} className="group t-h3 block" aria-current={current(a.href)}>
                    <span className="draw">{a.label}</span>
                  </Link>
                  {a.children && (
                    <ul className="mt-3 grid gap-2 text-[0.9375rem] text-muted">
                      {a.children.map((c) => (
                        <li key={c.href}>
                          <Link href={c.href} className="draw hover:text-violet" aria-current={current(c.href)}>{c.label}</Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </ul>
          </Panel>
          <Panel id="panel-seqbi" open={open === "seqbi"}>
            <div className="grid grid-cols-12 gap-x-[var(--gutter)]">
              <div className="panel-item col-span-4 border-t border-line pt-4">
                <Link href="/seqbi/" className="t-h3 block" aria-current={current("/seqbi/")}>
                  <span className="draw">Southeast Queens Business Incubator</span>
                </Link>
                <ul className="mt-3 grid gap-2 text-[0.9375rem] text-muted">
                  <li><Link href="/seqbi/eligibility-requirements/" className="draw hover:text-violet" aria-current={current("/seqbi/eligibility-requirements/")}>Eligibility Requirements</Link></li>
                  <li><Link href="/seqbi/partners/" className="draw hover:text-violet" aria-current={current("/seqbi/partners/")}>Partners</Link></li>
                </ul>
              </div>
              <div className="panel-item col-span-8 border-t border-line pt-4" style={{ "--i": 1 } as React.CSSProperties}>
                <Link href="/seqbi/meet-the-fellows/" className="t-h3 block" aria-current={current("/seqbi/meet-the-fellows/")}>
                  <span className="draw">Meet the Fellows</span>
                </Link>
                <ul className="mt-3 grid grid-cols-2 gap-x-[var(--gutter)] gap-y-2 text-[0.9375rem] text-muted">
                  {seqbiNav[1].children!.map((c) => (
                    <li key={c.href}>
                      <Link href={c.href} className="draw hover:text-violet" aria-current={current(c.href)}>{c.label}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Panel>
          <Panel id="panel-about" open={open === "about"}>
            <ul className="grid grid-cols-5 gap-x-[var(--gutter)]">
              {aboutNav.map((a, i) => (
                <li key={a.href} style={{ "--i": i } as React.CSSProperties} className="panel-item border-t border-line pt-4">
                  <Link href={a.href} className="t-h3 block" aria-current={current(a.href)}>
                    <span className="draw">{a.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </Panel>
        </div>
      </header>

      {/* Small screens: one sheet with every page */}
      <dialog ref={menu} id="site-menu" aria-label="Menu" className="site-menu" onClose={() => setMenuOpen(false)}>
        {menuOpen ? (
        <>
        <div className="flex h-[var(--header-h)] items-center justify-between px-[var(--margin)]">
          <span className="font-display text-lg text-violet">Menu</span>
          <button type="button" className="flex h-11 items-center gap-3 text-[0.9375rem] font-medium text-violet" onClick={() => menu.current?.close()}>
            Close
            <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true"><path d="M2 2l14 14M16 2L2 16" stroke="currentColor" strokeWidth="1.2" fill="none" /></svg>
          </button>
        </div>
        <nav aria-label="All pages" className="px-[var(--margin)] pb-10">
          <MenuGroup title="Areas of focus">
            {areas.map((a) => (
              <MenuLink key={a.href} link={a} pathname={pathname} />
            ))}
          </MenuGroup>
          <MenuGroup title="SEQBI">
            {seqbiNav.map((a) => (
              <MenuLink key={a.href} link={a.href === "/seqbi/" ? { ...a, label: "Southeast Queens Business Incubator" } : a} pathname={pathname} />
            ))}
          </MenuGroup>
          <MenuGroup title="About Us">
            {aboutNav.map((a) => (
              <MenuLink key={a.href} link={a} pathname={pathname} />
            ))}
          </MenuGroup>
          <MenuGroup title="More">
            <MenuLink link={{ label: "RDRC News", href: "/rdrcnews/" }} pathname={pathname} />
            <MenuLink link={{ label: "Our Supporters", href: "/our-supporters/" }} pathname={pathname} />
            <MenuLink link={{ label: "Contact Us", href: "/contact-us/" }} pathname={pathname} />
          </MenuGroup>
          <div className="mt-8 grid gap-3 border-t border-line pt-6 text-[0.9375rem]">
            <Link href={site.donateUrl} className="btn justify-center">Donate Now</Link>
            <a href={site.newsletterUrl} target="_blank" rel="noopener noreferrer" className="btn btn--line justify-center">Newsletter Sign Up</a>
            <p className="mt-3 flex flex-wrap gap-x-6 gap-y-2 text-muted">
              <a href={site.phone.href} className="link tabular">{site.phone.label}</a>
              <a href={`mailto:${site.email}`} className="link">{site.email}</a>
            </p>
            <ul className="flex gap-5 text-muted">
              {site.social.map((s) => (
                <li key={s.label}>
                  <a href={s.href} target="_blank" rel="noopener noreferrer" className="link">{s.label}</a>
                </li>
              ))}
            </ul>
          </div>
        </nav>
        </>
        ) : null}
      </dialog>
    </>
  )
}

function Panel({ id, open, children }: { id: string; open: boolean; children: React.ReactNode }) {
  return (
    <div id={id} hidden={!open} className="nav-panel border-t border-line bg-white shadow-[0_24px_40px_-28px_rgb(26_18_48/0.35)]">
      <div className="wrap pb-10 pt-6">{children}</div>
    </div>
  )
}

function MenuGroup({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="border-t border-line py-5 first:border-t-0">
      <h2 className="t-label mb-3">{title}</h2>
      <ul className="grid gap-1">{children}</ul>
    </section>
  )
}

function MenuLink({ link, pathname }: { link: NavLink; pathname: string }) {
  return (
    <li>
      <Link href={link.href} className="block py-1.5 font-display text-[1.375rem] leading-tight text-violet" aria-current={same(pathname, link.href) ? "page" : undefined}>
        {link.label}
      </Link>
      {link.children && (
        <ul className="mb-2 mt-1 grid gap-0.5 border-l border-line pl-4">
          {link.children.map((c) => (
            <li key={c.href}>
              <Link href={c.href} className="block py-1.5 text-[0.9375rem] leading-snug text-muted" aria-current={same(pathname, c.href) ? "page" : undefined}>
                {c.label}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </li>
  )
}
