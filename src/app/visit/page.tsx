import type { Metadata } from "next";
import Link from "next/link";

import { PageHeader } from "@/components/site/page-header";
import { SITE, mapsUrl, waLink } from "@/lib/site";

export const metadata: Metadata = {
  title: "Visit, Feniqia, Byblos Old Souk",
  description: "Find Feniqia in the Old Souk of Byblos (Jbeil), Lebanon. Open daily from breakfast. Telephone and WhatsApp.",
};

export default function Visit() {
  return (
    <>
      <PageHeader eyebrow="Visit" title="Find us" intro="In the Old Souk of Byblos, a short walk from the Crusader castle and the old harbour." />

      <section className="bg-paper pb-28 md:pb-40">
        <div className="wrap grid gap-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.6fr)] lg:gap-20">
          <dl className="grid content-start gap-10" data-reveal>
            <div className="border-t border-line pt-6">
              <dt className="sign text-ink-soft">Address</dt>
              <dd className="display mt-3 text-[1.6rem] leading-snug">
                {SITE.street}
                <br />
                {SITE.town}
              </dd>
              <dd className="mt-4">
                <a className="more" href={mapsUrl} target="_blank" rel="noreferrer">
                  Get directions
                </a>
              </dd>
            </div>
            <div className="border-t border-line pt-6">
              <dt className="sign text-ink-soft">Hours</dt>
              <dd className="display mt-3 text-[1.6rem] leading-snug">{SITE.hours}, from breakfast</dd>
            </div>
            <div className="border-t border-line pt-6">
              <dt className="sign text-ink-soft">Contact</dt>
              <dd className="display mt-3 text-[1.6rem] leading-snug">
                <a className="link-underline" href={`tel:+${SITE.phone}`}>
                  {SITE.phoneDisplay}
                </a>
              </dd>
              <dd className="mt-2 text-ink-soft">
                WhatsApp{" "}
                <a className="link-underline text-ink" href={waLink("Marhaba Feniqia!")} target="_blank" rel="noreferrer">
                  {SITE.whatsappDisplay}
                </a>
              </dd>
            </div>
            <div>
              <Link href="/reservations" className="btn btn-pome">
                Reserve a table
              </Link>
            </div>
          </dl>

          <div className="relative min-h-[420px] overflow-hidden bg-dust lg:min-h-[640px]" data-reveal="clip">
            <iframe
              title="Feniqia on the map, in the Old Souk of Byblos"
              src={`https://www.google.com/maps?q=${encodeURIComponent(SITE.mapsQuery)}&output=embed`}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="absolute inset-0 h-full w-full border-0 [filter:grayscale(1)_contrast(0.95)_brightness(1.02)]"
            />
          </div>
        </div>
      </section>
    </>
  );
}
