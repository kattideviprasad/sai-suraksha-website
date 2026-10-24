import type { Metadata, Viewport } from "next";
import { DM_Sans } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { BookVisitBand } from "@/components/BookVisitBand";
import { StickyBar } from "@/components/StickyBar";
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
    <html lang="en-IN" className={dmSans.variable}>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(clinicJsonLd()).replace(/</g, "\\u003c") }}
        />
        <div className="flex min-h-screen flex-col">
          <Header />
          <main className="flex-1">{children}</main>
          <BookVisitBand />
          <Footer />
          <StickyBar />
        </div>
      </body>
    </html>
  );
}
