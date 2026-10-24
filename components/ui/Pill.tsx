import type { HTMLAttributes, ReactNode } from "react";

/** Small rounded label used above headings and as chips. Colours passed as Tailwind classes. */
export function Pill({
  children,
  className = "bg-lavender text-violet",
  size = "md",
  ...rest
}: {
  children: ReactNode;
  className?: string;
  size?: "md" | "lg";
} & HTMLAttributes<HTMLSpanElement>) {
  const sizing = size === "lg" ? "px-5 py-2.5 text-lg" : "px-4 py-2 text-base";
  return (
    <span {...rest} className={`self-start rounded-full font-semibold ${sizing} ${className}`}>
      {children}
    </span>
  );
}

/** Clearly marked placeholder for facts still to be confirmed with the clinic. */
export function ToConfirm({ children }: { children: ReactNode }) {
  return (
    <span
      data-to-confirm
      className="inline-block rounded-full border border-dashed border-muted bg-placeholder px-3 py-1 text-base font-medium text-ink"
    >
      {children}
    </span>
  );
}
