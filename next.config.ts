import fs from "node:fs";
import type { NextConfig } from "next";
import { PHASE_PRODUCTION_BUILD } from "next/constants";

// Placeholder reviews must never ship. `next build` fails while any remain, unless
// ALLOW_PLACEHOLDER_REVIEWS=1 is set for a local test build; `next dev` only warns.
function checkReviews(phase: string) {
  const placeholders = (fs.readFileSync("data/reviews.json", "utf8").match(/PLACEHOLDER/g) ?? []).length;
  if (!placeholders) return;
  const msg = `data/reviews.json still contains ${placeholders} "PLACEHOLDER" marker(s). Add the real Google reviews.`;
  if (phase === PHASE_PRODUCTION_BUILD && process.env.ALLOW_PLACEHOLDER_REVIEWS !== "1") {
    throw new Error(`\n\n  ✖ ${msg}\n    (Set ALLOW_PLACEHOLDER_REVIEWS=1 only for a local test build.)\n`);
  }
  console.warn(`\n  ⚠⚠⚠ ${msg} ⚠⚠⚠\n`);
}

const nextConfig: NextConfig = {
  /* config options here */
  cacheComponents: true,
  partialPrefetching: true,
  images: {
    qualities: [80],
    formats: ["image/avif", "image/webp"],
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default function config(phase: string): NextConfig {
  checkReviews(phase);
  return nextConfig;
}
