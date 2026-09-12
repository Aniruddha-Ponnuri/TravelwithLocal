# TravelWithLocals (FL-W1)

A Next.js (App Router, TypeScript, Tailwind CSS v4) implementation of the **FL_D1** Figma design
(`Landing_v2` + `Location_Itinerary` frames), extended with a stay search and booking flow built from
the product's SRS / detailed-specification / "Stay search" requirement docs.

## Stack

- **Next.js 16** (App Router, Turbopack, React 19, TypeScript)
- **Tailwind CSS v4** — design tokens (brand colors, ink/surface scale, radii, shadows) defined in
  `app/globals.css` under `@theme inline`.
- **Visual identity** — a "local ledger / boarding pass" system grounded in the product's own
  content (laterite red-earth, monsoon teal, marigold): Domine (serif) for display type, Public
  Sans for UI/body, Space Mono reserved for literal ticket codes (a pace stub, a day label).
  Priced, bookable units (a trip tier, a pace option) render as a torn ticket stub — see
  `.ticket` / `.ticket-divider` in `app/globals.css` and `components/ui/Ticket.tsx`.
- Self-hosted `@fontsource-variable/*` packages instead of `next/font/google`, so the app builds
  and runs without a runtime dependency on Google Fonts.
- No component library / no extra runtime dependencies beyond Next, React and the font packages.

## Structure

```
app/
  page.tsx                     Home (Landing_v2): hero, planner, book, getaways,
                                experiences, destinations, itineraries, stories, app CTA
  itineraries/[pace]/page.tsx  Itinerary detail (Location_Itinerary): explorer | balanced |
                                premium | remote-work
  stays/page.tsx               Stay search results (filters, sorting, pagination)
  stays/[id]/page.tsx          Stay detail (room categories, amenities, reviews, rules)
  stays/[id]/checkout/page.tsx Order-summary confirmation screen
  stories/[slug]/page.tsx      Community story detail
  account/, support/, privacy/ Minimal stub pages so no nav link is a dead end

components/
  home/        One component per Landing_v2 section, plus CardLink (shared bookable/plain card wrapper)
  itinerary/   Itinerary hero, pace selector, day-by-day + booking detail
  stays/       Filters panel, stay card, results explorer, room selector
  layout/      HeroNav (dark, on the homepage hero), SiteHeader (interior pages), Footer
  scenes/      `<Photo src="..." />` — real Figma photography (see "About the images"
               below); `<Scene palette="..." />` — gradient/illustration placeholder,
               still used for stay/room imagery that has no source photo
  ui/          Button, Pill, Field (labeled form-field shell), Ticket (TicketCode + TicketDivider)

lib/data.ts    Content model + mock data: itineraries, destinations, stories, stays/rooms,
               and the `filterStays()` helper used by the search page
```

## Requirements coverage

- **Landing page** — every section from the `Landing_v2` Figma frame (hero, "find hidden
  places" planner, hotel/flight/cab search, weekend getaways, local experiences, popular
  destinations, community itineraries, community stories, app CTA, footer).
- **Itinerary detail page** — the `Location_Itinerary` Figma frame: hero, pace selector
  (Explorer / Balanced / Premium / Remote Work — the last is a natural fourth pace added
  for the SRS's "custom itinerary" requirement), day-by-day plan, route map, booking
  summary, stay & vibe card.
- **Stay search** (from the "Stay search" doc) — city/date search bar; left-panel filters
  with **radio** groups for price range, property rating and user rating, and **checkbox**
  groups for property type, amenities and popular locations within the selected city;
  results sorted by distance by default; reset filters; pagination with a 10/20/50
  page-size selector; each card shows amenities, starting price and user rating.
- **Stay detail page** — room categories with size/view/price/max-guests/facilities,
  quantity selection with a running total, amenities, restaurants (when present),
  property rules, cancellation policy, user reviews, "Continue to Checkout" and a
  back-to-search link.

## About the images

The Figma file's photo fills are served from short-lived `figma.com` asset URLs that this
build environment's network policy does not allow fetching directly, so the real photography
was sourced a different way: from full-frame PNG exports of the `Landing_v2` and
`Location_Itinerary` screens uploaded directly to the project, which were then precisely
cropped (per-section, using the exact pixel coordinates from the Figma frame metadata) into
the individual photo assets under `public/images/` — hero visual, local-experiences visual,
weekend getaways (5), popular destinations (6), community stories (4), and the itinerary
hero. These are wired in via `components/scenes/Photo.tsx`, a `next/image`-based component
with the same API as `Scene`. Two of the cropped images (hero visual, itinerary hero) include
overlay badges/cards that were baked into the Figma composition itself, so the corresponding
overlay markup was removed from those sections to avoid double-rendering it; the itinerary
page's "Route snapshot" card stays as live markup since its content is dynamic per pace.

Stay and room imagery has no source photo in the Figma export (those screens weren't part of
the design file), so `components/stays/StayCard.tsx`, `components/stays/RoomSelector.tsx` and
`app/stays/[id]/page.tsx` still use the gradient `<Scene palette="..." />` placeholder. To
swap those in later: drop files into `public/images/`, add a `<Photo src="..." />` in place
of the `<Scene palette="..." />`, and remove that section's `Scene` import.

## Running it

```bash
npm install
npm run dev      # http://localhost:3000
npm run build && npm run start   # production build
npm run lint
```
