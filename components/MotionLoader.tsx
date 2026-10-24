"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

// GSAP lives in its own chunk, which is not even requested until the page has painted, React has
// hydrated <main>, and the browser is idle — so it never competes with first paint or hydration.
const PageMotion = dynamic(() => import("@/components/PageMotion"), { ssr: false });

/** True once React has hydrated the last element in <main> (it attaches a __reactFiber key). */
function mainHydrated() {
  let el: Element | null = document.querySelector("main");
  while (el?.lastElementChild) el = el.lastElementChild;
  return !!el && Object.keys(el).some((k) => k.startsWith("__reactFiber"));
}

export function MotionLoader() {
  const [load, setLoad] = useState(false);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    let idle = 0;
    let painted = performance.getEntriesByType("paint").some((e) => e.name === "first-contentful-paint");
    const po = new PerformanceObserver(() => (painted = true));
    if (!painted) po.observe({ type: "paint" });

    const poll = (tries = 0) => {
      if ((painted && mainHydrated()) || tries > 120) {
        po.disconnect();
        if ("requestIdleCallback" in window) idle = requestIdleCallback(() => setLoad(true), { timeout: 1000 });
        else setLoad(true);
      } else timer = setTimeout(() => poll(tries + 1), 50);
    };
    poll();
    return () => {
      po.disconnect();
      clearTimeout(timer);
      if (idle) cancelIdleCallback(idle);
    };
  }, []);

  return load ? <PageMotion /> : null;
}
