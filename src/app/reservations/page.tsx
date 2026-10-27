import type { Metadata } from "next";
import Image from "next/image";

import { ReserveForm } from "@/components/home/reserve-form";
import { PageHeader } from "@/components/site/page-header";
import { OWN, SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Reservations, Feniqia, Byblos Old Souk",
  description: "Request a table at Feniqia in the Old Souk of Byblos. We confirm on WhatsApp.",
};

export default function Reservations() {
  return (
    <>
      <PageHeader eyebrow="Reservations" title="Reserve a table" intro="Choose a date and time and we will confirm your table on WhatsApp." />

      <section className="bg-paper pb-28 md:pb-40">
        <div className="wrap grid gap-16 lg:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)] lg:gap-20">
          <div className="border border-line bg-paper p-6 md:p-12" data-reveal>
            <ReserveForm />
          </div>

          <aside className="grid content-start gap-10" data-reveal data-delay="0.1">
            <div className="relative aspect-[4/3] overflow-hidden bg-dust">
              <Image src={OWN.terrace} alt="A wooden table laid for two on the terrace" fill sizes="(min-width: 1024px) 32vw, 92vw" className="object-cover" />
            </div>
            <div className="border-t border-line pt-6">
              <p className="sign text-ink-soft">Groups and events</p>
              <p className="mt-3 text-ink-soft">For nine guests or more, please call us and we will arrange the table.</p>
            </div>
            <div className="border-t border-line pt-6">
              <p className="sign text-ink-soft">By telephone</p>
              <p className="display mt-3 text-[1.6rem]">
                <a className="link-underline" href={`tel:+${SITE.phone}`}>
                  {SITE.phoneDisplay}
                </a>
              </p>
            </div>
            <div className="border-t border-line pt-6">
              <p className="sign text-ink-soft">Hours</p>
              <p className="mt-3 text-ink-soft">{SITE.hours}, from breakfast</p>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
