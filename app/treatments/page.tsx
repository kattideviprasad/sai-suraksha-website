import { ArrowLink, H2, PageHero, SectionHeading } from "@/components/ui/SectionHeading";
import { waAbout } from "@/lib/site";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Back, Neck & Knee Pain Treatment in Kompally | SAI Suraksha Physiotherapy",
  description:
    "Physiotherapy in Kompally, Hyderabad for back pain and slip disc, neck pain and spondylosis, knee pain and arthritis, sports injuries, frozen shoulder and rehab after surgery.",
  path: "/treatments",
});

const COMMON = [
  {
    title: "Back pain & slip disc",
    text: "Lower or upper back pain, stiffness, or a disc problem that sends pain down the leg.",
    topic: "back pain",
    link: "Ask about back pain →",
    bg: "bg-mint",
  },
  {
    title: "Neck pain & spondylosis",
    text: "A stiff, aching neck, or pain and tingling that spreads into the shoulders and arms.",
    topic: "neck pain",
    link: "Ask about neck pain →",
    bg: "bg-sky",
  },
  {
    title: "Knee pain & arthritis",
    text: "Pain on the stairs, swelling, or stiffness when you get up or sit on the floor.",
    topic: "knee pain",
    link: "Ask about knee pain →",
    bg: "bg-cream",
  },
  {
    title: "Sports injuries",
    text: "Sprains, strains, and ligament or muscle injuries, with a safe plan to get back to your game.",
    topic: "a sports injury",
    link: "Ask about a sports injury →",
    bg: "bg-peach",
  },
  {
    title: "Rehab after surgery",
    text: "After knee or hip replacement, ACL reconstruction and other operations: rebuild strength, movement and confidence.",
    topic: "rehab after surgery",
    link: "Ask about rehab after surgery →",
    bg: "bg-mint-soft",
  },
  {
    title: "Frozen shoulder",
    text: "A painful, stiff shoulder that makes lifting your arm, dressing or reaching difficult.",
    topic: "frozen shoulder",
    link: "Ask about frozen shoulder →",
    bg: "bg-mint",
  },
  {
    title: "Posture & desk-work pain",
    text: "Aches from long hours at a desk, on the phone or driving, with advice on posture and your work set-up.",
    topic: "posture or desk-work pain",
    link: "Ask about posture pain →",
    bg: "bg-sky",
  },
];

const ALSO = [
  { title: "Tennis elbow", text: "Pain on the outer elbow when you grip, lift or turn your wrist.", topic: "tennis elbow" },
  {
    title: "Wrist & heel pain",
    text: "Wrist pain from strain or injury, and heel pain that's worst with the first steps of the morning.",
    topic: "wrist or heel pain",
  },
  {
    title: "Rehab after a fracture",
    text: "Getting movement and strength back once the bone has healed or the cast is off.",
    topic: "rehab after a fracture",
  },
  {
    title: "Bell's palsy",
    text: "Weakness on one side of the face, with guided facial exercises to support recovery.",
    topic: "Bell's palsy",
  },
];

const METHODS = [
  { title: "Manual therapy", text: "Hands-on techniques to ease pain and loosen stiff joints and muscles.", bg: "bg-mint" },
  {
    title: "Chiropractic techniques",
    text: "Gentle adjustments of the spine and joints, used when they suit your condition.",
    bg: "bg-orchid",
  },
  {
    title: "Exercise therapy",
    text: "Guided exercises at the clinic to rebuild strength, flexibility and balance.",
    bg: "bg-sky",
  },
  { title: "Home-exercise plans", text: "A simple routine for home, so you keep improving between visits.", bg: "bg-cream" },
];

function SubHeading({ children, className = "" }: { children: string; className?: string }) {
  return (
    <h2 className={`text-[clamp(34px,4vw,52px)] leading-[1.1] font-medium tracking-tight-2 text-forest ${className}`}>
      {children}
    </h2>
  );
}

function AskCard({
  title,
  text,
  topic,
  link,
  className,
  titleSize,
}: {
  title: string;
  text: string;
  topic: string;
  link: string;
  className: string;
  titleSize: string;
}) {
  return (
    <article className={`flex flex-col gap-3 rounded-3xl ${className}`}>
      <h3 className={`${titleSize} leading-[1.2] font-bold tracking-tight-1 text-forest`}>{title}</h3>
      <p className="flex-1 text-lg leading-normal text-ink">{text}</p>
      <ArrowLink href={waAbout(topic)} external>
        {link}
      </ArrowLink>
    </article>
  );
}

export default function TreatmentsPage() {
  return (
    <>
      <PageHero
        label="Conditions & treatments"
        title="What we treat,"
        accent="and how"
        titleMax="max-w-[980px]"
        intro="A plain-language guide to the problems we see every day. Not sure if physiotherapy can help you? Tap “Ask” on any card to send us a WhatsApp message about it."
      />

      <section className="bg-lavender">
        <div className="wrap section-y flex flex-col gap-8">
          <SubHeading>Most common</SubHeading>
          <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,320px),1fr))] gap-4">
            {COMMON.map((c) => (
              <AskCard key={c.title} {...c} className={`p-8 ${c.bg}`} titleSize="text-[26px]" />
            ))}
          </div>
          <SubHeading className="mt-8">Also treated</SubHeading>
          <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,260px),1fr))] gap-4">
            {ALSO.map((c) => (
              <AskCard key={c.title} {...c} link="Ask about this →" className="bg-white p-7" titleSize="text-2xl" />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white">
        <div className="wrap section-y flex flex-col gap-10">
          <SectionHeading label="Treatments" headingClass="text-violet">
            How we treat
          </SectionHeading>
          <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,260px),1fr))] gap-4">
            {METHODS.map((m, i) => (
              <article key={m.title} className={`flex flex-col gap-3 rounded-3xl p-8 ${m.bg}`}>
                <span className="text-base font-bold text-violet">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="text-[26px] leading-[1.2] font-bold tracking-tight-1 text-forest">{m.title}</h3>
                <p className="text-lg leading-normal text-ink">{m.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-mint">
        <div className="section-y mx-auto flex max-w-[960px] flex-col items-center gap-5 px-[clamp(20px,5vw,80px)] text-center">
          <H2>Recover without surgery, wherever possible</H2>
          <p className="max-w-[720px] text-xl leading-[1.55] text-pretty text-ink">
            Every plan starts with finding the root cause and explaining it clearly. Then we treat it with hands-on
            care and exercise, and give you a plan for home so you keep improving.
          </p>
        </div>
      </section>
    </>
  );
}
