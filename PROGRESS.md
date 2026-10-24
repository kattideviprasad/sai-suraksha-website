# PROGRESS — SAI Suraksha website

Next.js build of the Claude Design file `SAI Suraksha Website.dc.html`.
Design handoff (not in repo): `E:\sai\Physiotherapy clinic design systems-handoff.zip`, extracted to `E:\sai\_design`
(high-res source PNGs renamed in `E:\sai\_design\source`).

## Decisions (approved 2026-10-24)
- Stack: Next.js 16.4 (App Router, Cache Components on), TypeScript, Tailwind v4.
- Routes: `/`, `/treatments`, `/about`, `/visit` (design used `#/` hash routes).
- Design toggles fixed at defaults: WhatsApp is the primary CTA, open status shown, sticky bar on phones only (<760px).
- Breakpoints from the design: nav collapses <1180px; sticky bar + no WhatsApp bubble <760px (CSS only).
- Doctor portrait: marked "Photo of Dr. Ram Charan, to come" panel.
- Domain: Vercel URL for now (`lib/site.ts` → `SITE_URL`; set `NEXT_PUBLIC_SITE_URL` once a domain exists).
- Images: user's enhanced PNGs from `uploads/` → WebP via `scripts/optimize-images.mjs`.

## To confirm with the clinic (marked in UI with dashed grey pills, `data-to-confirm`)
- Qualification (BPT / MPT) — `app/about/page.tsx`
- Years of experience — `app/about/page.tsx`
- Photo of Dr. Ram Charan — `app/about/page.tsx`

## Log
- [x] Plan approved; GitHub CLI installed (winget, gh 2.103.2).
- [x] Scaffolded with create-next-app; images matched (uploads = same photos, lossless) and converted.
- [x] `lib/` (site constants, India-time hours logic + 9 boundary checks passing, schema, SEO helper).
- [x] Shared: Header (active tab, mobile menu), Footer, BookVisitBand (hidden on /visit), StickyBar, OpenStatus.
- [x] Pages: Home, Conditions & treatments, About us, Visit & book (3-tap WhatsApp booking form).
- [x] Test 1 — `npm run dev`: all routes 200, no console errors; booking form, links, status, menu, sticky bar checked in browser (375px + 1280px).
- [x] Test 1 — `npm run build`: passes, all 4 pages static (○).
- [x] Lighthouse baseline (original JPG/PNG via plain `<img>`).
- [x] Optimisation: WebP sources + `next/image` (AVIF/WebP, responsive `sizes`, lazy below the fold, high priority on the hero,
      blur placeholders); favicon 249 KB → 19 KB; Google Map deferred until near the viewport (`components/LazyMap.tsx`).
- [x] Test 2 — `npm run dev` + `npm run build` pass after optimisation; Lighthouse final.
- [x] Step 5: secret scan clean (no `.env*`, no key/token patterns); `.gitignore` covers node_modules, .next, .env*,
      Lighthouse reports, `.claude/`, `.vercel`, and large source PNGs in `public/images/` (kept locally, not used).
      One commit on `main`, pushed to the user's private repo github.com/kattideviprasad/sai-suraksha-website.
- [ ] Vercel: user imports the repo on vercel.com (Vercel CLI skipped by request). Once a real domain exists, set
      `NEXT_PUBLIC_SITE_URL` in Vercel project settings.

## Final cut (branch `final-cut`) — plan in `PLAN.md`
- [x] Step 0 (2026-10-24): branch `final-cut` created from `main` (f5b39dd); project re-read and summarised in
      PLAN.md; mobile Lighthouse baseline (2 runs) saved in PLAN.md, raw JSON in `E:\sai\_design\lh\finalcut-before-*`.
      `data/reviews.json` not present yet. Waiting for approval + answers to PLAN.md "Assumptions & questions".
- [x] Approved: option A (Magic UI marquee), gsap 3.15 + @gsap/react 2.1.2 + clsx + tailwind-merge; clamp to 5
      lines with Read more (expands in place, pauses marquee); 21st.dev unused.
