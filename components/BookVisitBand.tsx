"use client";

import { usePathname } from "next/navigation";
import { BookingButtons } from "@/components/ui/Buttons";
import { ArrowLink } from "@/components/ui/SectionHeading";

// Closing "Book your visit" band, shown on every page except Visit & book.
export function BookVisitBand() {
  if (usePathname() === "/visit") return null;

  return (
    <section className="bg-forest text-white">
      <div className="wrap section-y grid grid-cols-[repeat(auto-fit,minmax(min(100%,440px),1fr))] items-center gap-[clamp(40px,5vw,72px)]">
        <div className="flex flex-col gap-6">
          <h2 className="text-[clamp(44px,6vw,84px)] leading-none font-medium tracking-tight-2 text-balance">
            Book your <span className="text-leaf">visit</span>
          </h2>
          <p className="max-w-[520px] text-xl leading-normal text-pretty text-mint">
            Send a WhatsApp message or call to book a time. Patients describe the clinic as affordable and
            non-commercial.
          </p>
          <BookingButtons />
        </div>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,260px),1fr))] gap-4">
          <div className="flex flex-col gap-2.5 rounded-3xl bg-mint p-7 text-black">
            <span className="text-lg font-semibold text-forest">Where</span>
            <span className="text-lg leading-normal">H No 31, Satyam Enclave, Kompally, Hyderabad 500100</span>
            <span className="text-base leading-normal text-ink">Near Sri Chaitanya College, Kompally main road</span>
            <ArrowLink href="/visit" className="mt-auto text-forest">
              Directions →
            </ArrowLink>
          </div>
          <div className="flex flex-col gap-2.5 rounded-3xl bg-sky p-7 text-black">
            <span className="text-lg font-semibold text-teal-ink">When</span>
            <span className="text-lg leading-normal">
              Mon–Sat
              <br />
              9:30 AM–1 PM
              <br />
              5–9 PM
            </span>
            <span className="text-base leading-normal text-ink">Sunday closed</span>
          </div>
        </div>
      </div>
    </section>
  );
}
