import data from "@/data/reviews.json";

// Real Google reviews, supplied by the clinic. Text is rendered verbatim — never edit it here.
export type Review = { name: string; rating: number; text: string; date?: string };

export const REVIEWS: Review[] = data;

export const isPlaceholder = (r: Review) => r.name.includes("PLACEHOLDER") || r.text.includes("PLACEHOLDER");

/** "Ravi Kumar" → "Ravi K."; a single name is shown as given. */
export function displayName(name: string): string {
  const parts = name.trim().split(/\s+/);
  return parts.length > 1 ? `${parts[0]} ${parts[parts.length - 1][0]}.` : parts[0];
}
