import Link from "next/link";
import { ADDRESS_FULL, CLINIC_NAME, NAV, PHONE_DISPLAY, TEL_HREF, waLink } from "@/lib/site";
import { Photo } from "@/components/ui/Photo";

export function Footer() {
  return (
    <footer className="border-t border-line bg-white">
      <div className="wrap grid grid-cols-[repeat(auto-fit,minmax(min(100%,230px),1fr))] gap-10 pt-14 pb-10">
        <div className="flex flex-col gap-3.5">
          <Photo name="logo" alt="SAI Suraksha logo" className="h-auto w-[84px]" sizes="84px" />
          <span className="text-xl leading-[1.25] font-bold tracking-tight-1 text-forest">{CLINIC_NAME}</span>
        </div>
        <div className="flex flex-col gap-2.5">
          <span className="text-base font-bold text-violet">Visit</span>
          <address className="text-[17px] leading-[1.55] text-ink not-italic">{ADDRESS_FULL}</address>
        </div>
        <div className="flex flex-col gap-2.5">
          <span className="text-base font-bold text-violet">Contact &amp; hours</span>
          <a href={TEL_HREF} className="text-lg font-semibold text-forest tabular-nums">
            {PHONE_DISPLAY}
          </a>
          <a href={waLink()} target="_blank" rel="noopener" className="text-[17px] text-forest">
            WhatsApp us
          </a>
          <span className="text-[17px] leading-[1.55] text-ink">
            Mon–Sat 9:30 AM–1 PM, 5–9 PM
            <br />
            Sunday closed
          </span>
        </div>
        <nav aria-label="Footer" className="flex flex-col gap-2.5">
          <span className="text-base font-bold text-violet">Pages</span>
          {NAV.map((item) => (
            <Link key={item.href} href={item.href} className="text-[17px] text-forest">
              {item.menuLabel}
            </Link>
          ))}
        </nav>
      </div>
      <div className="wrap flex flex-wrap justify-between gap-x-6 gap-y-2 border-t border-line pt-5 pb-8 text-base text-ink">
        <span>© 2026 {CLINIC_NAME}</span>
        <span>Kompally, Hyderabad, Telangana</span>
      </div>
    </footer>
  );
}
