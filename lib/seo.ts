import type { Metadata } from "next";
import { CLINIC_NAME } from "./site";

const OG_IMAGE = {
  url: "/images/og-clinic-hall.jpg",
  width: 1200,
  height: 630,
  alt: "The treatment hall at SAI Suraksha Physiotherapy, Kompally",
};

/**
 * Per-page title, description, canonical and social tags. Open Graph is set in full here
 * because a page's `openGraph` replaces the layout's rather than merging with it.
 */
export function pageMetadata({
  title,
  description,
  path,
}: {
  title: string;
  description: string;
  path: string;
}): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      locale: "en_IN",
      siteName: CLINIC_NAME,
      title,
      description,
      url: path,
      images: [OG_IMAGE],
    },
    twitter: { card: "summary_large_image", title, description, images: [OG_IMAGE.url] },
  };
}
