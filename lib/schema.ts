import { ADDRESS, CLINIC_NAME, MAPS_DIRECTIONS_URL, PHONE_E164, RATING, SITE_URL } from "./site";

// schema.org "Physiotherapy" is a LocalBusiness / MedicalBusiness subtype.
export function clinicJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Physiotherapy",
    "@id": `${SITE_URL}/#clinic`,
    name: CLINIC_NAME,
    alternateName: "SAI Suraksha Physiotherapy",
    description:
      "Physiotherapy and rehabilitation in Kompally, Hyderabad, for back, neck and knee pain, sports injuries and recovery after surgery.",
    url: SITE_URL,
    logo: `${SITE_URL}/images/logo.png`,
    image: `${SITE_URL}/images/og-clinic-hall.jpg`,
    telephone: PHONE_E164,
    foundingDate: "2017",
    address: { "@type": "PostalAddress", ...ADDRESS },
    hasMap: MAPS_DIRECTIONS_URL,
    areaServed: ["Kompally", "Hyderabad"],
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        opens: "09:30",
        closes: "13:00",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        opens: "17:00",
        closes: "21:00",
      },
    ],
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: RATING.value.toFixed(1),
      reviewCount: RATING.googleCount,
      bestRating: "5",
      worstRating: "1",
    },
    employee: {
      "@type": "Person",
      name: "Dr. G. Ram Charan",
      jobTitle: "Physiotherapist & lead doctor",
    },
    knowsAbout: [
      "Back pain and slip disc",
      "Neck pain and spondylosis",
      "Knee pain and arthritis",
      "Sports injuries",
      "Rehabilitation after surgery",
      "Frozen shoulder",
      "Posture and desk-work pain",
      "Tennis elbow",
      "Bell's palsy",
    ],
  };
}
