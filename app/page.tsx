import { BookingButtons } from "@/components/ui/Buttons";
import { Photo } from "@/components/ui/Photo";
import { Pill } from "@/components/ui/Pill";
import { ArrowLink, H2, InfoCard, SectionHeading } from "@/components/ui/SectionHeading";
import { OpenStatusLabel } from "@/components/OpenStatus";
import { Testimonials } from "@/components/Testimonials";
import { BOOKING_MESSAGE, MAPS_REVIEWS_URL } from "@/lib/site";
import { pageMetadata } from "@/lib/seo";
import Link from "next/link";

export const metadata = pageMetadata({
  title: "Physiotherapy in Kompally, Hyderabad | SAI Suraksha Physiotherapy",
  description:
    "Physiotherapy and rehabilitation in Kompally, Hyderabad, for back, neck and knee pain, sports injuries and recovery after surgery. Rated 5.0 on Google. Book on WhatsApp or call +91 98491 51375.",
  path: "/",
});

const CONDITIONS = [
  { title: "Back pain & slip disc", text: "Lower-back pain, stiffness, or disc pain that travels down the leg.", bg: "bg-mint" },
  { title: "Neck pain & spondylosis", text: "A stiff, aching neck, or pain spreading into the shoulders and arms.", bg: "bg-sky" },
  { title: "Knee pain & arthritis", text: "Pain on the stairs, swelling, or stiffness when you get up.", bg: "bg-cream" },
  { title: "Sports injuries", text: "Sprains, strains and ligament injuries, with a safe plan back to play.", bg: "bg-peach" },
  { title: "Rehab after surgery", text: "After knee or hip replacement, ACL repair and other operations.", bg: "bg-mint-soft" },
  { title: "Frozen shoulder", text: "A painful, stiff shoulder that won't lift fully.", bg: "bg-mint" },
  { title: "Posture & desk-work pain", text: "Aches from long hours at a desk, on the phone or driving.", bg: "bg-sky" },
];

const MENTIONS = [
  "Knowledgeable doctor",
  "Neck pain treatment",
  "Back pain treatment",
  "Fast recovery",
  "Explains the condition clearly",
  "Affordable",
  "Non-commercial",
];

const STEPS = [
  {
    title: "Find the root cause",
    text: "We check how you move and ask the right questions, to find where the problem really starts, not just where it hurts.",
  },
  {
    title: "Explain it clearly",
    text: "You'll understand what's wrong, what we'll do about it, and what to expect, in plain words.",
  },
  {
    title: "Treat it, hands-on",
    text: "Manual therapy, chiropractic techniques and guided exercise, avoiding surgery wherever possible.",
  },
  {
    title: "Keep improving at home",
    text: "A simple home-exercise plan, so you keep getting better between visits.",
  },
];

const DOCTOR_POINTS = [
  "Treating patients in Kompally since 2017",
  "Physiotherapy and chiropractic techniques",
  "Supported by a nurse and a therapist",
  "Home-exercise plans to keep you improving",
];

function Stars({ className }: { className: string }) {
  return (
    <span aria-hidden="true" className={`tracking-[2px] ${className}`}>
      ★★★★★
    </span>
  );
}

