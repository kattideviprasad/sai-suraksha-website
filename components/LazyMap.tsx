"use client";

import { useEffect, useRef, useState } from "react";

// Chrome's native iframe lazy-loading starts very early on slow connections, pulling ~450 KB of
// Google Maps scripts while the visitor is still at the top of the page. Mount the embed only
// once its (same-sized) placeholder is about to scroll into view.
export function LazyMap({ src, title }: { src: string; title: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShow(true);
          io.disconnect();
        }
      },
      { rootMargin: "400px 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref} className="h-[420px] w-full overflow-hidden rounded-3xl bg-placeholder">
      {show && (
        <iframe
          title={title}
          src={src}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="block h-full w-full border-0"
        />
      )}
    </div>
  );
}
