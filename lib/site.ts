// Single source of truth for the clinic's contact details, hours and links.

export const PHONE_E164 = "+919849151375";
export const PHONE_DISPLAY = "+91 98491 51375";
export const PHONE_SHORT = "98491 51375";
export const TEL_HREF = `tel:${PHONE_E164}`;

export const BOOKING_MESSAGE = "Hello SAI Suraksha Physiotherapy, I'd like to book an appointment.";

/** wa.me link with a pre-filled message. */
export function waLink(message: string = BOOKING_MESSAGE): string {
  return `https://wa.me/919849151375?text=${encodeURIComponent(message)}`;
}

/** Booking message for a specific condition, e.g. "back pain" → "...appointment for back pain." */
export function waAbout(topic: string): string {
  return waLink(BOOKING_MESSAGE.replace(/\.$/, ` for ${topic}.`));
}

export const CLINIC_NAME = "SAI Suraksha Physiotherapy & Rehabilitation Centre";

export const ADDRESS_FULL =
  "H No 31, Near Apple Baby Clinic, Enclave Road, North NCL Lane, Ruby Block, Satyam Enclave, Kompally, Hyderabad, Telangana 500100";

export const ADDRESS = {
  streetAddress:
    "H No 31, Near Apple Baby Clinic, Enclave Road, North NCL Lane, Ruby Block, Satyam Enclave",
  addressLocality: "Kompally, Hyderabad",
  addressRegion: "Telangana",
  postalCode: "500100",
  addressCountry: "IN",
};

export const MAPS_REVIEWS_URL =
  "https://www.google.com/maps/search/?api=1&query=SAI%20Suraksha%20Physiotherapy%20Kompally";
export const MAPS_DIRECTIONS_URL =
  "https://www.google.com/maps/search/?api=1&query=SAI%20Suraksha%20Physiotherapy%20Kompally%20Hyderabad";
export const MAPS_EMBED_URL =
  "https://maps.google.com/maps?q=SAI%20Suraksha%20Physiotherapy%20Kompally%20Hyderabad&z=15&output=embed";

export const RATING = { value: 5.0, googleCount: 202, justdialCount: 227 };

/** Public base URL: explicit override, else the Vercel project URL, else local dev. */
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : "http://localhost:3000");

export const NAV = [
  { href: "/", label: "Home", menuLabel: "Home" },
  { href: "/treatments", label: "Treatments", menuLabel: "Conditions & treatments" },
  { href: "/about", label: "About us", menuLabel: "About us" },
  { href: "/visit", label: "Visit & book", menuLabel: "Visit & book" },
] as const;
