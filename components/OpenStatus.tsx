"use client";

import { useEffect, useState } from "react";
import { getOpenStatus, type OpenStatus } from "@/lib/hours";

/** Live India-time status. Computed only in the browser so cached pages never show a stale value. */
function useOpenStatus(): OpenStatus | null {
  const [status, setStatus] = useState<OpenStatus | null>(null);
  useEffect(() => {
    const tick = () => setStatus(getOpenStatus(new Date()));
    tick();
    const id = setInterval(tick, 30_000);
    return () => clearInterval(id);
  }, []);
  return status;
}

/** Dot + status text. `offDot` is the closed-state dot colour (lighter on dark backgrounds). */
export function OpenStatusLabel({ offDot = "bg-dot-off" }: { offDot?: string }) {
  const status = useOpenStatus();
  return (
    <>
      <span
        aria-hidden="true"
        className={`size-3 flex-none rounded-full ${status?.open ? "bg-leaf" : offDot}`}
      />
      {/* Reserve the line while the status loads, so nothing jumps */}
      <span aria-live="polite" className={status ? undefined : "invisible"}>
        {status?.text ?? "Open now · Until 9:00 PM"}
      </span>
    </>
  );
}
