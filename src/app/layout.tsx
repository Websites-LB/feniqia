import type { Metadata, Viewport } from "next";
import { Jost, Marcellus, Noto_Sans_Phoenician } from "next/font/google";

import { ScrollFx } from "@/components/providers/scroll-fx";
import { SmoothScroll } from "@/components/providers/smooth-scroll";
import { ReserveBar } from "@/components/site/reserve-bar";
import { SiteFooter } from "@/components/site/site-footer";
import { SiteHeader } from "@/components/site/site-header";

import "./globals.css";

// Marcellus is cut after Roman inscriptions: the carved-stone voice for a city of carved stone.
const display = Marcellus({ variable: "--font-marcellus", subsets: ["latin", "latin-ext"], weight: "400" });
const sans = Jost({ variable: "--font-jost", subsets: ["latin", "latin-ext"], weight: ["300", "400", "500"] });
// Only the old letters, as ornament.
const phoenician = Noto_Sans_Phoenician({ variable: "--font-phoenician-src", subsets: ["phoenician"], weight: "400", preload: false });

export const metadata: Metadata = {
  title: "Feniqia, Lebanese restaurant in the Old Souk of Byblos",
  description: "History in a plate. Mezze, dishes bil makle, grills and arak in the stone lanes of the Byblos Old Souk. Open daily. Book a table on WhatsApp.",
};

export const viewport: Viewport = {
  themeColor: "#1a120c",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${display.variable} ${sans.variable} ${phoenician.variable}`} suppressHydrationWarning>
      <head>
        {/* reveals hide content only when scripting is there to show it again */}
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
      </head>
      <body className="grain">
        <SmoothScroll>
          <SiteHeader />
          <main>{children}</main>
          <SiteFooter />
          <ReserveBar />
          <ScrollFx />
        </SmoothScroll>
      </body>
    </html>
  );
}
