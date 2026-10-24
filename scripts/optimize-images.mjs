// Converts the high-resolution source PNGs to WebP for next/image, and makes the
// social-share image and app icons.
// Usage: node scripts/optimize-images.mjs <source-dir>
import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

const src = process.argv[2];
if (!src) throw new Error("Pass the folder holding the source PNGs");
const assets = "assets/images"; // statically imported by components/ui/Photo.tsx
const pub = "public/images"; // absolute URLs for schema.org and Open Graph
fs.mkdirSync(assets, { recursive: true });
fs.mkdirSync(pub, { recursive: true });

const photos = ["clinic-hall", "consultation-room", "treatment-cubicles", "waiting-area"];
for (const name of photos) {
  await sharp(path.join(src, `${name}.png`)).webp({ quality: 82, effort: 6 }).toFile(`${assets}/${name}.webp`);
}

// Logo: white background in the source, which matches every place it is shown.
const logo = sharp(path.join(src, "logo.png"));
await logo.clone().resize({ width: 480 }).webp({ quality: 88, effort: 6 }).toFile(`${assets}/logo.webp`);
await logo.clone().resize({ width: 512 }).png({ palette: true }).toFile(`${pub}/logo.png`);

const square = (size) =>
  logo.clone().resize(size, size, { fit: "contain", background: "#ffffff" }).flatten({ background: "#ffffff" });
await square(192).png({ palette: true }).toFile("app/icon.png");
await square(180).png({ palette: true }).toFile("app/apple-icon.png");

// 1200×630 share image for Open Graph / WhatsApp link previews.
await sharp(path.join(src, "clinic-hall.png"))
  .resize(1200, 630, { fit: "cover" })
  .jpeg({ quality: 82, mozjpeg: true })
  .toFile(`${pub}/og-clinic-hall.jpg`);

for (const f of [
  ...fs.readdirSync(assets).map((f) => path.join(assets, f)),
  ...fs.readdirSync(pub).map((f) => path.join(pub, f)),
  "app/icon.png",
  "app/apple-icon.png",
]) {
  if (fs.statSync(f).isFile()) console.log(f.padEnd(40), (fs.statSync(f).size / 1024).toFixed(0).padStart(5), "KB");
}