function RatingCard({
  source,
  count,
  suffix,
  bg,
  ink,
}: {
  source: string;
  count: number;
  suffix: string;
  bg: string;
  ink: string;
}) {
  return (
    <div className={`flex flex-col gap-1.5 rounded-3xl p-7 ${bg}`}>
      <span className={`text-lg font-semibold ${ink}`}>{source}</span>
      <span data-count className={`text-[56px] leading-none font-semibold tracking-tight-2 tabular-nums ${ink}`}>
        5.0
      </span>
      <Stars className={`text-xl ${ink}`} />
      <span className="text-lg text-ink">
        <span data-count className="tabular-nums">
          {count}
        </span>{" "}
        {suffix}
      </span>
    </div>
  );
}

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-forest text-white">
        <div className="wrap grid grid-cols-[repeat(auto-fit,minmax(min(100%,460px),1fr))] items-center gap-[clamp(40px,5vw,72px)] pt-[clamp(48px,7vw,96px)] pb-[clamp(64px,8vw,112px)]">
          <div className="flex min-w-0 flex-col gap-7">
            <Pill data-hero className="bg-mint text-forest">
              Kompally, Hyderabad · Since 2017
            </Pill>
            <h1 className="text-[clamp(52px,7.4vw,104px)] leading-[0.98] font-medium tracking-tight-2 text-balance">
              Recover <span className="text-leaf">without surgery</span>
            </h1>
            <p className="max-w-[580px] text-[clamp(19px,1.7vw,22px)] leading-normal text-pretty text-mint">
              Back, neck or knee pain, a sports injury, or getting back on your feet after an operation. Dr. Ram
              Charan finds the root cause, explains it in plain words, and treats it with hands-on therapy and
              exercise, avoiding surgery wherever possible.
            </p>
            <div data-hero-cta>
              <BookingButtons />
            </div>
            <p data-hero className="flex flex-wrap items-center gap-x-3 gap-y-2 text-lg leading-[1.4] text-mint">
              <span className="flex items-center gap-2.5 font-semibold text-white">
                <OpenStatusLabel />
              </span>
              <span>Mon–Sat 9:30 AM–1 PM, 5–9 PM</span>
            </p>
          </div>
          <div className="relative min-w-0">
            <div data-hero-photo className="overflow-hidden rounded-3xl">
              <Photo
                name="clinicHall"
                alt="The treatment hall at SAI Suraksha, with an exercise chair, pulley system and glass-walled cabins"
                className="aspect-[4/3.3] w-full rounded-3xl object-cover"
                sizes="(min-width: 1280px) 560px, (min-width: 1100px) 45vw, 100vw"
                priority
              />
            </div>
            <div
              data-hero
              className="absolute bottom-4 left-4 flex items-center gap-3.5 rounded-2xl bg-white px-5 py-4 text-black"
            >
              <span data-count className="text-[44px] leading-none font-semibold tracking-tight-2 text-forest tabular-nums">
                5.0
              </span>
              <span className="flex flex-col gap-0.5">
                <Stars className="text-lg text-forest" />
                <span className="text-base font-medium text-ink">
                  <span data-count className="tabular-nums">
                    202
                  </span>{" "}
                  Google reviews
                </span>
              </span>
            </div>
            <div className="absolute top-4 right-4 hidden w-[min(300px,64%)] flex-col gap-2.5 rounded-2xl bg-white p-3.5 text-black min-[760px]:flex">
              <span className="flex items-center gap-2 text-[15px] font-semibold text-forest">
                <span className="size-2.5 rounded-full bg-leaf" />
                Book in one message
              </span>
              <span className="self-end rounded-[14px_14px_4px_14px] bg-bubble px-3.5 py-2.5 text-base leading-[1.4] text-black">
                {BOOKING_MESSAGE}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section className="section-y flex flex-col gap-[clamp(40px,5vw,64px)] bg-white">
        <div className="wrap grid w-full grid-cols-[repeat(auto-fit,minmax(min(100%,420px),1fr))] items-start gap-[clamp(32px,5vw,72px)]">
          <div data-reveal className="flex flex-col gap-5">
            <Pill>What patients say</Pill>
            <H2>201 of 202 Google reviews give five stars.</H2>
            <p className="max-w-[520px] text-xl leading-normal text-pretty text-ink">
              The clinic is also rated 5.0 from 227 reviews on Justdial, where it is Justdial Verified.
            </p>
            <ArrowLink href={MAPS_REVIEWS_URL} external className="self-start text-forest">
              Read the reviews on Google →
            </ArrowLink>
          </div>
          <div data-stagger className="flex flex-col gap-4">
            <div className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-4">
              <RatingCard source="Google" count={202} suffix="reviews" bg="bg-mint" ink="text-forest" />
              <RatingCard source="Justdial" count={227} suffix="reviews · Verified" bg="bg-sky" ink="text-teal-ink" />
            </div>
            <div className="flex flex-col gap-4 rounded-3xl bg-cream p-7">
              <span className="text-lg font-semibold text-forest">What patients mention most</span>
              <div className="flex flex-wrap gap-2">
                {MENTIONS.map((m) => (
                  <Pill key={m} className="bg-white text-forest">
                    {m}
                  </Pill>
                ))}
              </div>
            </div>
          </div>
        </div>
        <Testimonials />
      </section>

      {/* What we treat */}
      <section className="bg-lavender">
        <div className="wrap section-y flex flex-col gap-10">
          <div className="flex flex-wrap items-end justify-between gap-x-10 gap-y-5">
            <SectionHeading label="What we treat" labelClass="bg-white text-violet">
              Pain and injuries we treat every day
            </SectionHeading>
            <ArrowLink href="/treatments">All conditions &amp; treatments →</ArrowLink>
          </div>
          <div data-stagger className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,270px),1fr))] gap-4">
            {CONDITIONS.map((c) => (
              <InfoCard key={c.title} title={c.title} className={c.bg} gap="gap-2.5">
                {c.text}
              </InfoCard>
            ))}
            <Link
              href="/treatments"
              className="flex flex-col gap-2.5 rounded-3xl bg-forest p-8 no-underline hover:bg-forest-hover"
            >
              <span className="text-[26px] leading-[1.2] font-bold tracking-tight-1 text-white">Also treated</span>
              <span className="flex-1 text-lg leading-normal text-mint">
                Tennis elbow, wrist and heel pain, rehab after a fracture, and Bell&apos;s palsy.
              </span>
              <span className="text-lg font-semibold text-leaf">See all conditions →</span>
            </Link>
          </div>
        </div>
      </section>

      {/* How your visit works */}
      <section className="bg-white">
        <div className="wrap section-y grid grid-cols-[repeat(auto-fit,minmax(min(100%,440px),1fr))] items-center gap-[clamp(40px,5vw,80px)]">
          <div className="flex flex-col gap-10">
            <SectionHeading label="Our approach" headingClass="text-violet" className="">
              How your visit works
            </SectionHeading>
            <ol data-stagger className="flex flex-col gap-7">
              {STEPS.map((s, i) => (
                <li key={s.title} className="flex items-start gap-5">
                  <span className="flex size-11 flex-none items-center justify-center rounded-full bg-violet text-xl font-bold text-white">
                    {i + 1}
                  </span>
                  <span className="flex flex-col gap-1.5">
                    <span className="text-2xl font-bold tracking-tight-1 text-forest">{s.title}</span>
                    <span className="text-lg leading-normal text-ink">{s.text}</span>
                  </span>
                </li>
              ))}
            </ol>
          </div>
          <div className="relative min-w-0">
            <div data-parallax className="overflow-hidden rounded-3xl">
              <Photo
                name="consultationRoom"
                alt="Glass-walled consultation room with a spine model on the desk"
                className="aspect-[1/1.05] w-full rounded-3xl object-cover"
                sizes="(min-width: 1280px) 560px, (min-width: 1100px) 45vw, 100vw"
              />
            </div>
            <Pill className="absolute bottom-4 left-4 bg-white text-forest">Consultation room</Pill>
          </div>
        </div>
      </section>

      {/* Meet your physiotherapist */}
      <section className="bg-mint">
        <div className="wrap section-y grid grid-cols-[repeat(auto-fit,minmax(min(100%,440px),1fr))] items-center gap-[clamp(32px,5vw,72px)]">
          <div className="flex flex-col gap-5">
            <Pill className="bg-white text-forest">Meet your physiotherapist</Pill>
            <h2 className="text-[clamp(40px,5.2vw,72px)] leading-[1.02] font-medium tracking-tight-2 text-forest">
              Dr. G. Ram Charan
            </h2>
            <p className="text-[22px] font-semibold text-forest">Physiotherapist &amp; lead doctor</p>
            <p className="text-[clamp(22px,2.2vw,28px)] leading-[1.35] font-medium tracking-tight-1 text-pretty text-black">
              Patients call him “Charan sir”. In reviews, they most often mention his clear explanations and how
              quickly they recovered.
            </p>
          </div>
          <div data-reveal className="flex flex-col gap-5 rounded-3xl bg-white p-[clamp(24px,3vw,40px)]">
            {DOCTOR_POINTS.map((p) => (
              <div key={p} className="flex items-center gap-4 text-xl font-medium text-forest">
                <span className="flex size-9 flex-none items-center justify-center rounded-full bg-mint text-lg font-bold">
                  ✓
                </span>
                {p}
              </div>
            ))}
            <ArrowLink href="/about" className="mt-1 self-start text-forest">
              More about Dr. Ram Charan →
            </ArrowLink>
          </div>
        </div>
      </section>

      {/* Inside the clinic */}
      <section className="bg-white">
        <div className="wrap section-y flex flex-col gap-10">
          <SectionHeading label="Inside the clinic" className="max-w-[820px]">
            A clean, bright clinic in Satyam Enclave
          </SectionHeading>
          <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,380px),1fr))] gap-4">
            <figure className="flex flex-col gap-3">
              <div data-parallax className="overflow-hidden rounded-3xl">
                <Photo
                  name="waitingArea"
                  alt="Bright waiting area with chairs and a television"
                  className="aspect-[4/3] w-full rounded-3xl object-cover"
                  sizes="(min-width: 1280px) 552px, (min-width: 900px) 45vw, 100vw"
                />
              </div>
              <figcaption className="text-lg font-semibold text-forest">Waiting area</figcaption>
            </figure>
            <figure className="flex flex-col gap-3">
              <div data-parallax className="overflow-hidden rounded-3xl">
                <Photo
                  name="treatmentCubicles"
                  alt="Curtained treatment cubicles with therapy equipment"
                  className="aspect-[4/3] w-full rounded-3xl object-cover"
                  sizes="(min-width: 1280px) 552px, (min-width: 900px) 45vw, 100vw"
                />
              </div>
              <figcaption className="text-lg font-semibold text-forest">Private treatment cubicles</figcaption>
            </figure>
          </div>
          <div className="flex flex-wrap items-center justify-between gap-4">
            <Pill size="lg" className="bg-mint-soft text-forest">
              Wheelchair-accessible restroom
            </Pill>
            <ArrowLink href="/visit">Address &amp; directions →</ArrowLink>
          </div>
        </div>
      </section>
    </>
  );
}
