import Link from "next/link";
import type { ReactNode } from "react";
import { Pill } from "./Pill";

/** Label pill + large h2, as used at the top of most sections. */
export function SectionHeading({
  label,
  labelClass = "bg-lavender text-violet",
  children,
  headingClass = "text-forest",
  className = "max-w-[760px]",
}: {
  label: string;
  labelClass?: string;
  children: ReactNode;
  headingClass?: string;
  className?: string;
}) {
  return (
    <div className={`flex flex-col gap-5 ${className}`}>
      <Pill className={labelClass}>{label}</Pill>
      <H2 className={headingClass}>{children}</H2>
    </div>
  );
}

export function H2({ children, className = "text-forest" }: { children: ReactNode; className?: string }) {
  return (
    <h2
      className={`text-[clamp(38px,4.8vw,64px)] leading-[1.05] font-medium tracking-tight-2 text-balance ${className}`}
    >
      {children}
    </h2>
  );
}

/** Dark green page hero used on the inner pages. */
export function PageHero({
  label,
  title,
  accent,
  intro,
  titleMax = "max-w-[1000px]",
  children,
}: {
  label: string;
  title: string;
  accent: string;
  intro: ReactNode;
  titleMax?: string;
  children?: ReactNode;
}) {
  return (
    <section className="bg-forest text-white">
      <div className="wrap flex flex-col gap-6 py-[clamp(48px,6vw,88px)]">
        <Pill className="bg-mint text-forest">{label}</Pill>
        <h1
          className={`text-[clamp(48px,6.6vw,96px)] leading-none font-medium tracking-tight-2 text-balance ${titleMax}`}
        >
          {title} <span className="text-leaf">{accent}</span>
        </h1>
        <p className="max-w-[720px] text-[clamp(19px,1.7vw,22px)] leading-normal text-pretty text-mint">
          {intro}
        </p>
        {children}
      </div>
    </section>
  );
}

/** Coloured card with an h3 and a paragraph. */
export function InfoCard({
  title,
  children,
  className = "bg-mint",
  gap = "gap-3",
}: {
  title: string;
  children: ReactNode;
  className?: string;
  gap?: string;
}) {
  return (
    <article className={`flex flex-col rounded-3xl p-8 ${gap} ${className}`}>
      <h3 className="text-[26px] leading-[1.2] font-bold tracking-tight-1 text-forest">{title}</h3>
      <p className="text-lg leading-normal text-ink">{children}</p>
    </article>
  );
}

/** Underlined "→" text link. */
export function ArrowLink({
  href,
  children,
  className = "text-forest",
  external = false,
}: {
  href: string;
  children: ReactNode;
  className?: string;
  external?: boolean;
}) {
  const cls = `text-lg font-semibold ${className}`;
  if (href.startsWith("/")) {
    return (
      <Link href={href} className={cls}>
        {children}
      </Link>
    );
  }
  return (
    <a href={href} {...(external ? { target: "_blank", rel: "noopener" } : {})} className={cls}>
      {children}
    </a>
  );
}
