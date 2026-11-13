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

const eoe = media("/media/2021/10/DYCD-RDRC-Pronouns.webp")

export default function HomePage() {
  return (
    <>
      <section className="relative overflow-clip">
        <Seal className="pointer-events-none absolute -right-[9vw] -top-[13vw] w-[54vw] max-w-[50rem] text-mist max-lg:-right-[38vw] max-lg:-top-[20vw] max-lg:w-[120vw]" />
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

      <section className="areas relative overflow-clip bg-violet text-paper" aria-labelledby="areas-heading">
        <Seal className="pointer-events-none absolute -bottom-[22vw] -left-[14vw] w-[52vw] max-w-[46rem] text-[#3a2170] max-lg:hidden" />
        <div className="wrap grid12 relative gap-y-6 py-[var(--s-normal)]">
          <h2 id="areas-heading" className="t-h2 col-span-12 !text-paper lg:col-span-4" data-reveal="wipe">
            <span className="wipe">Areas of focus</span>
          </h2>
          <ul className="areas__list col-span-12 lg:col-span-8">
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
          <div className="col-span-12 mt-6 border-t border-line pt-6 lg:col-span-8 lg:col-start-5">
            <Image
              src={eoe.src}
              alt="Pronouns: She/Her/Hers. NYC Department of Youth & Community Development, Workforce Connect, Learn & Earn and RDRC. RDRC is an equal opportunity organization/program. Auxiliary aids and services are available upon request to individuals with disabilities. TTY: 1-800-662-1220 / Voice Relay: 1-800-421-1200."
              width={eoe.w}
              height={eoe.h}
              sizes="368px"
              className="w-[23rem] max-w-full"
            />
          </div>
        </div>
      </section>
    </>
  )
}
