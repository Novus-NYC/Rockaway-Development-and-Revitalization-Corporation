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
| A. Name | Revitalization, performed: photographs arrive grey and a line brings their color back | the word in the name | 3 / 5 / 5 / 2 |
| B. Place | The eleven-mile peninsula as a single line that runs through the site | the geography | 4 / 4 / 2 / 1 |
| C. Identity | The seal: RDRC's violet disc is the stage the work appears on | the logo | 3 / 4 / 4 / 2 |

A was built first and rejected in review: the grey-to-color sweep on photographs was not
liked. B needs a map we would have to draw and label (new information). The site is built on **C**, with one thing kept from A: the sweep, now used
between pages instead of on photographs.

```
Idea:        RDRC's seal is the stage: its violet field and brass edge carry the visitor from
             page to page, and the work appears on it.
Metaphor:    A civic seal, and a fresh coat of paint crossing a wall.
Signature:   The sweep between pages. A violet panel with a brass edge and the seal crosses
             the screen, and the next page is there when it has passed.
Emotion:     Steady, proud, cared for.
Motion verb: Sweep, then settle. Never bounce.
Screenshot:  The home opening: the CEO's sentence at display size beside the photo sequence,
             the seal behind it, the four areas of focus on violet below.
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

- One ease, `cubic-bezier(0.22, 0.8, 0.2, 1)`, and a firmer one for sweeps; 250 to 400 ms for
  interface, 700 to 1500 ms for reveals.
- Photographs are uncovered: a cover in the frame's own color lifts off while the picture
  settles from a slight enlargement. Always in full color.
- Display type arrives word by word. Body text rises a little as it enters.
- Primary links answer with a left to right sweep: buttons flood, underlines draw, arrows
  travel.
- Built with CSS, one IntersectionObserver and the Web Animations API. No animation library.

## Composition plan (one layout family per section)

```
Home
  hero        split frame: CEO quote at display size (cols 1-7), photo sequence with
              captions (cols 8-12) over the mist disc
  areas       four photographs across on violet, each with the name of its area (two by two
              on a phone); all four in view at once
  events      calendar beside the list (shows "No Events" until events exist)
  notice      funders and the equal-opportunity statement, as text
  footer      finale: the mission sentence large on violet, then contacts

Program page  title + banner photo, sticky section index (cols 1-3), text (cols 4-8),
              figures with captions in the margin (cols 9-12)
Directories   typographic rosters, three columns, hairlines
News          ledger grouped by year: date, title, excerpt, thumbnail; year filter
Article       title, date, text column, flyer or photo beside it (click to enlarge)
Supporters    logo wall on white tiles
Resource      grouped document lists in disclosure sections
404           plain: what happened, three ways back, one photograph
```

## Genericness test

- Cream plus serif plus terracotta was the default pull. Changed to the logo's own violet and
  brass on a cool paper.
- A rotating circular badge was the obvious use of the seal. Dropped: the seal stays still.
- The four programs. A typographic index with thumbnails, then a pinned scroll stage (one
  large photograph at a time), were both built; the stage was rejected in review. Final: four
  photographs across with the names set large beneath, no card boxes, no shadows, no radius.
- Fade-up on everything. Kept only for text; photographs are uncovered instead.

## Decisions about motion and speed

The first version held back hard. Review turned the motion up ("make it a little cooler",
then "parallax or scroll hijacking is fine, just make it make sense"), removed the
grey-to-color effect, and then removed the pinned Areas of focus stage that followed. What is
there now, and why each piece exists:

- **The sweep between pages.** A violet panel with a brass edge and the seal crosses the
  screen and the next page is there when it has passed (about half a second each way, while
  the page is fetched). It also lifts off the first page of a visit, once per session. Back
  and forward, new-tab clicks, files, anchors and outside links are untouched.
- **Areas of focus does not pin.** Four photographs sit side by side with their names, so a
  visitor sees every program at once. On wide screens the four columns come up the page as a
  shallow stair and settle into one line; the covers lift off the photographs left to right.
  Pointing at one draws its hairline in brass, moves its arrow and steps the other names back.
  The photographs are RDRC's full-size originals, shown no larger than their pixels allow
  (the Youth Services one only exists at 550 px wide).
- **Arrows are drawn icons** (`Arrow` in `icons.tsx`), never typed characters. A typed arrow
  is rendered by whatever font the device falls back to, on some systems a color emoji.
- **Parallax, in three places only:** the seal falls back behind the home opening, a page's
  own header photograph drifts inside its frame like a view through a window, and the footer
  seal rises as the footer arrives. Each one marks depth between a background and the content
  in front of it; nothing floats for its own sake.
- **Display type arrives word by word**; the mission sentence in the footer inks in as it is
  scrolled into view; a brass line under the header tracks reading progress.
- **The home photo sequence** changes every seven seconds, with pause and step controls. A
  photograph is never shown before it has loaded and the caption block never changes height.
- **Reduced motion:** no sweep, no parallax, no stair, no auto-advance.
- **Fallbacks:** the scroll-driven pieces use CSS scroll timelines. Browsers without them get
  the same content, still.

## Decisions that affect content

- Original URLs are kept (`/about-us/`, `/rdrcnews/<slug>/`, and so on), with redirects for
  WordPress shortlinks and old PDF paths.
- Headings and a few news titles written in all capitals are set in title case. Wording is
  unchanged.
- Body copy is verbatim, including its punctuation.
- The footer map moves to the Contact page; the footer address still links to Google Maps.
- See the hand-off notes in the README for pages that were not carried over and why.
