import type { Metadata, Viewport } from "next";
import { DM_Sans } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { BookVisitBand } from "@/components/BookVisitBand";
import { StickyBar } from "@/components/StickyBar";
import { MotionLoader } from "@/components/MotionLoader";
import { CLINIC_NAME, SITE_URL } from "@/lib/site";
import { clinicJsonLd } from "@/lib/schema";

const dmSans = DM_Sans({
  subsets: ["latin"],
  axes: ["opsz"],
  variable: "--font-dm-sans",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  applicationName: CLINIC_NAME,
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  themeColor: "#0a3922",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    // suppressHydrationWarning: the inline script below adds a class to <html> before React hydrates.
    <html lang="en-IN" className={dmSans.variable} data-scroll-behavior="smooth" suppressHydrationWarning>
      <head>
        {/* Before first paint: mark that hero motion will run (never with reduced motion or JS off). */}
        <script
          dangerouslySetInnerHTML={{
            __html:
              "if(!matchMedia('(prefers-reduced-motion: reduce)').matches)document.documentElement.classList.add('js-motion')",
          }}
        />
      </head>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(clinicJsonLd()).replace(/</g, "\\u003c") }}
        />
        <a
          href="#main"
          // Not focus:not-sr-only: it also resets padding to 0, which overrode px-5 py-3 when focused.
          className="sr-only rounded-full bg-white px-5 py-3 text-lg font-semibold text-forest focus:fixed focus:top-3 focus:left-3 focus:z-[70] focus:m-0 focus:h-auto focus:w-auto focus:overflow-visible focus:whitespace-nowrap focus:[clip-path:none]"
        >
          Skip to content
        </a>
        <div className="flex min-h-screen flex-col">
          <Header />
          <main id="main" className="flex-1">
            {children}
          </main>
          <BookVisitBand />
          <Footer />
          <StickyBar />
        </div>
        <MotionLoader />
      </body>
    </html>
  );
}
