import type { Metadata } from "next"
import { SectionIndex, slugify } from "@/lib/components/flow"
import PageHeader from "@/lib/components/page-header"
import { site } from "@/data/site"
import staff from "@/content/staff.json"

export const metadata: Metadata = {
  title: "Staff Directory",
  description: "RDRC staff by department, with email addresses and telephone extensions.",
}

type Person = { name: string; titles: string[]; email?: string; extension?: string }
type Department = { department: string; people: Person[] }

export default function Page() {
  const departments = staff as Department[]
  return (
    <>
      <PageHeader
        title="Staff Directory"
        trail={[{ label: "About Us", href: "/about-us/" }]}
        image={{ src: "/media/2018/12/header-image-slider-3.webp", alt: "A woman carrying an RDRC tote bag hangs an ornament on the holiday tree at the plaza" }}
      />
      <div className="wrap grid12 gap-y-8 border-t border-line pb-[var(--s-normal)] pt-[var(--s-tight)]">
        <aside className="col-span-12 lg:col-span-3">
          <SectionIndex label="Departments" items={departments.map((d) => ({ id: slugify(d.department), title: d.department }))} />
        </aside>
        <div className="col-span-12 lg:col-span-9">
          {departments.map((d, di) => {
            const id = slugify(d.department)
            return (
              <section key={id} id={id} aria-labelledby={`${id}-h`} className={`${di ? "border-t border-line pt-[var(--s-tight)]" : ""} pb-[var(--s-tight)]`}>
                <h2 id={`${id}-h`} className="t-h2 max-w-[40rem]" data-reveal="wipe">
                  <span className="wipe">{d.department}</span>
                </h2>
                <ul className="mt-7 grid gap-x-[var(--gutter)] sm:grid-cols-2 xl:grid-cols-3">
                  {d.people.map((p, i) => (
                    <li key={p.name + i} className="border-t border-line py-5" data-reveal style={{ "--i": i % 3 } as React.CSSProperties}>
                      <h3 className="t-h3">{p.name}</h3>
                      <p className="mt-1 text-[0.9375rem] leading-snug text-muted">
                        {p.titles.map((t, k) => (
                          <span key={k} className="block">{t}</span>
                        ))}
                      </p>
                      <p className="tabular mt-3 grid gap-0.5 text-[0.9375rem]">
                        {p.email ? (
                          <a href={`mailto:${p.email}`} className="link justify-self-start">{p.email}</a>
                        ) : null}
                        <span>
                          <a href={site.phone.href} className="link">{site.phone.label}</a>
                          {p.extension ? <> extension {p.extension}</> : null}
                        </span>
                      </p>
                    </li>
                  ))}
                </ul>
              </section>
            )
          })}
        </div>
      </div>
    </>
  )
}
