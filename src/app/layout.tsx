import type { Metadata, Viewport } from "next";
import { Archivo, Fraunces, Noto_Sans_Phoenician } from "next/font/google";

import { ScrollFx } from "@/components/providers/scroll-fx";
import { SmoothScroll } from "@/components/providers/smooth-scroll";
import { SiteFooter } from "@/components/site/site-footer";
import { SiteHeader } from "@/components/site/site-header";

import "./globals.css";

// Fraunces at its light, upright cut: a classical serif with some warmth.
const display = Fraunces({ variable: "--font-fraunces", subsets: ["latin", "latin-ext"], style: ["normal", "italic"], axes: ["SOFT", "WONK", "opsz"] });
// Archivo, narrowed, for wayfinding; at full width for reading.
const sans = Archivo({ variable: "--font-archivo", subsets: ["latin", "latin-ext"], axes: ["wdth"] });
// Only the old letters, as ornament.
const phoenician = Noto_Sans_Phoenician({ variable: "--font-phoenician-src", subsets: ["phoenician"], weight: "400", preload: false });

export const metadata: Metadata = {
  title: "Feniqia, Lebanese restaurant in the Old Souk of Byblos",
  description: "History in a plate. Mezze, dishes bil makle, grills and arak in the stone lanes of the Byblos Old Souk. Open daily. Book a table on WhatsApp.",
};

export const viewport: Viewport = {
  themeColor: "#f6f2ea",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${display.variable} ${sans.variable} ${phoenician.variable}`} suppressHydrationWarning>
      <head>
        {/* reveals hide content only when scripting is there to show it again */}
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
      </head>
      <body>
        <SmoothScroll>
          <SiteHeader />
          <main>{children}</main>
          <SiteFooter />
          <ScrollFx />
        </SmoothScroll>
      </body>
    </html>
  );
}
