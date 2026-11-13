import Link from "next/link"
import { footerMore, footerNav, site } from "@/data/site"
import { Arrow, Seal } from "./icons"
import Words from "./words"

export default function Footer() {
  return (
    <footer className="relative overflow-clip bg-violet text-paper">
      <Seal className="pointer-events-none absolute -right-[12vw] -top-[18vw] w-[58vw] max-w-[52rem] text-[#3a2170] max-md:-right-[30vw] max-md:-top-[10vw] max-md:w-[110vw]" />

      <div className="wrap relative pb-10 pt-[var(--s-normal)]">
        <p className="mission max-w-[58rem] font-display text-[clamp(1.5rem,1.05rem+2vw,2.75rem)] leading-[1.14] tracking-[-0.014em]">
          <Words text={`Founded in ${site.founded}, the mission of RDRC is “${site.mission.replace(/\.$/, "")}.”`} />
        </p>

        <div className="mt-[var(--s-tight)] grid gap-x-[var(--gutter)] gap-y-10 border-t border-white/20 pt-8 sm:grid-cols-2 lg:grid-cols-12">
          <div className="lg:col-span-3">
            <h2 className="t-label !text-brass-light">Visit</h2>
            <address className="mt-3 leading-relaxed">
              The {site.name}
              <br />
              <a href={site.address.mapUrl} target="_blank" rel="noopener noreferrer" className="link">
                {site.address.street}
                <br />
                {site.address.city}, {site.address.state} {site.address.zip}
              </a>
            </address>
            <Link href={site.donateUrl} className="btn btn--light mt-6">
              Donate <Arrow />
            </Link>
          </div>

          <div className="lg:col-span-3">
            <h2 className="t-label !text-brass-light">Contact</h2>
            <dl className="tabular mt-3 grid grid-cols-[auto_1fr] gap-x-4 gap-y-1.5 leading-relaxed">
              <dt className="text-lilac">Telephone</dt>
              <dd><a href={site.phone.href} className="link">{site.phone.label}</a></dd>
              <dt className="text-lilac">Fax</dt>
              <dd>{site.fax}</dd>
              <dt className="text-lilac">Email</dt>
              <dd><a href={`mailto:${site.email}`} className="link">{site.email}</a></dd>
              <dt className="text-lilac">TTY/TDD</dt>
              <dd><a href={site.tty.href} className="link">{site.tty.label}</a></dd>
              <dt className="text-lilac">Voice Relay</dt>
              <dd><a href={site.voiceRelay.href} className="link">{site.voiceRelay.label}</a></dd>
            </dl>
          </div>

          <nav aria-label="Footer" className="sm:col-span-2 lg:col-span-4">
            <h2 className="t-label !text-brass-light">Pages</h2>
            <ul className="mt-3 grid grid-cols-2 gap-x-[var(--gutter)] gap-y-1.5 text-[0.9375rem] leading-relaxed">
              {[...footerNav, ...footerMore].map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="draw">{l.label}</Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="lg:col-span-2">
            <h2 className="t-label !text-brass-light">Follow</h2>
            <ul className="mt-3 grid gap-1.5 leading-relaxed">
              {site.social.map((s) => (
                <li key={s.label}>
                  <a href={s.href} target="_blank" rel="noopener noreferrer" className="group draw">
                    {s.label} <Arrow dir="out" />
                  </a>
                </li>
              ))}
              <li className="mt-2">
                <a href={site.newsletterUrl} target="_blank" rel="noopener noreferrer" className="group draw">
                  Newsletter Sign Up <Arrow dir="out" />
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-wrap items-center justify-between gap-x-8 gap-y-2 border-t border-white/20 pt-5 text-[0.8125rem] text-lilac">
          <p>RDRC © {new Date().getFullYear()}</p>
          <a href="https://www.novusnyc.org/" target="_blank" rel="noopener noreferrer" className="draw py-1 text-[#F6B78D]">
            Made by Novus
          </a>
        </div>
      </div>
    </footer>
  )
}
