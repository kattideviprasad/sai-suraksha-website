# PLAN — Final cut (branch `final-cut`)

Testimonials + calm GSAP motion + UI polish. Status: **waiting for approval** (Step 0 done).

## Current state (read 2026-10-24)
- **Pages** (all static, server components): `/` `app/page.tsx`, `/treatments`, `/about`, `/visit`.
- **Shared**: `Header` (client: active tab, menu <1180px), `BookVisitBand` (client, hidden on /visit), `Footer`,
  `StickyBar` (<760px, 88px spacer), `OpenStatus` (client, IST), `BookingForm` (client), `LazyMap` (client).
  UI kit in `components/ui/`: `Pill`/`ToConfirm`, `Buttons` (`primaryBtn`, `outlineOnDarkBtn`, `BookingButtons`),
  `SectionHeading` (`H2`, `PageHero`, `InfoCard`, `ArrowLink`), `Photo` (next/image, static WebP imports).
- **Styling**: Tailwind v4, tokens in `app/globals.css` `@theme` (forest #0a3922, violet #460095, lavender #eee2ff,
  mint #d2f2e3, sky #ccf0f8, cream #faf7e8, peach #ffede8, coral #ff643b, leaf #1dbf73, ink #3d3d3d…);
  utilities `wrap` (1280px + fluid gutter) and `section-y`. Fluid `clamp()` type sizes copied from the design.
- **Font**: DM Sans via `next/font` (variable, opsz axis), `ss03` feature on.
- **Existing animation**: none. Only instant hover colour changes; `scroll-behavior: smooth`.
- **Reviews block**: Home → second section "What patients say" (`app/page.tsx`, `{/* Reviews */}`): heading
  "201 of 202 Google reviews give five stars.", Justdial line, "Read the reviews on Google →", `RatingCard` ×2
  (Google 5.0/202, Justdial 5.0/227 · Verified), "What patients mention most" tags. No individual reviews yet.
- **No** shadcn setup (`components.json`, `cn()`), no animation libs. Deps: next 16.4.3, react 19.3.

## Lighthouse mobile baseline (local `next build` + `next start`, 2 runs) — Perf / A11y / BP / SEO
| Page | Run 1 | Run 2 |
|---|---|---|
| Home | 83 / 100 / 100 / 100 | 95 / 100 / 100 / 100 |
| Treatments | 87 / 100 / 100 / 100 | 85 / 100 / 100 / 100 |
| About | 90 / 100 / 100 / 100 | 89 / 100 / 100 / 100 |
| Visit | 92 / 100 / 100 / 100 | 92 / 100 / 100 / 100 |
LCP 2.7–3.0 s, CLS 0 everywhere. Perf swings come from TBT (React hydration, 80–420 ms).
Target: after-scores within this range or better; A11y / BP / SEO stay 100; CLS stays 0.

## Assumptions & questions (please confirm)
1. **Reviews data** — `data/reviews.json` is missing. I'll build the UI against this shape and stop for the file:
   `[{ "name": "Ravi Kumar", "rating": 5, "text": "…", "date": "2026-08" }]` (`date` optional).
   I'll derive "Ravi K." from `name` in code (display only; text is rendered verbatim, never trimmed or edited).
   Long reviews: show in full (cards grow in height). OK, or do you want a "Read more" toggle?
2. **New dependencies** — `gsap` 3.15 + `@gsap/react` 2.1 (you asked for GSAP; confirming). Testimonial
   dependencies depend on the option you pick below.
3. **Hero intro vs. LCP** — the hero heading/paragraph is the LCP element. Hiding it until GSAP loads would add
   ~1–2 s to mobile LCP. So the h1 and intro paragraph stay visible from first paint; the timeline animates the
   supporting pieces (badge, buttons, status line, photo, rating card, chat bubble).
4. **Motion lives in one place** — a single client `<PageMotion />` (loaded after hydration via `next/dynamic`,
   so GSAP is off the critical path) reads `data-*` attributes on server-rendered markup. Pages stay server
   components; changes to them are attribute-only.
5. **Brief vs. skill** — the frontend-design guidance warns against fade-up on every section. Your brief asks for
   reveals, so I'll use them sparingly: hero timeline, one reveal per section group, stagger on card grids only.

## Step 1 — Testimonials: options (pick one)
| | Option | What it is | Deps | Fit |
|---|---|---|---|---|
| **A (recommended)** | **Magic UI `marquee`** via shadcn registry, two rows opposite directions on ≥768px, one row on mobile | Pure-CSS infinite scroll; built-in pause on hover | `clsx`, `tailwind-merge` + `lib/utils.ts` `cn()`, `components.json` | Light, no animation lib; I add: pause on focus/touch, a visible Pause/Play button (WCAG 2.2.2), reduced-motion → static swipe row |
| B | **Aceternity "Infinite moving cards"** | Same idea, JS clones nodes on mount | same as A | Very similar to A but less maintained; clones cause a hydration-time jump |
| C | **Own scroll-snap carousel** (no library) | Native swipe row + Prev/Next buttons, optional slow GSAP auto-advance | none | Most accessible and lightest; less "premium" movement than a marquee |

Not recommended: Aceternity "Animated testimonials" (needs reviewer photos, which we don't have, and adds `motion`).
**21st.dev:** I'd save your 2 free credits. Options A or C cover the brief, and I can't verify 21st.dev components'
quality/licence without spending them.

Layout either way: keep the left column (pill, H2, Justdial line, Google link) and the two rating cards + tags
on the right; add the testimonial band full-width beneath. Card = 5 stars (aria-label "5 out of 5"), verbatim
text, "Ravi K." + "Google review" label.

**Success checks:** renders at 360/390/768/1280 with no horizontal page scroll; pauses on hover, focus and touch;
Tab reaches every card + the Pause button; reduced motion → static; review text byte-identical to the JSON;
badges, tags and Google link unchanged; CLS 0.

## Step 2 — GSAP motion (`components/PageMotion.tsx`, `useGSAP`, ScrollTrigger registered once)
- **Hero (Home)**: ~0.9 s timeline — badge, buttons, status fade/rise 12px with stagger; photo eases from
  scale 1.03 + opacity; rating card and bubble follow. Inner-page heroes: badge + intro only.
- **Reveals**: section heading groups fade/rise 16px once at 85% viewport; card grids stagger 0.06 s.
- **Count-up**: 5.0 (×3), 202, 227 count up once in view; final text is in the HTML (no-JS correct);
  aria-label holds the real value so screen readers never hear partial numbers.
- **Parallax**: clinic photos drift ±4% inside their rounded frame, ≥768px only, `scrub` (no pinning).
- **Rules**: transform/opacity only; `gsap.matchMedia()` with `prefers-reduced-motion: reduce` → no animation;
  elements are only hidden by GSAP itself, right before animating (below the fold), so no-JS shows everything;
  `useGSAP` scope + revert on route change.

**Success checks:** no console errors/hydration warnings; CLS stays 0; reduced motion shows final state with no
movement; JS disabled → full content visible; mobile TBT not worse than baseline range; no pinning.

## Step 3 — UI polish (refine, not redesign)
- **Buttons/links**: visible `focus-visible` ring (forest/coral, 3px offset) — currently none; 150 ms colour
  transitions; pressed state (`active:scale-[.98]`); WhatsApp/Call keep size and colours.
- **Spacing rhythm**: one heading→content gap per section type (now 32/36/40 px mixed); consistent card padding.
- **Typography**: `tabular-nums` on ratings/phone/hours; `text-balance` on card titles; cap paragraph measure ~68ch.
- **Cards**: interactive cards ("Also treated", Ask cards) get a hover state; static cards stay flat.
- **Images**: hairline inner ring + consistent radius; captions aligned to the image edge.
- **Header**: thin shadow once scrolled; mobile menu open/close fade.
- **Mobile**: skip-to-content link; sticky-bar spacer includes `env(safe-area-inset-bottom)` so the bar never covers
  the footer; check 360 / 390 / 768 / 1280.

**Success checks:** palette, fonts, logo, all copy and clinic facts unchanged; booking links, tel links, status,
form, metadata, OG and JSON-LD diff-identical in behaviour; no horizontal scroll at 360px.

## Step 4 — Verify (twice) / Step 5 — Commit
`npm run dev` → every page; `npm run build` + `npm run start` → every page; lint + types clean; Lighthouse mobile
before/after table; list of changed files. Secret scan of staged files, `.env*` ignored, one squashed commit on
`final-cut`. **No push/merge until you say "push".**

## Files expected to change
`package.json`/lock (gsap, @gsap/react, + option deps), `components/PageMotion.tsx` (new),
`components/Testimonials.tsx` (new), `components/ui/marquee.tsx` + `lib/utils.ts` + `components.json` (option A only),
`data/reviews.json` (yours), `app/page.tsx`, `app/layout.tsx`, `app/globals.css`, `components/ui/*` (states/attrs),
`components/Header.tsx`, `components/StickyBar.tsx`, other pages attribute-only.
