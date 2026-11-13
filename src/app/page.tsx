import Image from "next/image"
import Link from "next/link"
import EventsCalendar from "@/lib/components/events-calendar"
import HeroSequence from "@/lib/components/hero-sequence"
import { Seal } from "@/lib/components/icons"
import Words from "@/lib/components/words"
import { events } from "@/data/events"
import { areas, site } from "@/data/site"
import { media } from "@/lib/media"

// The four captioned photographs from the rdrc.org home page.
const slides = [
  { src: "/media/2019/04/home-slider-01.jpg", caption: "RDRC Youth Volunteer to Spruce Up Beach 20th - June 2018" },
  { src: "/media/2019/04/home-slider-02.jpg", caption: "Rockaways Lights of Hope Tree Lighting Ceremony @ The Beach 20th Street Plaza - December 2018" },
  { src: "/media/2019/04/home-slider-03.jpg", caption: "RDRC hosts Press Conference Announcing Winner of the Beach 21st Street Development Project - June 2018" },
  { src: "/media/2019/04/home-slider-04.jpg", caption: "2nd Annual Rockaways Caribbean Carnival Parade Co-Sponsored by RDRC - August 2018" },
].map((s) => ({ ...media(s.src), caption: s.caption }))

const areaImages: Record<string, { src: string; alt: string }> = {
  "/youth-services/": { src: "/media/home/area-youth-services.jpg", alt: "Young performers on stage at an RDRC event" },
  "/workforce-development/": { src: "/media/home/area-workforce-development.webp", alt: "A student at a computer in the learning lab" },
  "/neighborhood-preservation/": { src: "/media/home/area-neighborhood-preservation.jpg", alt: "A housing workshop in session" },
  "/commercial-revitalization/": { src: "/media/home/area-commercial-revitalization.jpg", alt: "A commercial building on a Downtown Far Rockaway corner" },
}

const dycd = media("/media/2019/05/NYC-DYCDLogo.webp")

