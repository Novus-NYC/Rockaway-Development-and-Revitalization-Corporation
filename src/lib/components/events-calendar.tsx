"use client"

import { useEffect, useMemo, useState } from "react"
import type { EventItem } from "@/data/events"

const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
const iso = (y: number, m: number, d: number) => `${y}-${String(m + 1).padStart(2, "0")}-${String(d).padStart(2, "0")}`

/** Month calendar (weeks start on Monday, as on rdrc.org) with the list of upcoming events. */
export default function EventsCalendar({ events }: { events: EventItem[] }) {
  // The current date only exists in the browser; render the grid after mount.
  const [today, setToday] = useState<Date | null>(null)
  const [view, setView] = useState<{ y: number; m: number } | null>(null)
  useEffect(() => {
    const now = new Date()
    setToday(now)
    setView({ y: now.getFullYear(), m: now.getMonth() })
  }, [])

  const cells = useMemo(() => {
    if (!view) return []
    const first = new Date(view.y, view.m, 1)
    const lead = (first.getDay() + 6) % 7
    const total = new Date(view.y, view.m + 1, 0).getDate()
    const out: { y: number; m: number; d: number; outside: boolean }[] = []
    for (let i = lead; i > 0; i--) {
      const dt = new Date(view.y, view.m, 1 - i)
      out.push({ y: dt.getFullYear(), m: dt.getMonth(), d: dt.getDate(), outside: true })
    }
    for (let d = 1; d <= total; d++) out.push({ y: view.y, m: view.m, d, outside: false })
    while (out.length % 7) {
      const dt = new Date(view.y, view.m, total + (out.length - lead - total) + 1)
      out.push({ y: dt.getFullYear(), m: dt.getMonth(), d: dt.getDate(), outside: true })
    }
    return out
  }, [view])

  const byDay = useMemo(() => {
    const map = new Map<string, EventItem[]>()
    for (const e of events) map.set(e.date, [...(map.get(e.date) ?? []), e])
    return map
  }, [events])

  const todayIso = today ? iso(today.getFullYear(), today.getMonth(), today.getDate()) : ""
  const upcoming = events.filter((e) => !todayIso || e.date >= todayIso).sort((a, b) => a.date.localeCompare(b.date))
  const step = (n: number) => setView((v) => (v ? { y: v.y + Math.floor((v.m + n) / 12), m: (((v.m + n) % 12) + 12) % 12 } : v))

  return (
    <div className="grid gap-x-[var(--gutter)] gap-y-8 md:grid-cols-12">
      <div className="md:col-span-5">
        {upcoming.length === 0 ? (
          <p className="t-lede text-muted">No Events</p>
        ) : (
          <ul className="grid gap-4">
            {upcoming.map((e) => {
              const [y, m, d] = e.date.split("-").map(Number)
              const inner = (
                <>
                  <span className="t-label tabular block">{MONTHS[m - 1]} {d}, {y}{e.time ? `, ${e.time}` : ""}</span>
                  <span className="t-h3 mt-1 block">{e.title}</span>
                  {e.location ? <span className="t-small block text-muted">{e.location}</span> : null}
                </>
              )
              return (
                <li key={e.date + e.title} className="border-t border-line pt-3">
                  {e.href ? <a href={e.href} className="block">{inner}</a> : inner}
                </li>
              )
            })}
          </ul>
        )}
      </div>

      <div className="md:col-span-6 md:col-start-7">
        <div className="calendar" aria-label="Events calendar">
          <div className="flex items-center justify-between gap-4 border-b border-line pb-3">
            <p className="t-h3 tabular" aria-live="polite">{view ? `${MONTHS[view.m]} ${view.y}` : " "}</p>
            <div className="flex items-center gap-1 text-violet">
              <button type="button" className="seq-btn" aria-label="Previous month" onClick={() => step(-1)}>
                <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true"><path d="M9 2L4 7l5 5" fill="none" stroke="currentColor" strokeWidth="1.4" /></svg>
              </button>
              <button type="button" className="t-small draw px-2 py-2 font-medium" onClick={() => today && setView({ y: today.getFullYear(), m: today.getMonth() })}>
                Today
              </button>
              <button type="button" className="seq-btn" aria-label="Next month" onClick={() => step(1)}>
                <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true"><path d="M5 2l5 5-5 5" fill="none" stroke="currentColor" strokeWidth="1.4" /></svg>
              </button>
            </div>
          </div>
          <table className="calendar__grid tabular">
            <thead>
              <tr>
                {DAYS.map((d) => (
                  <th key={d} scope="col"><abbr title={d} className="no-underline">{d.slice(0, 1)}<span className="max-sm:hidden">{d.slice(1)}</span></abbr></th>
                ))}
              </tr>
            </thead>
            <tbody>
              {(cells.length ? Array.from({ length: cells.length / 7 }, (_, r) => cells.slice(r * 7, r * 7 + 7)) : Array.from({ length: 5 }, () => Array(7).fill(null))).map((row, r) => (
                <tr key={r}>
                  {row.map((c: { y: number; m: number; d: number; outside: boolean } | null, i: number) => {
                    if (!c) return <td key={i}>&nbsp;</td>
                    const key = iso(c.y, c.m, c.d)
                    const has = byDay.get(key)
                    return (
                      <td key={i} data-outside={c.outside || undefined} data-today={key === todayIso || undefined} aria-current={key === todayIso ? "date" : undefined}>
                        <span>{c.d}</span>
                        {has ? <span className="calendar__dot" title={has.map((e) => e.title).join(", ")} /> : null}
                      </td>
                    )
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
