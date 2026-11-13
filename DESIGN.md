# RDRC website: design record

Rebuild of rdrc.org for the Rockaway Development & Revitalization Corporation. The rule for
this project: **same information, new form.** Nothing from the original site is cut and no new
claims are added. Everything below serves that.

## Brief

- **Subject:** RDRC, a 501(c)(3) community development corporation founded in 1978 at
  1920 Mott Avenue, Far Rockaway, serving the eleven-mile Rockaway peninsula.
- **Audience:** Rockaway residents (young people looking for summer jobs, adults looking for
  training, homebuyers and homeowners), local business owners and SEQBI applicants, and the
  funders, agencies and elected officials RDRC works with. Many arrive on a phone.
- **Job of the site:** find the right program fast, reach a person, and trust the
  organization (history, board, audits, supporters, eight years of news).
- **Assets:** the logo (violet disc, brass lettering), about 300 community photographs and
  flyers of modest resolution, 32 supporter logos, 8 PDFs.
- **Constraints:** elegant and restrained. No decorative parallax, no wasted space, no
  loader, no WebGL, native scrolling. All media is stored locally in `public/`.

## Concept

Three territories were considered.

| | Idea | Anchor | O / F / Fe / P |
|---|---|---|---|
| A. Name | Revitalization, performed: every photograph arrives drained of color and a brass line sweeps across it, bringing the color back | the word in the name, and the Storefront Improvement Program's before and after | 3 / 5 / 5 / 2 |
| B. Place | The eleven-mile peninsula as a single line that runs through the site | the geography | 4 / 4 / 2 / 1 |
| C. Identity | The seal: a disc with a way cut through it, round against a square grid | the logo | 3 / 4 / 4 / 2 |

A wins on fit and on being buildable without inventing anything. B needs a map we would have
to draw and label (new information, and easy to get wrong for people who live there). C lends
A its shapes: the disc is used as a quiet supergraphic and as the frame for people.

```
Idea:        A neighborhood coming back: photographs arrive grey and a brass line restores
             their color, held together by RDRC's own violet seal and brass lettering.
Metaphor:    Restoration. A storefront getting its sign, its awning and its paint back.
Signature:   The restoring line: a brass hairline sweeps left to right across a photograph
             and color follows it. Home hero sequence, then every content photo once.
Emotion:     Steady, proud, cared for.
Motion verb: Restore. Sweep left to right like a fresh coat, then settle. Never bounce.
Screenshot:  The home hero mid-sweep: the Beach 20th Street planting photo half grey and
             half in bloom, the brass line between, the CEO's sentence set large in violet.
```

## System

**Palette** (sampled from the logo; names are roles)

| Token | Hex | Role |
|---|---|---|
| `paper` | `#F8F6FB` | ground, a cool white with a trace of the violet |
| `white` | `#FFFFFF` | header, tiles behind supporter logos |
| `ink` | `#1A1230` | text |
| `violet` | `#2E175C` | the logo disc: headings, fields, buttons |
| `mist` | `#ECE7F5` | tinted bands, the disc supergraphic |
| `brass` | `#A16F27` | the logo lettering: lines and large accents only |
| `brass-ink` | `#80560F` | brass for small text on paper (AA) |
| `brass-light` | `#DDB877` | brass on violet |
| `muted` | `#5B5470` | secondary text |
| `line` | `rgb(46 23 92 / 0.16)` | hairlines |

**Type**

- Display: Zodiak 400 (Fontshare), roman and italic. Sharp, Roman proportions that sit well
  beside the logo's inscriptional capitals. Negative tracking at size, leading 1.0 to 1.1.
- Text and interface: Switzer 400 / 500 / 600 (Fontshare), close to the grotesk around the
  logo's ring.
- Labels: Switzer 600, uppercase, tracked 0.09em, in `brass-ink`. Used only where the label is
  information (a date, a role, a place in a competition).

