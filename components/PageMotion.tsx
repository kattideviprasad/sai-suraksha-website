"use client";

import { usePathname } from "next/navigation";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

const EASE = "power2.out";

// Calm, one-time motion driven by data attributes on server-rendered markup:
//   data-hero        hero pieces (pre-hidden by CSS while html.js-motion is set) fade/rise in
//   data-hero-cta    booking buttons: never hidden, only settle from a small offset (transform only)
//   data-hero-photo  frame whose image settles from scale 1.03 (never hidden — it can be the LCP image)
//   data-reveal      fades/rises once when scrolled into view
//   data-stagger     its children reveal one after another
//   data-count       number counts up once in view (final value is already in the HTML)
//   data-parallax    the image inside drifts gently on scroll (≥768px only, ScrollTrigger loaded on demand)
// Reduced motion: nothing animates and everything is shown as rendered.
export default function PageMotion() {
  const pathname = usePathname();
  // Mounted by MotionLoader only after first paint + hydration, so GSAP never races React.
  useGSAP(
    () => {
      const html = document.documentElement;
      const mm = gsap.matchMedia();

      mm.add(
        { motion: "(prefers-reduced-motion: no-preference)", wide: "(min-width: 768px)" },
        (ctx) => {
          const { motion, wide } = ctx.conditions as { motion: boolean; wide: boolean };
          if (!motion) return;

          // Next keeps recently visited pages mounted but hidden; only touch the visible page.
          const visible = (el: Element) => el.getClientRects().length > 0;
          const all = (sel: string) => gsap.utils.toArray<HTMLElement>(sel).filter(visible);

          // Hero intro: first page load only, and skipped if the CSS fallback already revealed it.
          const hero = all("[data-hero]");
          const photo = all("[data-hero-photo] img");
          const cta = all("[data-hero-cta]");
          // The CSS fallback fires 1.2s after first paint; past that point it has (or is about to) reveal.
          if (!window.__introDone && performance.now() < 1150) {
            window.__introDone = true;
            // Inner pages have no CTA group or hero photo: only animate what exists.
            const tl = gsap.timeline({ defaults: { ease: EASE } });
            if (hero.length) {
              gsap.set(hero, { autoAlpha: 0, y: 12 });
              tl.to(hero, { autoAlpha: 1, y: 0, duration: 0.7, stagger: 0.09 }, 0.1);
            }
            if (cta.length) {
              gsap.set(cta, { y: 8, scale: 0.98 });
              tl.to(cta, { y: 0, scale: 1, duration: 0.6 }, 0.15);
            }
            if (photo.length) {
              gsap.set(photo, { scale: 1.03 });
              tl.to(photo, { scale: 1, duration: 1.2, ease: "power1.out" }, 0);
            }
            html.classList.add("motion-ready");
          } else {
            window.__introDone = true;
            html.classList.add("motion-ready");
          }

          // Scroll reveals use an IntersectionObserver rather than one ScrollTrigger per element: no
          // per-element layout reads during setup, which kept GSAP's setup off the main thread on phones.
          // An element already on screen when this runs is left alone, so nothing visible disappears.
          type Item = { hide?: () => void; play: () => void; playIfVisible?: boolean };
          const items = new Map<Element, Item>();
          const classified = new Set<Element>();
          const io = new IntersectionObserver((entries) => {
            for (const { target, isIntersecting } of entries) {
              const item = items.get(target);
              if (!item) continue;
              if (!classified.has(target)) {
                classified.add(target);
                if (isIntersecting) {
                  io.unobserve(target);
                  if (item.playIfVisible) ctx.add(item.play);
                } else if (item.hide) ctx.add(item.hide);
              } else if (isIntersecting) {
                io.unobserve(target);
                ctx.add(item.play);
              }
            }
          });
          const watch = (el: Element, item: Item) => {
            items.set(el, item);
            io.observe(el);
          };

          all("[data-reveal]").forEach((el) =>
            watch(el, {
              hide: () => gsap.set(el, { autoAlpha: 0, y: 16 }),
              play: () => gsap.to(el, { autoAlpha: 1, y: 0, duration: 0.8, ease: EASE }),
            }),
          );

          all("[data-stagger]").forEach((group) =>
            watch(group, {
              hide: () => gsap.set(group.children, { autoAlpha: 0, y: 16 }),
              play: () => gsap.to(group.children, { autoAlpha: 1, y: 0, duration: 0.7, ease: EASE, stagger: 0.06 }),
            }),
          );

          const cleanups: (() => void)[] = [() => io.disconnect()];
          all("[data-count]").forEach((el) => {
            const final = el.textContent ?? "";
            const value = parseFloat(final);
            const decimals = final.split(".")[1]?.length ?? 0;
            // Screen readers get the real value, never the in-between numbers.
            const sr = document.createElement("span");
            sr.className = "sr-only";
            sr.textContent = final;
            el.after(sr);
            el.setAttribute("aria-hidden", "true");
            // Start from the smallest number with the same digit count (202 counts from 100), so with
            // tabular figures the width never changes and nothing beside it shifts.
            const digits = Math.floor(value).toString().length;
            const n = { v: value >= 10 ? 10 ** (digits - 1) : 0 };
            // DM Sans' digits are not all the same width, so pin the number to its final width while it
            // counts (in-between values may overhang slightly) — neighbouring text never moves.
            const release = () => {
              el.style.removeProperty("display");
              el.style.removeProperty("width");
            };
            watch(el, {
              playIfVisible: true,
              play: () => {
                const width = el.getBoundingClientRect().width;
                if (getComputedStyle(el).display === "inline") el.style.display = "inline-block";
                el.style.width = `${width}px`;
                gsap.to(n, {
                  v: value,
                  duration: 1.2,
                  ease: "power1.out",
                  onUpdate: () => {
                    el.textContent = n.v.toFixed(decimals);
                  },
                  onComplete: () => {
                    el.textContent = final;
                    release();
                  },
                });
              },
            });
            cleanups.push(() => {
              release();
              el.textContent = final;
              el.removeAttribute("aria-hidden");
              sr.remove();
            });
          });

          // Parallax needs scroll-linked scrubbing, so ScrollTrigger is used here only — and only
          // downloaded on screens ≥768px. Phones never load or run it.
          const frames = wide ? all("[data-parallax]") : [];
          if (frames.length) {
            let cancelled = false;
            cleanups.push(() => (cancelled = true));
            import("gsap/ScrollTrigger").then(({ ScrollTrigger }) => {
              if (cancelled) return;
              gsap.registerPlugin(ScrollTrigger);
              ctx.add(() =>
                frames.forEach((frame) => {
                  const img = frame.querySelector("img");
                  if (!img) return;
                  gsap.fromTo(
                    img,
                    { yPercent: -3, scale: 1.08 },
                    {
                      yPercent: 3,
                      scale: 1.08,
                      ease: "none",
                      scrollTrigger: { trigger: frame, start: "top bottom", end: "bottom top", scrub: 0.6 },
                    },
                  );
                }),
              );
            });
          }

          return () => cleanups.forEach((fn) => fn());
        },
      );

      return () => mm.revert();
    },
    { dependencies: [pathname], revertOnUpdate: true },
  );

  return null;
}

declare global {
  interface Window {
    __introDone?: boolean;
  }
}
