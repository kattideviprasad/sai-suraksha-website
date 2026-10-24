import { Photo, type PhotoName } from "@/components/ui/Photo";
import { Pill, ToConfirm } from "@/components/ui/Pill";
import { InfoCard, PageHero, SectionHeading } from "@/components/ui/SectionHeading";
import { pageMetadata } from "@/lib/seo";
import type { ReactNode } from "react";

export const metadata = pageMetadata({
  title: "Dr. G. Ram Charan, Physiotherapist in Kompally | About SAI Suraksha",
  description:
    "Meet Dr. G. Ram Charan, who has led SAI Suraksha Physiotherapy & Rehabilitation Centre in Kompally, Hyderabad since 2017. Root-cause care, clear explanations, surgery only if needed.",
  path: "/about",
});

const FACTS: { term: string; detail: ReactNode }[] = [
  // TO CONFIRM with the clinic before launch: qualification and years of experience.
  { term: "Qualification", detail: <ToConfirm>BPT / MPT, to confirm</ToConfirm> },
  { term: "Experience", detail: <ToConfirm>Years of experience, to confirm</ToConfirm> },
  { term: "At SAI Suraksha", detail: "Treating patients in Kompally since 2017" },
  {
    term: "Treatments",
    detail: "Manual therapy, exercise therapy, chiropractic techniques and home-exercise plans",
  },
  { term: "Team", detail: "Supported by a nurse and a therapist" },
];

const PRAISE = [
  { label: "Knowledgeable doctor", bg: "bg-mint" },
  { label: "Neck pain treatment", bg: "bg-sky" },
  { label: "Back pain treatment", bg: "bg-cream" },
  { label: "Fast recovery", bg: "bg-peach" },
  { label: "Clear explanations", bg: "bg-mint-soft" },
];

const VALUES = [
  { title: "Root cause first", text: "We look for where the problem really starts, not just where it hurts.", bg: "bg-mint" },
  {
    title: "Clear explanations",
    text: "You'll understand your condition and your treatment plan, in plain words.",
    bg: "bg-sky",
  },
  {
    title: "Surgery only if needed",
    text: "Hands-on care and exercise come first, so you can avoid surgery wherever possible.",
    bg: "bg-cream",
  },
  {
    title: "Ethical and affordable",
    text: "Patients describe our care as affordable and non-commercial, and we intend to keep it that way.",
    bg: "bg-peach",
  },
];

const GALLERY: { name: PhotoName; alt: string; caption: string }[] = [
  {
    name: "clinicHall",
    alt: "The treatment hall with an exercise chair, pulley system and glass-walled cabins",
    caption: "Treatment hall",
  },
  { name: "waitingArea", alt: "Bright waiting area with chairs and a television", caption: "Waiting area" },
  {
    name: "consultationRoom",
    alt: "Glass-walled consultation room with a spine model on the desk",
    caption: "Consultation room",
  },
  {
    name: "treatmentCubicles",
    alt: "Curtained treatment cubicles with therapy equipment",
    caption: "Private treatment cubicles",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        label="About us"
        title="Your neighbourhood physio"
        accent="in Kompally"
        intro="SAI Suraksha Physiotherapy & Rehabilitation Centre is led by Dr. G. Ram Charan, who has treated patients here since 2017."
      />

      <section className="bg-white">
        <div className="wrap section-y grid grid-cols-[repeat(auto-fit,minmax(min(100%,400px),1fr))] items-start gap-[clamp(40px,5vw,80px)]">
          {/* TO CONFIRM: replace with a photo of Dr. Ram Charan when the clinic supplies one. */}
          <div
            data-to-confirm
            role="img"
            aria-label="Photo of Dr. Ram Charan, to come"
            className="relative aspect-[4/5] w-full overflow-hidden rounded-3xl bg-mint-soft"
          >
            <div className="absolute inset-4 flex items-center justify-center rounded-2xl border-2 border-dashed border-muted p-6 text-center">
              <ToConfirm>Photo of Dr. Ram Charan, to come</ToConfirm>
            </div>
          </div>

          <div className="flex flex-col gap-6">
            <Pill>Physiotherapist &amp; lead doctor</Pill>
            <h2 className="text-[clamp(40px,5.2vw,72px)] leading-[1.02] font-medium tracking-tight-2 text-forest">
              Dr. G. Ram Charan
            </h2>
            <p className="text-xl leading-[1.55] text-pretty text-ink">
              Known to patients as Dr. Ramcharan, or simply “Charan sir”. He looks for the root cause of the problem,
              explains it clearly, and combines physiotherapy with chiropractic techniques to help patients recover
              without surgery wherever possible.
            </p>
            <dl className="flex flex-col">
              {FACTS.map((f, i) => (
                <div
                  key={f.term}
                  className={`grid grid-cols-[minmax(140px,180px)_1fr] gap-x-5 gap-y-2 border-t border-line py-4 ${
                    i === FACTS.length - 1 ? "border-b" : ""
                  }`}
                >
                  <dt className="text-lg font-semibold text-forest">{f.term}</dt>
                  <dd className={typeof f.detail === "string" ? "text-lg leading-normal text-black" : undefined}>
                    {f.detail}
                  </dd>
                </div>
              ))}
            </dl>
            <div className="flex flex-col gap-3">
              <span className="text-lg font-semibold text-forest">Patients most often praise</span>
              <div className="flex flex-wrap gap-2">
                {PRAISE.map((p) => (
                  <Pill key={p.label} className={`${p.bg} text-forest`}>
                    {p.label}
                  </Pill>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-lavender">
        <div className="wrap section-y flex flex-col gap-10">
          <SectionHeading label="Our values" labelClass="bg-white text-violet" headingClass="text-violet">
            What we stand for
          </SectionHeading>
          <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,260px),1fr))] gap-4">
            {VALUES.map((v) => (
              <InfoCard key={v.title} title={v.title} className={v.bg}>
                {v.text}
              </InfoCard>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white">
        <div className="wrap section-y flex flex-col gap-10">
          <SectionHeading label="The clinic" className="max-w-[820px]">
            Inside SAI Suraksha
          </SectionHeading>
          <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,380px),1fr))] gap-4">
            {GALLERY.map((g) => (
              <figure key={g.name} className="flex flex-col gap-3">
                <Photo
                  name={g.name}
                  alt={g.alt}
                  className="aspect-[4/3] w-full rounded-3xl object-cover"
                  sizes="(min-width: 1280px) 552px, (min-width: 900px) 45vw, 100vw"
                />
                <figcaption className="text-lg font-semibold text-forest">{g.caption}</figcaption>
              </figure>
            ))}
          </div>
          <Pill size="lg" className="bg-mint-soft text-forest">
            Wheelchair-accessible restroom
          </Pill>
        </div>
      </section>
    </>
  );
}
