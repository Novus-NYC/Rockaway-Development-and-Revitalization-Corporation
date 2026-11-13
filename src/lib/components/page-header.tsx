import Link from "next/link"
import Photo from "./photo"
import Words from "./words"

type Crumb = { label: string; href?: string }

type Props = {
  title: string
  /** Where this page sits: shown as a small trail above the title. */
  trail?: Crumb[]
  intro?: React.ReactNode
  image?: { src: string; alt: string; caption?: string; contain?: boolean }
  children?: React.ReactNode
}

/** Title block shared by the inner pages: trail, title, optional intro, and the page's own photograph. */
export default function PageHeader({ title, trail, intro, image, children }: Props) {
  return (
    <header className="wrap grid12 items-end gap-y-8 pb-[var(--s-tight)] pt-[clamp(2.25rem,4.5vw,4.5rem)]">
      <div className={`col-span-12 ${image ? "lg:col-span-8" : "lg:col-span-9"}`}>
        {trail?.length ? (
          <p className="t-label flex flex-wrap gap-x-2" data-intro>
            {trail.map((c, i) => (
              <span key={c.label} className="flex gap-x-2">
                {c.href ? <Link href={c.href} className="draw -my-1.5 inline-block py-1.5">{c.label}</Link> : c.label}
                {i < trail.length - 1 ? <span aria-hidden="true" className="text-muted">/</span> : null}
              </span>
            ))}
          </p>
        ) : null}
        <h1 className="t-h1 mt-4" data-intro="words" style={{ "--i": 1 } as React.CSSProperties}>
          <Words text={title} />
        </h1>
        {intro ? (
          <div className="t-lede mt-6 max-w-[40rem] text-ink" data-intro style={{ "--i": 2 } as React.CSSProperties}>
            {intro}
          </div>
        ) : null}
        {children ? (
          <div className="mt-7" data-intro style={{ "--i": 3 } as React.CSSProperties}>
            {children}
          </div>
        ) : null}
      </div>
      {image ? (
        <Photo
          src={image.src}
          alt={image.alt}
          caption={image.caption}
          ratio="3 / 2"
          sizes="(min-width: 1024px) 30vw, (min-width: 640px) 56vw, 54vw"
          intro
          parallax
          contain={image.contain}
          className="col-span-10 sm:col-span-7 lg:col-span-4"
        />
      ) : null}
    </header>
  )
}
