"use client";

import { useContext, useEffect, useRef, useState } from "react";
import { Marquee, MarqueeCopyContext } from "@/components/ui/marquee";
import { ToConfirm } from "@/components/ui/Pill";
import { cn } from "@/lib/utils";
import { REVIEWS, displayName, isPlaceholder, type Review } from "@/lib/reviews";

const CARD_W = 356; // card width + gap, used to repeat enough copies to fill wide screens

// At most 10 reviews in the band, in file order, whatever data/reviews.json holds (keeps Home light).
const SHOWN = REVIEWS.slice(0, 10);

function ReviewCard({
  review,
  index,
  overflows,
  onExpandChange,
}: {
  review: Review;
  /** Position in SHOWN; the parent measures each review once and passes `overflows` down. */
  index: number;
  overflows: boolean;
  onExpandChange: (open: boolean) => void;
}) {
  const copy = useContext(MarqueeCopyContext);
  const [expanded, setExpanded] = useState(false);

  const toggle = () => {
    setExpanded(!expanded);
    onExpandChange(!expanded);
  };

  return (
    <figure className="flex w-[300px] shrink-0 snap-start flex-col gap-4 rounded-3xl border border-line bg-white p-6 sm:w-[340px]">
      <div className="flex items-center justify-between gap-3">
        <span role="img" aria-label={`Rated ${review.rating} out of 5`} className="text-lg tracking-[2px] text-forest">
          {"★".repeat(review.rating)}
        </span>
        {isPlaceholder(review) && <ToConfirm>Placeholder</ToConfirm>}
      </div>
      <blockquote>
        <p
          data-review={index}
          data-expanded={expanded || undefined}
          className={cn("text-lg leading-normal text-pretty text-black", !expanded && "line-clamp-5 h-[7.5em]")}
        >
          {review.text}
        </p>
      </blockquote>
      {/* Always rendered so the card height never changes once the text is measured */}
      <button
        type="button"
        onClick={toggle}
        aria-expanded={expanded}
        tabIndex={copy > 0 || !overflows ? -1 : undefined}
        className={cn(
          "self-start rounded-full text-base font-semibold text-forest underline underline-offset-4 hover:text-violet",
          !overflows && !expanded && "invisible",
        )}
      >
        {expanded ? "Show less" : "Read more"}
      </button>
      <figcaption className="mt-auto flex items-baseline justify-between gap-3 border-t border-line pt-4">
        <span className="text-lg font-semibold text-forest">{displayName(review.name)}</span>
        <span className="text-base text-ink">Google review</span>
      </figcaption>
    </figure>
  );
}

// Reduced motion: the marquee becomes a static, swipeable row (first copy only).
const rowClass =
  "[&>*]:items-start motion-reduce:snap-x motion-reduce:snap-mandatory motion-reduce:overflow-x-auto motion-reduce:px-[clamp(20px,5vw,80px)] motion-reduce:[&>*]:animate-none motion-reduce:[&>*:not(:first-child)]:hidden";

/** Renders nothing (no band, no Pause button) until data/reviews.json has reviews. */
export function Testimonials() {
  return SHOWN.length > 0 ? <TestimonialsBand /> : null;
}

function TestimonialsBand() {
  const [userPaused, setUserPaused] = useState(false);
  const [touchPaused, setTouchPaused] = useState(false);
  const [openCount, setOpenCount] = useState(0);
  const touchTimer = useRef<ReturnType<typeof setTimeout>>(undefined);
  const paused = userPaused || touchPaused || openCount > 0;

  const repeat = Math.max(2, Math.ceil(1600 / (SHOWN.length * CARD_W)) + 1);
  const duration = `${Math.max(40, SHOWN.length * 9)}s`;
  const onExpandChange = (open: boolean) => setOpenCount((c) => c + (open ? 1 : -1));

  // Which reviews are longer than the five-line clamp (they get "Read more"). Measured once for the
  // whole band — one layout read, one state update — and again only when the viewport width changes.
  const regionRef = useRef<HTMLDivElement>(null);
  const [overflowing, setOverflowing] = useState<ReadonlySet<number>>(new Set());
  useEffect(() => {
    let width = window.innerWidth;
    let timer: ReturnType<typeof setTimeout>;
    const measure = () => {
      const found = new Set<number>();
      regionRef.current?.querySelectorAll<HTMLElement>("[data-review]:not([data-expanded])").forEach((p) => {
        if (p.clientHeight && p.scrollHeight > p.clientHeight + 1) found.add(Number(p.dataset.review));
      });
      setOverflowing((prev) => (prev.size === found.size && [...found].every((i) => prev.has(i)) ? prev : found));
    };
    const onResize = () => {
      if (window.innerWidth === width) return;
      width = window.innerWidth;
      clearTimeout(timer);
      timer = setTimeout(measure, 200);
    };
    measure();
    document.fonts?.ready.then(measure);
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("resize", onResize);
      clearTimeout(timer);
      clearTimeout(touchTimer.current);
    };
  }, []);

  return (
    <div className="flex flex-col gap-4">
      <div className="wrap flex justify-end motion-reduce:hidden">
        <button
          type="button"
          onClick={() => setUserPaused(!userPaused)}
          aria-pressed={userPaused}
          className="min-h-11 rounded-full border border-black bg-white px-5 text-base font-semibold text-forest hover:bg-lavender"
        >
          {userPaused ? "Play reviews" : "Pause reviews"}
        </button>
      </div>
      <div
        ref={regionRef}
        role="region"
        aria-label="Google reviews from patients"
        data-paused={paused}
        onPointerDown={(e) => {
          if (e.pointerType !== "touch") return;
          clearTimeout(touchTimer.current);
          setTouchPaused(true);
        }}
        onPointerUp={() => {
          clearTimeout(touchTimer.current);
          touchTimer.current = setTimeout(() => setTouchPaused(false), 2500);
        }}
        onPointerCancel={() => setTouchPaused(false)}
        className="[mask-image:linear-gradient(to_right,transparent,#000_5%,#000_95%,transparent)] motion-reduce:[mask-image:none] data-[paused=true]:[&_.animate-marquee]:[animation-play-state:paused] [&:focus-within_.animate-marquee]:[animation-play-state:paused] [&:hover_.animate-marquee]:[animation-play-state:paused]"
      >
        {/* One row at every width: a second row doubled the DOM on Home and cost blocking time. */}
        {/* Inline --duration overrides the marquee's default 40s class. */}
        <Marquee repeat={repeat} className={rowClass} style={{ "--duration": duration } as React.CSSProperties}>
          {SHOWN.map((r, index) => (
            <ReviewCard
              key={index}
              review={r}
              index={index}
              overflows={overflowing.has(index)}
              onExpandChange={onExpandChange}
            />
          ))}
        </Marquee>
      </div>
    </div>
  );
}
