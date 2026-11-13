import type { Config } from "tailwindcss"

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        paper: "var(--paper)",
        ink: "var(--ink)",
        violet: { DEFAULT: "var(--violet)", deep: "var(--violet-deep)" },
        mist: "var(--mist)",
        lilac: "var(--lilac)",
        brass: { DEFAULT: "var(--brass)", ink: "var(--brass-ink)", light: "var(--brass-light)" },
        muted: "var(--muted)",
        line: { DEFAULT: "var(--line)", strong: "var(--line-strong)" },
      },
      fontFamily: {
        display: ["var(--font-zodiak)", "Georgia", "Times New Roman", "serif"],
        sans: ["var(--font-switzer)", "Helvetica Neue", "Arial", "sans-serif"],
      },
      maxWidth: { page: "87.5rem" },
      transitionTimingFunction: { restore: "cubic-bezier(0.22, 0.8, 0.2, 1)" },
      screens: { xs: "480px", nav: "1180px" },
    },
  },
  plugins: [],
}
export default config