export default function HomePage() {
  return (
    <>
      <section className="relative overflow-clip">
        <Seal className="hero-seal pointer-events-none absolute -right-[9vw] -top-[13vw] w-[54vw] max-w-[50rem] text-mist max-lg:-right-[38vw] max-lg:-top-[20vw] max-lg:w-[120vw]" />
        <div className="wrap grid12 relative items-end gap-y-10 pb-[var(--s-normal)] pt-[clamp(2.5rem,6vw,6rem)]">
          <div className="col-span-12 lg:col-span-7 lg:pb-[clamp(1rem,3vw,3.5rem)]">
            <h1 className="t-label" data-intro>
              {site.name}
            </h1>
            <blockquote className="mt-5 lg:mt-7">
              <p className="t-display -indent-[0.42em] pl-[0.42em] lg:pl-0" data-intro="words" style={{ "--i": 1 } as React.CSSProperties}>
                <Words text="“Our goal is to revitalize our community by investing in its most precious resource, people…”" />
              </p>
              <footer className="mt-6 flex items-center gap-4 text-[1.0625rem]" data-intro style={{ "--i": 2 } as React.CSSProperties}>
                <span aria-hidden="true" className="h-px w-10 bg-brass" />
                <cite className="not-italic">Kevin Alexander, President &amp; CEO</cite>
              </footer>
            </blockquote>
          </div>
          <div className="col-span-12 lg:col-span-5">
            <HeroSequence slides={slides} />
          </div>
        </div>
      </section>

      {/* Areas of focus. On a wide screen the section holds still while the page scrolls and the
          four areas take their turn (CSS scroll timeline, see globals.css). Everywhere else it
          is a plain list with thumbnails. */}
      <section className="areas relative bg-violet text-paper" aria-labelledby="areas-heading">
        <div className="areas__track">
          <div className="areas__stage">
            <Seal className="areas__seal pointer-events-none absolute -bottom-[22vw] -left-[14vw] w-[52vw] max-w-[46rem] text-[#3a2170] max-lg:hidden" />
            <div className="areas__grid wrap relative">
              <h2 id="areas-heading" className="areas__head t-h2 !text-paper" data-reveal="wipe">
                <span className="wipe">Areas of focus</span>
              </h2>
              <ul className="areas__list">
                {areas.map((a, i) => {
                  const img = media(areaImages[a.href].src)
                  return (
                    <li key={a.href} data-reveal style={{ "--i": i } as React.CSSProperties}>
                      <Link href={a.href} className="area-row group">
                        <span className="area-row__name font-display text-[clamp(1.625rem,1.1rem+2.2vw,3.125rem)] leading-[1.06] tracking-[-0.02em]">{a.label}</span>
                        <span className="area-row__thumb">
                          <Image src={img.src} alt={areaImages[a.href].alt} width={224} height={156} />
                        </span>
                        <span className="arrow text-xl text-brass-light max-sm:hidden" aria-hidden="true">→</span>
                      </Link>
                    </li>
                  )
                })}
              </ul>
              {/* The large photographs of the stage repeat the thumbnails, so they are decorative here. */}
              <div className="areas__photos" aria-hidden="true">
                <div className="areas__frame">
                  {areas.map((a) => {
                    const img = media(areaImages[a.href].src)
                    return (
                      <span key={a.href} className="areas__photo">
                        <Image src={img.src} alt="" width={img.w} height={img.h} sizes="(min-width: 1024px) 38vw, 1px" loading="lazy" />
                      </span>
                    )
                  })}
                </div>
                <p className="areas__count tabular">
                  <span className="areas__digits">
                    {areas.map((a, i) => (
                      <span key={a.href}>{i + 1}</span>
                    ))}
                  </span>
                  <span>/ {areas.length}</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-mist" aria-labelledby="events-heading">
        <div className="wrap grid12 gap-y-6 py-[var(--s-normal)]">
          <div className="col-span-12 lg:col-span-4">
            <h2 id="events-heading" className="t-h2" data-reveal="wipe">
              <span className="wipe">Events</span>
            </h2>
          </div>
          <div className="col-span-12 lg:col-span-8" data-reveal>
            <EventsCalendar events={events} />
          </div>
        </div>
      </section>

      {/* The funders and equal-opportunity notice. On rdrc.org this was a small picture of text;
          here it is text, with the one logo the site has a clean copy of. */}
      <section className="border-t border-line" aria-label="Equal opportunity notice">
        <div className="wrap grid12 items-center gap-y-6 py-[var(--s-tight)]">
          <div className="col-span-12 flex flex-wrap items-center gap-x-8 gap-y-4 lg:col-span-5" data-reveal>
            <span className="shrink-0 bg-white p-3 shadow-[inset_0_0_0_1px_var(--line)]">
              <Image src={dycd.src} alt="NYC Department of Youth & Community Development" width={Math.round((72 * dycd.w) / dycd.h)} height={72} className="h-[4.5rem] w-auto" />
            </span>
            <ul className="t-label flex flex-wrap gap-x-6 gap-y-1">
              <li>Workforce Connect</li>
              <li>Learn &amp; Earn</li>
            </ul>
          </div>
          <div className="col-span-12 lg:col-span-7" data-reveal style={{ "--i": 1 } as React.CSSProperties}>
            <p className="max-w-[40rem]">
              <strong className="font-semibold text-violet">RDRC is an equal opportunity organization/program.</strong> Auxiliary aids and services are available upon request to individuals with disabilities.
            </p>
            <p className="tabular mt-2 text-muted">
              <span className="whitespace-nowrap">TTY: <a href={site.tty.href} className="link">1-800-662-1220</a></span> / <span className="whitespace-nowrap">Voice Relay: <a href={site.voiceRelay.href} className="link">1-800-421-1220</a></span>
            </p>
          </div>
        </div>
      </section>
    </>
  )
}
