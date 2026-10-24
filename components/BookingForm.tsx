"use client";

import { useState } from "react";
import { BOOKING_MESSAGE, PHONE_SHORT, TEL_HREF, waLink } from "@/lib/site";
import { primaryBtn } from "@/components/ui/Buttons";

const PROBLEMS = {
  back: "Back pain",
  neck: "Neck pain",
  knee: "Knee pain",
  shoulder: "Shoulder pain",
  sports: "Sports injury",
  surgery: "Rehab after surgery",
  other: "Something else",
};
const TIME_CHIPS = { morning: "Morning, 9:30 AM–1 PM", evening: "Evening, 5–9 PM", any: "Any time" };
const TIME_TEXT = { morning: "Morning (9:30 AM – 1 PM)", evening: "Evening (5 – 9 PM)", any: "Any time" };

type Problem = keyof typeof PROBLEMS;
type Time = keyof typeof TIME_CHIPS;

function Chips<K extends string>({
  options,
  value,
  onPick,
  label,
}: {
  options: Record<K, string>;
  value: K;
  onPick: (k: K) => void;
  label: string;
}) {
  return (
    <div role="group" aria-label={label} className="flex flex-wrap gap-2">
      {(Object.keys(options) as K[]).map((k) => {
        const sel = k === value;
        return (
          <button
            key={k}
            type="button"
            onClick={() => onPick(k)}
            aria-pressed={sel}
            className={`min-h-[52px] rounded-full border px-5 py-3 text-lg font-semibold ${
              sel ? "border-forest bg-forest text-white" : "border-black bg-white text-forest"
            }`}
          >
            {options[k]}
          </button>
        );
      })}
    </div>
  );
}

export function BookingForm() {
  const [problem, setProblem] = useState<Problem>("back");
  const [time, setTime] = useState<Time>("evening");
  const [name, setName] = useState("");

  const lines = [BOOKING_MESSAGE, `Problem: ${PROBLEMS[problem]}`, `Preferred time: ${TIME_TEXT[time]}`];
  if (name.trim()) lines.push(`Name: ${name.trim()}`);
  const message = lines.join("\n");

  return (
    <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,400px),1fr))] gap-[clamp(32px,4vw,56px)] rounded-3xl bg-white p-[clamp(24px,3.5vw,48px)]">
      <div className="flex flex-col gap-8">
        <h2 className="text-[clamp(34px,4vw,52px)] leading-[1.08] font-medium tracking-tight-2 text-balance text-forest">
          Book on WhatsApp in three taps
        </h2>
        <div className="flex flex-col gap-3.5">
          <span className="text-xl font-semibold text-forest">1. What do you need help with?</span>
          <Chips options={PROBLEMS} value={problem} onPick={setProblem} label="What do you need help with?" />
        </div>
        <div className="flex flex-col gap-3.5">
          <span className="text-xl font-semibold text-forest">2. When suits you?</span>
          <Chips options={TIME_CHIPS} value={time} onPick={setTime} label="When suits you?" />
        </div>
        <label className="flex flex-col gap-3.5">
          <span className="text-xl font-semibold text-forest">
            3. Your name <span className="font-normal text-ink">(optional)</span>
          </span>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your name"
            autoComplete="name"
            className="min-h-14 w-full rounded-full border border-black bg-white px-[22px] py-3 text-lg text-black"
          />
        </label>
      </div>

      <div className="flex flex-col justify-between gap-5 rounded-3xl bg-cream p-[clamp(24px,3vw,36px)]">
        <div className="flex flex-col gap-3.5">
          <span className="text-lg font-semibold text-forest">Your message</span>
          <p
            aria-live="polite"
            className="max-w-full self-end rounded-[16px_16px_4px_16px] bg-bubble px-[18px] py-4 text-lg leading-normal whitespace-pre-line text-black"
          >
            {message}
          </p>
          <span className="text-base leading-normal text-ink">
            WhatsApp opens with this message filled in. Just press send.
          </span>
        </div>
        <div className="flex flex-col gap-3">
          <a href={waLink(message)} target="_blank" rel="noopener" className={primaryBtn.replace("inline-flex", "flex")}>
            Send on WhatsApp
          </a>
          <a
            href={TEL_HREF}
            className="flex min-h-[60px] items-center justify-center rounded-[40px] border border-black px-8 py-3.5 text-xl font-medium text-forest no-underline hover:bg-white hover:text-forest"
          >
            Or call {PHONE_SHORT}
          </a>
        </div>
      </div>
    </div>
  );
}
