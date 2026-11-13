// Events shown on the home page calendar. rdrc.org currently lists none ("No Events").
// Add entries here and they appear in the list and on the calendar.
export type EventItem = {
  /** ISO date, e.g. "2026-12-04" */
  date: string
  title: string
  /** e.g. "6:00 PM" */
  time?: string
  location?: string
  href?: string
}

export const events: EventItem[] = []
