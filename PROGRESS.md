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

## Lighthouse (local `next start`, Lighthouse 12, single runs; Perf / A11y / Best practices / SEO)
Mobile = simulated slow 4G + 4× CPU. Mobile perf varies ±5–8 between runs (mostly TBT from React hydration).

| Page | Mobile before | Mobile after | Desktop before | Desktop after | Mobile LCP | Page weight |
|---|---|---|---|---|---|---|
| Home | 67 / 100 / 100 / 100 | **94** / 100 / 100 / 100 | 96 | **100** | 6.6 s → 3.0 s | 1424 → 272 KB |
| Treatments | 68 / 100 / 100 / 100 | **84** / 100 / 100 / 100 | 100 | **100** | 6.1 s → 2.7 s | 1427 → 255 KB |
| About | 77 / 100 / 100 / 100 | **88** / 100 / 100 / 100 | 97 | **100** | 6.5 s → 2.8 s | 1427 → 275 KB |
| Visit | 63 / 100 / 100 / 100 | **92** / 100 / 100 / 100 | 100 | **100** | 8.3 s → 2.7 s | 1889 → 263 KB |

Raw reports: `E:\sai\_design\lh\{baseline,final}\*.json` (outside the repo).
