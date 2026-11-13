import type { Metadata, Viewport } from "next"
import Footer from "@/lib/components/footer"
import Curtain from "@/lib/components/curtain"
import Header from "@/lib/components/header"
import Motion from "@/lib/components/motion"
import { site } from "@/data/site"
import { switzer, switzerItalic, zodiak, zodiakItalic } from "./fonts"
import "./globals.css"

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: `${site.name} (${site.shortName})`, template: `%s | ${site.shortName}` },
  description: site.description,
  alternates: { canonical: "./" },
  openGraph: { type: "website", siteName: site.name, locale: "en_US", images: ["/og.png"] },
  twitter: { card: "summary_large_image" },
}

export const viewport: Viewport = { themeColor: "#2e175c" }

// Runs before the first paint. Reveal styles only apply when scripts and motion are both on,
// so the content is fully visible without JavaScript and under reduced motion.
// The first page of a visit also gets `intro`: the curtain lifts off it once.
const flags = `(function(){var h=document.documentElement;h.classList.add('js');if(matchMedia('(prefers-reduced-motion: reduce)').matches)return;h.classList.add('motion');try{if(!sessionStorage.getItem('rdrc-seen')){sessionStorage.setItem('rdrc-seen','1');h.classList.add('intro')}}catch(e){}})()`

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "NGO",
  name: site.name,
  alternateName: site.shortName,
  url: site.url,
  logo: `${site.url}/media/2018/09/rdrc-logo.webp`,
  foundingDate: String(site.founded),
  email: site.email,
  telephone: "+1-718-327-5300",
  faxNumber: "+1-718-327-4990",
  address: {
    "@type": "PostalAddress",
    streetAddress: site.address.street,
    addressLocality: site.address.city,
    addressRegion: site.address.state,
    postalCode: site.address.zip,
    addressCountry: "US",
  },
  sameAs: site.social.map((s) => s.href),
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${zodiak.variable} ${zodiakItalic.variable} ${switzer.variable} ${switzerItalic.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: flags }} />
      </head>
      <body>
        <a className="skip-link" href="#main">Skip to content</a>
        <Curtain />
        <Header />
        <main id="main" tabIndex={-1}>
          {children}
        </main>
        <Footer />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
        <Motion />
      </body>
    </html>
  )
}