**Grid and rhythm:** 12 columns, gutter `clamp(1rem, 2vw, 2rem)`, page margin
`clamp(1.25rem, 4vw, 4rem)`, max width 1400px. Text hangs from columns 1 and 4. Section
padding comes in three moods (tight, normal, open); nothing is a full empty viewport.

**Shape:** square for places and things (photos, tiles, buttons, panels have no radius);
round for the seal and for people (portraits sit in discs).

**Motion language**

- One ease, `cubic-bezier(0.22, 0.8, 0.2, 1)`; 250 to 400 ms for interface, 700 to 1100 ms for
  reveals.
- Photographs: the restoring line (grey to color, left to right), once, when they enter.
- Text: a short rise as it enters. Headings wipe up from their baseline.
- Primary links answer with the same left to right sweep: buttons flood, nav underlines draw,
  arrows travel, index thumbnails restore to color.
- Built with CSS, one IntersectionObserver and the Web Animations API. No animation library,
  no scroll listeners, no loops.

## Composition plan (one layout family per section)

```
Home
  hero        split frame: CEO quote at display size (cols 1-7), photo sequence with
              captions (cols 8-12) over the mist disc
  areas       index list: four rows, serif names, thumbnails that restore on hover
  events      calendar beside the list (shows "No Events" until events exist)
  footer      finale: the mission sentence large on violet, then contacts

Program page  title + banner photo, sticky section index (cols 1-3), text (cols 4-8),
              figures with captions in the margin (cols 9-12)
Directories   typographic rosters, three columns, hairlines
News          ledger grouped by year: date, title, excerpt, thumbnail; year filter
Article       title, date, text column, flyer or photo beside it (click to enlarge)
Supporters    logo wall on white tiles
Resource      grouped document lists in disclosure sections
404           a photograph the line has not reached yet
```

## Genericness test

- Cream plus serif plus terracotta was the default pull. Changed to the logo's own violet and
  brass on a cool paper.
- A rotating circular badge was the obvious use of the seal. Dropped: the seal stays still.
- Card grid for the four programs. Changed to a typographic index whose thumbnails restore.
- Fade-up on everything. Kept only for text; images use the restoring line.

## Decisions about motion and speed

The first version held back hard. After review ("make it a little cooler") the motion was
turned up one notch, all of it still built from the same idea: a line that passes and leaves
things renewed.

- **The sweep between pages.** A violet panel with a brass edge crosses the screen like a
  fresh coat and the next page is there when it has passed (about half a second each way,
  while the page is fetched). The same panel lifts off the first page of a visit, once per
  session. Back and forward, new-tab clicks, files, anchors and outside links are untouched.
- **Display type arrives word by word**, each word rising out of its own mask: the home
  quotation and every page title.
- **Areas of focus sit on violet.** The row under the pointer keeps the light and its
  photograph comes back to color; the other rows step back.
- **The mission sentence inks in** word by word as the footer is reached, and a brass line
  under the header tracks how far the page has been read. Both use CSS scroll timelines and
  are simply static where a browser lacks them.
- **Photographs** are greyed with a blend layer, not `backdrop-filter` (which ignores its
  clip while animating in Chrome and made the first version flicker). In the home sequence a
  photograph is never shown before it has loaded, and the caption block always has the height
  of its longest caption, so nothing jumps.
- **Still at rest**, apart from the home photo sequence (seven seconds a photograph, with
  pause and step controls). No parallax, no scroll-jacking, native scrolling.
- **Reduced motion:** no sweep, no reveals, no auto-advance; everything is simply there.
- **Weight:** no animation library. Motion is CSS, one IntersectionObserver and the Web
  Animations API for the sweep. The heaviest page is under 3 MB.

## Decisions that affect content

- Original URLs are kept (`/about-us/`, `/rdrcnews/<slug>/`, and so on), with redirects for
  WordPress shortlinks and old PDF paths.
- Headings and a few news titles written in all capitals are set in title case. Wording is
  unchanged.
- Body copy is verbatim, including its punctuation.
- The footer map moves to the Contact page; the footer address still links to Google Maps.
- See the hand-off notes in the README for pages that were not carried over and why.
