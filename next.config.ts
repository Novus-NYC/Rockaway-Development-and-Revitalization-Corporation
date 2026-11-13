import type { NextConfig } from "next"
import shortlinks from "./src/data/shortlinks.json"

// Pages of the old WordPress site that were not carried over as pages, and where they go now.
const moved: Record<string, string> = {
  "/youth-services-2/": "/youth-services/",
  "/business-resources/": "/business-resource-center/",
  "/pdf-upload-test/": "/applications/",
  "/about-us-prev/": "/about-us/",
  "/locations/": "/contact-us/",
  "/my-bookings/": "/",
  "/categories/": "/",
  "/tags/": "/",
  "/2019/10/20/bank-of-america-award-to-rdrc/": "/rdrcnews/bank-of-america-award-to-rdrc/",
}

// Documents keep working at their old upload paths.
const documents: Record<string, string> = {
  "/wp-content/uploads/2022/05/DFR-Business-Guide-April-2022.pdf": "DFR-Business-Guide-April-2022.pdf",
  "/wp-content/uploads/2022/05/Downtown-Far-Rockaway-Vacancy-Report-March-2022.pdf": "Downtown-Far-Rockaway-Vacancy-Report-March-2022.pdf",
  "/wp-content/uploads/2022/02/RDRC-FY-2018-Audit.pdf": "RDRC-FY-2018-Audit.pdf",
  "/wp-content/uploads/2022/02/RDRC-FY-2019-Audit.pdf": "RDRC-FY-2019-Audit.pdf",
  "/wp-content/uploads/2022/02/RDRC-FY-2020-Audit.pdf": "RDRC-FY-2020-Audit.pdf",
  "/wp-content/uploads/2026/01/SEQBI-2026-Flyers.pdf": "SEQBI-2026-Flyers.pdf",
  "/wp-content/uploads/2019/02/Housing-Forms.pdf": "Housing-Forms.pdf",
  "/wp-content/uploads/2020/08/Fillable-Form-RDRC-CREDIT-COUNSELING-CONSENT-FORM.pdf": "Fillable-Form-RDRC-CREDIT-COUNSELING-CONSENT-FORM.pdf",
}

const nextConfig: NextConfig = {
  // rdrc.org URLs end with a slash; keeping that avoids a redirect on every inbound link.
  trailingSlash: true,
  images: {
    formats: ["image/avif", "image/webp"],
    qualities: [75, 85],
    deviceSizes: [420, 640, 828, 1080, 1280, 1600],
    imageSizes: [64, 128, 256, 384],
  },
  async redirects() {
    return [
      // WordPress shortlinks: /?p=1234
      ...Object.entries(shortlinks as Record<string, string>).map(([id, path]) => ({
        source: "/",
        has: [{ type: "query" as const, key: "p", value: id }],
        destination: moved[path] ?? path,
        permanent: true,
      })),
      ...Object.entries(moved).map(([source, destination]) => ({ source, destination, permanent: true })),
      { source: "/locations/:slug/", destination: "/contact-us/", permanent: true },
      ...Object.entries(documents).map(([source, file]) => ({ source, destination: `/documents/${file}`, permanent: true })),
    ]
  },
}

export default nextConfig