- [x] Step 1 Testimonials: `components/ui/marquee.tsx` (Magic UI registry copy; copies after the first are
      aria-hidden + out of tab order), `lib/utils.ts` (`cn`), `components.json`, marquee keyframes in `globals.css`,
      `lib/reviews.ts`, `components/Testimonials.tsx`, placed under the existing reviews block in `app/page.tsx`
      (badges, tags, Google link untouched). Two rows ≥768px, one row below; pauses on hover / focus / touch
      (2.5 s after release) / open card / Pause button; reduced motion → static swipeable row.
      **`data/reviews.json` holds 3 PLACEHOLDER entries** (cards show a "Placeholder" pill). `next build` FAILS while
      any remain (guard in `next.config.ts`); local test builds use `ALLOW_PLACEHOLDER_REVIEWS=1`; dev prints a warning.
      Checked: 1280px (2 rows, equal 326px cards, 1 focusable Read more), 390px (1 row, 300px cards), no horizontal
      page scroll, expand/pause/focus behaviour, lint + types clean.
- [x] Step 2 GSAP: `components/PageMotion.tsx` (one client component, `useGSAP` + `gsap.matchMedia`, ScrollTrigger
      registered once) loaded by `components/MotionLoader.tsx` via `next/dynamic` (ssr:false) and started only when the
      browser is idle after load (earlier start caused a hydration mismatch — fixed). Driven by data attributes:
      `data-hero` (badge, buttons, status, rating card; inner pages: badge / Visit status), `data-hero-photo` (image
      settles from scale 1.03, never hidden), `data-reveal`, `data-stagger`, `data-count` (5.0 ×3, 202 ×2, 227;
      screen readers get the final value), `data-parallax` (±3%, ≥768px, scrub, no pinning). Inline head script sets
      `html.js-motion` (skipped for reduced motion / no JS); CSS pre-hides `[data-hero]` and reveals after 3 s if the
      bundle never loads (verified). Only visible elements are touched (Next keeps visited pages mounted but hidden);
      hero intro runs on first load only. Checked: no console errors over 5 client navigations + full scrolls, nothing
      left hidden, counts end on real values, parallax active at 1280px. `data-scroll-behavior="smooth"` added to
      `<html>` (Next warning).
- [x] Step 3 Polish (palette, fonts, logo, copy and clinic facts unchanged): two-tone `:focus-visible` ring
      (white + forest) on every focusable element; 150 ms colour/transform transitions and smooth scroll only without
      reduced motion; pressed state on buttons + sticky bar; header shadow once scrolled; mobile menu fades in;
      skip-to-content link + `main#main`; sticky-bar spacer includes the safe-area inset; section gaps unified (Home
      approach 36→40px, Treatments 32→40px); `text-balance` on card titles, `text-pretty` on card text; tabular figures
      on phone, hours, ratings; hairline inner edge on photos. Count-up starts at the same digit count (202 from 100)
      so nothing beside it shifts. Checked 360/390/768/1280 × 4 pages: no horizontal scroll, footer clears the sticky
      bar, no console errors. Screenshots (prod build): `E:\sai\final-cut-screens\{390,1280}-{home,treatments,about,visit}.jpg`.
- [x] Screenshots approved, with two changes (done): (1) hero WhatsApp/Call buttons and the sticky bar are never
      hidden — `data-hero-cta` only settles from translateY(8px) scale(.98), transform only; CSS fallback cut 3 s → 1.2 s
      (GSAP intro window 1150 ms). (2) Throttled phone test (4× CPU + Slow 4G = Lighthouse mobile values, 390×844,
      `E:\sai\_design\throttle.mjs`): CTAs + sticky bar are visible AND tappable in the same frame as the heading
      (median 1.62 s; ≤10 ms apart, 3 runs). Native links work before hydration (~2.7 s).
