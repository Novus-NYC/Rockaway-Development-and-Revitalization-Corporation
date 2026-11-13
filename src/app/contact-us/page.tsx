import type { Metadata } from "next"
import PageHeader from "@/lib/components/page-header"
import { site } from "@/data/site"

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Reach RDRC at 1920 Mott Avenue, Far Rockaway, NY 11691-4111. Telephone 718.327.5300, fax 718.327.4990, email info@rdrc.org.",
}

// The contact page links to its own Google Maps pin.
const mapUrl = "https://goo.gl/maps/KrhE6vUb8eH2"

export default function Page() {
  return (
    <>
      <PageHeader
        title="Contact Us"
        image={{
          src: "/media/2019/05/contact-us-header.jpg",
          alt: "Neighbors seated under the trees at an evening concert on the Beach 20th Street Plaza",
          caption: "RDRC hosts Summertime @ The Plaza Live Latin Jazz Concert - July 2018",
        }}
      />
      <div className="wrap grid12 gap-y-12 border-t border-line pb-[var(--s-normal)] pt-[var(--s-tight)]">
        <div className="col-span-12 lg:col-span-6">
          <h2 className="t-label">Rockaway Development &amp; Revitalization Corporation</h2>
          <address className="mt-4">
            <a href={mapUrl} target="_blank" rel="noopener noreferrer" className="group t-h2 inline-block">
              <span className="draw">{site.address.street}</span>
              <br />
              <span className="draw">{site.address.city}, {site.address.state} {site.address.zip}</span>
            </a>
          </address>

          <dl className="tabular mt-10 max-w-[30rem] border-b border-line">
            {[
              { k: "Telephone", v: <a href={site.phone.href} className="link">{site.phone.label}</a> },
              { k: "Fax", v: site.fax },
              { k: "Email", v: <a href={`mailto:${site.email}`} className="link">{site.email}</a> },
            ].map((r) => (
              <div key={r.k} className="grid grid-cols-[7.5rem_1fr] items-baseline border-t border-line py-4">
                <dt className="t-label">{r.k}</dt>
                <dd className="t-h3">{r.v}</dd>
              </div>
            ))}
          </dl>

          <p className="mt-10 max-w-[34rem]">
            <strong className="font-semibold">Rockaway Development &amp; Revitalization Corporation</strong> is an equal opportunity employer/program. Auxiliary aids and services are available upon request to individuals with disabilities.
          </p>
          <dl className="tabular mt-6 max-w-[30rem] border-b border-line">
            {[
              { k: "TTY", v: <a href="tel:+18006621220" className="link">1-800-662-1220</a> },
              { k: "Voice Replay", v: <a href="tel:+18004211220" className="link">1-800-421-1220</a> },
            ].map((r) => (
              <div key={r.k} className="grid grid-cols-[7.5rem_1fr] items-baseline border-t border-line py-4">
                <dt className="t-label">{r.k}</dt>
                <dd className="t-h3">{r.v}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="col-span-12 lg:col-span-6">
          <div className="frame aspect-[4/3] lg:aspect-auto lg:h-full lg:min-h-[28rem]">
            <iframe
              src={site.address.mapEmbed}
              title="Map of Downtown Far Rockaway showing RDRC at 1920 Mott Avenue"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="size-full border-0"
            />
          </div>
        </div>
      </div>
    </>
  )
}
