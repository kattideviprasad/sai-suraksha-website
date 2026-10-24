"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { NAV, PHONE_SHORT, TEL_HREF } from "@/lib/site";
import { Photo } from "@/components/ui/Photo";

// The design collapses the nav into a Menu button below 1180px.
export function Header() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const close = () => setMenuOpen(false);
  const active = (href: string) => (pathname === href ? "bg-lavender" : "bg-transparent");

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-white">
      <div className="wrap flex items-center justify-between gap-5 py-3">
        <Link href="/" onClick={close} className="flex min-w-0 items-center gap-3 text-forest no-underline">
          <Photo
            name="logo"
            alt="SAI Suraksha Physiotherapy & Rehabilitation Centre logo"
            className="h-auto w-[clamp(48px,5vw,60px)] flex-none"
            sizes="60px"
          />
          <span className="flex min-w-0 flex-col">
            <span className="text-[21px] leading-[1.15] font-bold tracking-tight-1 text-forest">
              SAI Suraksha
            </span>
            <span className="text-sm leading-[1.3] font-medium text-ink">
              Physiotherapy &amp; Rehabilitation Centre
            </span>
          </span>
        </Link>

        <div className="hidden items-center gap-5 min-[1180px]:flex">
          <nav aria-label="Main" className="flex items-center gap-1">
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                aria-current={pathname === item.href ? "page" : undefined}
                className={`rounded-full px-4 py-2.5 text-[17px] font-medium text-forest no-underline hover:bg-lavender hover:text-forest ${active(item.href)}`}
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <a
            href={TEL_HREF}
            className="inline-flex min-h-12 items-center rounded-[40px] border border-black bg-white px-[22px] py-2.5 text-[17px] font-semibold whitespace-nowrap text-forest no-underline hover:bg-lavender hover:text-forest"
          >
            Call {PHONE_SHORT}
          </a>
        </div>

        <button
          type="button"
          onClick={() => setMenuOpen((o) => !o)}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          className="min-h-12 flex-none rounded-[40px] border border-black bg-white px-[22px] py-2.5 text-[17px] font-semibold text-forest min-[1180px]:hidden"
        >
          {menuOpen ? "Close" : "Menu"}
        </button>
      </div>

      {menuOpen && (
        <nav
          id="mobile-menu"
          aria-label="Main"
          className="flex flex-col gap-1 border-t border-line bg-white px-[clamp(20px,5vw,80px)] pt-2 pb-5 min-[1180px]:hidden"
        >
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={close}
              aria-current={pathname === item.href ? "page" : undefined}
              className={`rounded-2xl px-5 py-4 text-xl font-semibold text-forest no-underline ${active(item.href)}`}
            >
              {item.menuLabel}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
