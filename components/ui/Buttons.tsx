import { BOOKING_MESSAGE, PHONE_SHORT, TEL_HREF, waLink } from "@/lib/site";

const base =
  "inline-flex min-h-[60px] items-center justify-center rounded-[40px] px-8 py-3.5 text-xl no-underline";

/** The coral primary button. */
export const primaryBtn = `${base} bg-coral font-bold text-forest hover:bg-coral-hover hover:text-forest`;
/** White-outline button on the dark green background. */
export const outlineOnDarkBtn = `${base} border border-white font-medium text-white hover:bg-forest-hover hover:text-white`;

/** Hero / "Book your visit" pair: WhatsApp first (the design's default primary CTA). */
export function BookingButtons() {
  return (
    <div className="flex flex-wrap gap-3">
      <a href={waLink(BOOKING_MESSAGE)} target="_blank" rel="noopener" className={primaryBtn}>
        Book on WhatsApp
      </a>
      <a href={TEL_HREF} className={outlineOnDarkBtn}>
        Call {PHONE_SHORT}
      </a>
    </div>
  );
}
