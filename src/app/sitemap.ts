import type { MetadataRoute } from "next"
import { fellowsPages } from "@/data/fellows"
import { site } from "@/data/site"
import { posts } from "@/lib/content"

const pages = [
  "/",
  "/about-us/",
  "/about-us/our-history/",
  "/about-us/board-of-directors/",
  "/about-us/staff-directory/",
  "/corporate-compliance/",
  "/rdrcnews/",
  "/youth-services/",
  "/syep-2019-project-base-learning-technology/",
  "/syep-2019-project-base-learning/",
  "/workforce-development/",
  "/neighborhood-preservation/",
  "/applications/",
  "/commercial-revitalization/",
  "/far-rockaway-businesses-information/",
  "/business-resource-center/",
  "/seqbi/",
  "/seqbi/meet-the-fellows/",
  "/seqbi/eligibility-requirements/",
  "/seqbi/partners/",
  "/our-supporters/",
  "/contact-us/",
]

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    ...pages.map((p) => ({ url: `${site.url}${p}` })),
    ...fellowsPages.map((p) => ({ url: `${site.url}${p.href}` })),
    ...posts.map((p) => ({ url: `${site.url}/rdrcnews/${p.slug}/`, lastModified: p.date })),
  ]
}
