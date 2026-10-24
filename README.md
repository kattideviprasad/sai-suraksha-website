# SAI Suraksha Physiotherapy — website

Next.js (App Router, TypeScript, Tailwind v4) build of the Claude Design file `SAI Suraksha Website.dc.html`.

```bash
npm install
npm run dev     # http://localhost:3000
npm run build && npm start
```

- Contact details, hours and links: `lib/site.ts`
- Open/closed logic (Asia/Kolkata): `lib/hours.ts`
- Clinic schema (JSON-LD): `lib/schema.ts`; per-page SEO: each `app/**/page.tsx`
- Images: `node scripts/optimize-images.mjs <folder-with-source-PNGs>` regenerates `assets/images/*.webp`, icons and the share image
- Set `NEXT_PUBLIC_SITE_URL` once the site has its own domain (canonical URLs, sitemap, schema)

Items still **to confirm** with the clinic are marked in the UI with dashed grey pills (`data-to-confirm`): see `PROGRESS.md`.
