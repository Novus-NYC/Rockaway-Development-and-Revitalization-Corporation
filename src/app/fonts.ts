import localFont from "next/font/local"

// Zodiak and Switzer (Fontshare, free for commercial use), self-hosted from src/fonts.
// The upright cuts are preloaded; the italics load only on pages that set italic text.
export const zodiak = localFont({
  src: [{ path: "../fonts/zodiak-400-normal.woff2", weight: "400", style: "normal" }],
  variable: "--font-zodiak",
  display: "swap",
})

export const zodiakItalic = localFont({
  src: [{ path: "../fonts/zodiak-400-italic.woff2", weight: "400", style: "italic" }],
  variable: "--font-zodiak-italic",
  display: "swap",
  preload: false,
})

export const switzer = localFont({
  src: [
    { path: "../fonts/switzer-400-normal.woff2", weight: "400", style: "normal" },
    { path: "../fonts/switzer-500-normal.woff2", weight: "500", style: "normal" },
    { path: "../fonts/switzer-600-normal.woff2", weight: "600", style: "normal" },
  ],
  variable: "--font-switzer",
  display: "swap",
})

export const switzerItalic = localFont({
  src: [{ path: "../fonts/switzer-400-italic.woff2", weight: "400", style: "italic" }],
  variable: "--font-switzer-italic",
  display: "swap",
  preload: false,
})