- [x] Step 4 fixes found while verifying:
      · hydration mismatch on fast reloads → `MotionLoader` now loads the GSAP chunk only after first paint + React has
        hydrated `<main>` (checks for React's fiber key) + idle;
      · GSAP setup cost on phones → reveals/stagger/count use an IntersectionObserver; ScrollTrigger is imported only
        for desktop parallax (≥768px) — phones never download it (verified);
      · "GSAP target not found" warnings on inner pages → only animate groups that exist;
      · Testimonials: one overflow measurement for the whole band (was a ResizeObserver + state per card); one marquee
        row at all widths (second row doubled Home's DOM 246 → 454 nodes — user's "only if it doesn't hurt"
        condition); dropped tailwind-merge (`cn` = clsx); **marquee was not animating** (theme var resolved at :root)
        → `@theme inline` fix, verified it moves and pauses.
- [x] Step 4 verify ×2 (placeholders allowed locally): `npm run dev` + `npm run build` / `npm run start` — all routes
      200, all 4 pages full-load + client-nav + full scroll: no console errors, no hydration warnings, nothing left
      hidden, no horizontal scroll (360/390/768/1280), WhatsApp links/messages (12 condition links), tel link, IST status,
      booking form, metadata/canonical/OG, JSON-LD (5.0 / 202) unchanged; lint + types clean.
- [x] Lighthouse mobile A/B, interleaved vs `main` (worktree `E:\sai\sai-main-ab`, port 3002), 3 rounds, browser
      tabs idle (raw: `E:\sai\_design\lh\ab\`). Perf median (range): Home main 91 (79–92) vs final-cut 84 (79–93);
      Treatments 87 (86–97) vs 86 (86–88); About 90 (89–95) vs 90 (87–94); Visit 91 (84–93) vs 91 (89–93).
      A11y / SEO 100 both; CLS 0 both; LCP equal (±0.1 s). Home's remaining gap is the testimonials band (~4 pts in an
      isolation build). Re-check after real reviews (more cards).
- [x] Step 4 approved; Home gap accepted; GSAP intro → CSS fade on phones accepted.
- [x] Home-only experiment (2026-10-24): `content-visibility:auto` + `contain-intrinsic-size:auto 342px` on the band.
      Worked (contents skipped off screen, marquee/Read more/Pause fine after scrolling, CLS 0 for real input) but
      Home A/B, 3 rounds: main 91/90/82 vs final-cut 83/75/84 (median gap −7, same as without it) → **reverted**.
      Kept: band capped at 10 reviews in file order (`SHOWN` in `Testimonials.tsx`; no effect with 3 placeholders,
      re-check with real data). Fixed along the way: count-up numbers shifted neighbouring text (DM Sans digits are
      not equal width despite tabular-nums; CLS 0.002 while scrolling) → number is pinned to its final width while
      counting. CLS now 0 on full scroll at 375px and desktop.
- [x] Ship decision (2026-10-24): client wants the site today → **shipping without review cards**.
      `data/reviews.json` = `[]`; `Testimonials` renders nothing when it is empty (no band, no Pause button, no gap).
      Rating cards, tags and "Read the reviews on Google" unchanged. Guard only fails on PLACEHOLDER entries — empty
      file builds normally. Normal `npm run build` (guard on) passes; browser check 390 + 1280 × 4 pages: no console
      errors, nothing hidden, no horizontal scroll, WhatsApp + tel links present. A/B worktree `E:\sai\sai-main-ab` removed.
- [ ] **Review cards pending real data**: add the clinic's real Google reviews to `data/reviews.json`
      (`[{ "name", "rating", "text", "date"? }]`, text verbatim). The band appears automatically (max 10, file order).
      Then: recheck card heights with real text (names that wrap make cards taller on phones) and Home Lighthouse.
- [ ] Step 5: secret scan, one commit on `final-cut`, push, Vercel preview → user says "merge" → fast-forward `main`,
      push, verify production, delete `final-cut`. · [ ] Step 4 Verify ×2 · [ ] Step 5 Commit (no push)

## Lighthouse (local `next start`, Lighthouse 12, single runs; Perf / A11y / Best practices / SEO)
Mobile = simulated slow 4G + 4× CPU. Mobile perf varies ±5–8 between runs (mostly TBT from React hydration).

| Page | Mobile before | Mobile after | Desktop before | Desktop after | Mobile LCP | Page weight |
|---|---|---|---|---|---|---|
| Home | 67 / 100 / 100 / 100 | **94** / 100 / 100 / 100 | 96 | **100** | 6.6 s → 3.0 s | 1424 → 272 KB |
| Treatments | 68 / 100 / 100 / 100 | **84** / 100 / 100 / 100 | 100 | **100** | 6.1 s → 2.7 s | 1427 → 255 KB |
| About | 77 / 100 / 100 / 100 | **88** / 100 / 100 / 100 | 97 | **100** | 6.5 s → 2.8 s | 1427 → 275 KB |
| Visit | 63 / 100 / 100 / 100 | **92** / 100 / 100 / 100 | 100 | **100** | 8.3 s → 2.7 s | 1889 → 263 KB |

Raw reports: `E:\sai\_design\lh\{baseline,final}\*.json` (outside the repo).
