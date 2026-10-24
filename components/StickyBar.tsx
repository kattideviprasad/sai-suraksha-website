import { TEL_HREF, waLink } from "@/lib/site";

// Phones only (below 760px), as in the design. The spacer keeps the footer clear of the bar.
export function StickyBar() {
  return (
    <div className="min-[760px]:hidden">
      <div aria-hidden="true" className="h-[88px] bg-white" />
      <div className="fixed inset-x-0 bottom-0 z-60 flex justify-center bg-forest px-4 pt-3 pb-[calc(12px+env(safe-area-inset-bottom))]">
        <div className="flex w-full max-w-[640px] gap-2.5">
          <a
            href={waLink()}
            target="_blank"
            rel="noopener"
            className="flex min-h-14 flex-1 items-center justify-center rounded-[40px] bg-coral text-xl font-bold text-forest no-underline hover:text-forest"
          >
            WhatsApp
          </a>
          <a
            href={TEL_HREF}
            className="flex min-h-14 flex-1 items-center justify-center rounded-[40px] border border-white text-xl font-semibold text-white no-underline hover:text-white"
          >
            Call
          </a>
        </div>
      </div>
    </div>
  );
}
