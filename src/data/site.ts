// Organization facts and navigation, in one place. Everything here comes from rdrc.org.

export const site = {
  name: "Rockaway Development & Revitalization Corporation",
  shortName: "RDRC",
  // Production URL: canonical links, the sitemap and social cards all read this.
  url: "https://www.rdrc.org",
  description:
    "RDRC has served the Rockaways since 1978: youth services, workforce development, neighborhood preservation and commercial revitalization in Far Rockaway, Queens.",
  founded: 1978,
  mission:
    "to promote the revitalization of the Rockaways economic base and neighborhoods, and to secure an improved quality of life for its residents.",
  address: {
    street: "1920 Mott Avenue",
    city: "Far Rockaway",
    state: "NY",
    zip: "11691-4111",
    mapUrl: "https://goo.gl/maps/awji4bvUko82",
    mapEmbed:
      "https://maps.google.com/maps/ms?msa=0&msid=205820583930025956433.000469ab1b59860d0c702&ie=UTF8&t=m&ll=40.60483,-73.752251&spn=0.021504,0.071154&z=14&output=embed",
  },
  phone: { label: "718.327.5300", href: "tel:+17183275300" },
  fax: "718.327.4990",
  email: "info@rdrc.org",
  tty: { label: "1.800.662.1220", href: "tel:+18006621220" },
  voiceRelay: { label: "1.800.421.1220", href: "tel:+18004211220" },
  newsletterUrl:
    "https://visitor.r20.constantcontact.com/manage/optin?v=001f-KEXzn5tO1N9oJq961YEq-GzWV1xAIboWtxqYSZXpq5yO1UUgfaSniqtf1xswR-A8b9vOUVS7HXpQIU0guJvspmnPOyroO7_bzKHe449Dw%3D",
  // rdrc.org's "Donate Now" pointed back at the home page. Until RDRC supplies a
  // donation link it leads to the contact page. Change this one line when it exists.
  donateUrl: "/contact-us/",
  announcement: {
    text: "Resources For Businesses During COVID-19 - See Our Business Resource Center",
    href: "/business-resource-center/",
  },
  social: [
    { label: "Facebook", href: "https://www.facebook.com/rockawaydevrevcorp/" },
    { label: "Instagram", href: "https://www.instagram.com/farrocklive/" },
    { label: "Twitter", href: "https://twitter.com/the_rdrc" },
  ],
} as const

export type NavLink = { label: string; href: string; children?: NavLink[] }

export const areas: NavLink[] = [
  {
    label: "Youth Services",
    href: "/youth-services/",
    children: [
      { label: "SYEP 2019 Project Base Learning Technology", href: "/syep-2019-project-base-learning-technology/" },
      { label: "SYEP 2019 Project Base Learning", href: "/syep-2019-project-base-learning/" },
    ],
  },
  { label: "Workforce Development", href: "/workforce-development/" },
  { label: "Neighborhood Preservation", href: "/neighborhood-preservation/" },
  {
    label: "Commercial Revitalization",
    href: "/commercial-revitalization/",
    children: [{ label: "Far Rockaway Businesses Information", href: "/far-rockaway-businesses-information/" }],
  },
]

export const cohorts = [
  {
    key: "fall-2024",
    label: "Class of Fall 2024",
    href: "/seqbi/meet-the-fellows/fall-class-of-2024/",
    winnersHref: "/seqbi/meet-the-fellows/class-of-fall-2024-pitch-competition-winners/",
  },
  {
    key: "spring-2025",
    label: "Class of Spring 2025",
    href: "/seqbi/meet-the-fellows/spring-class-of-2025/",
    winnersHref: "/seqbi/meet-the-fellows/class-of-spring-2025-pitch-competition-winners/",
  },
  {
    key: "summer-2025",
    label: "Class of Summer 2025",
    href: "/seqbi/meet-the-fellows/class-of-summer-2025/",
    winnersHref: "/seqbi/meet-the-fellows/class-of-summer-2025-pitch-competition-winners/",
  },
] as const

export const seqbiNav: NavLink[] = [
  { label: "SEQBI", href: "/seqbi/" },
  {
    label: "Meet the Fellows",
    href: "/seqbi/meet-the-fellows/",
    children: cohorts.flatMap((c) => [
      { label: c.label, href: c.href },
      { label: `${c.label} Pitch Competition Winners`, href: c.winnersHref },
    ]),
  },
  { label: "Eligibility Requirements", href: "/seqbi/eligibility-requirements/" },
  { label: "Partners", href: "/seqbi/partners/" },
]

export const aboutNav: NavLink[] = [
  { label: "About Us", href: "/about-us/" },
  { label: "Our History", href: "/about-us/our-history/" },
  { label: "Board of Directors", href: "/about-us/board-of-directors/" },
  { label: "Staff Directory", href: "/about-us/staff-directory/" },
  { label: "Corporate Compliance", href: "/corporate-compliance/" },
]

// The footer menu of rdrc.org, in its order.
export const footerNav: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about-us/" },
  { label: "RDRC News", href: "/rdrcnews/" },
  { label: "Youth Services", href: "/youth-services/" },
  { label: "Workforce Development", href: "/workforce-development/" },
  { label: "Neighborhood Preservation", href: "/neighborhood-preservation/" },
  { label: "Commercial Revitalization", href: "/commercial-revitalization/" },
  { label: "Contact Us", href: "/contact-us/" },
]

export const footerMore: NavLink[] = [
  { label: "SEQBI", href: "/seqbi/" },
  { label: "Our Supporters", href: "/our-supporters/" },
  { label: "Corporate Compliance", href: "/corporate-compliance/" },
  { label: "Business Resource Center", href: "/business-resource-center/" },
  { label: "Applications", href: "/applications/" },
]
