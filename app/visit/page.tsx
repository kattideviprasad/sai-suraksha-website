import { BookingForm } from "@/components/BookingForm";
import { LazyMap } from "@/components/LazyMap";
import { OpenStatusLabel } from "@/components/OpenStatus";
import { Pill } from "@/components/ui/Pill";
import { ArrowLink, H2, PageHero } from "@/components/ui/SectionHeading";
import { ADDRESS_FULL, MAPS_DIRECTIONS_URL, MAPS_EMBED_URL, PHONE_DISPLAY, TEL_HREF, waLink } from "@/lib/site";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Book Physiotherapy in Kompally, Hyderabad | SAI Suraksha Physiotherapy",
  description:
    "Book on WhatsApp or call +91 98491 51375. H No 31, Satyam Enclave, Kompally, Hyderabad 500100, near Sri Chaitanya College. Open Mon–Sat 9:30 AM–1 PM and 5–9 PM; Sunday closed.",
  path: "/visit",
});

export default function VisitPage() {
  return (
    <>
      <PageHero
        label="Visit & book"
        title="Book an"
        accent="appointment"
        intro="Send us a WhatsApp message or call +91 98491 51375. Open Monday to Saturday, 9:30 AM–1 PM and 5–9 PM."
      >
        <p className="flex items-center gap-2.5 text-lg font-semibold text-white">
          <OpenStatusLabel />
        </p>
      </PageHero>

      <section className="bg-lavender">
        <div className="wrap py-[clamp(56px,7vw,96px)]">
          <BookingForm />
        </div>
      </section>

      <section className="bg-white">
        <div className="wrap section-y flex flex-col gap-6">
          <H2 className="mb-4 text-forest">Find us</H2>
          <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,300px),1fr))] gap-4">
            <article className="flex flex-col gap-3 rounded-3xl bg-mint p-8">
              <span className="text-lg font-semibold text-forest">Phone &amp; WhatsApp</span>
              <a href={TEL_HREF} className="text-[30px] font-bold tracking-tight-1 text-forest no-underline">
                {PHONE_DISPLAY}
              </a>
              <div className="mt-auto flex flex-wrap gap-x-5 gap-y-2">
                <ArrowLink href={TEL_HREF}>Call now →</ArrowLink>
                <ArrowLink href={waLink()} external>
                  WhatsApp →
                </ArrowLink>
              </div>
            </article>
            <article className="flex flex-col gap-3 rounded-3xl bg-sky p-8">
              <span className="text-lg font-semibold text-teal-ink">Address</span>
              <address className="text-lg leading-[1.55] text-black not-italic">{ADDRESS_FULL}</address>
              <p className="text-lg leading-normal text-ink">
                <strong className="font-semibold text-teal-ink">Landmark:</strong> near Sri Chaitanya College, Kompally
                main road
              </p>
              <ArrowLink href={MAPS_DIRECTIONS_URL} external className="mt-auto text-teal-ink">
                Get directions →
              </ArrowLink>
            </article>
            <article className="flex flex-col gap-3.5 rounded-3xl bg-cream p-8">
              <span className="text-lg font-semibold text-forest">Opening hours</span>
              <div className="flex flex-col gap-1">
                <span className="text-lg font-semibold text-black">Monday – Saturday</span>
                <span className="text-lg leading-normal text-black">9:30 AM – 1:00 PM</span>
                <span className="text-lg leading-normal text-black">5:00 PM – 9:00 PM</span>
              </div>
              <div className="flex justify-between gap-3 border-t border-line pt-3">
                <span className="text-lg font-semibold text-black">Sunday</span>
                <span className="text-lg text-black">Closed</span>
              </div>
              <p className="mt-auto flex items-center gap-2.5 text-lg font-semibold text-forest">
                <OpenStatusLabel offDot="bg-muted" />
              </p>
            </article>
          </div>
          <Pill size="lg" className="bg-mint-soft text-forest">
            Wheelchair-accessible restroom
          </Pill>
          <LazyMap
            title="Map showing SAI Suraksha Physiotherapy in Kompally, Hyderabad"
            src={MAPS_EMBED_URL}
          />
        </div>
      </section>
    </>
  );
}
