import Link from "next/link";

import { BackToTop } from "@/components/site/back-to-top";
import { Seal, Ship } from "@/components/site/logo";
import { SITE, mapsUrl, waLink } from "@/lib/site";

/** One field of murex purple, and the way to reach us as the headline: the number itself. */
export function SiteFooter() {
  return (
    <footer className="relative flex min-h-[92svh] flex-col overflow-hidden bg-murex-deep text-sand">
      <div className="wrap flex flex-wrap items-start justify-between gap-x-12 gap-y-8 pt-12 md:pt-16">
        <div className="grid gap-x-12 gap-y-6 label sm:grid-cols-3" data-reveal>
          <p className="flex items-start gap-3">
            <Seal className="w-9 shrink-0 text-brass" />
            <span>
              Feniqia
              <span className="block text-sand/75">Marchand de Liban</span>
            </span>
          </p>
          <p>
            {SITE.street}, Jbeil
            <br />
            <a className="link-underline text-sand/75 hover:text-sand" href={mapsUrl} target="_blank" rel="noreferrer">
              Directions
            </a>
          </p>
          <p>
            Open every day
            <br />
            <span className="text-sand/75">From breakfast on</span>
          </p>
        </div>
        <BackToTop />
      </div>

      <div className="wrap mt-auto pb-10 pt-24">
        <div className="flex items-end justify-between gap-6" data-reveal>
          <p className="label text-sand/75">To book, call</p>
          <Ship className="w-16 animate-[bob_5s_ease-in-out_infinite] text-brass md:w-24" />
        </div>
        <a
          href={`tel:+${SITE.phone}`}
          className="display mt-3 block whitespace-nowrap text-[clamp(2.6rem,11.6vw,12rem)] leading-[0.9] text-sand transition-colors duration-500 hover:text-brass"
          data-reveal
          data-delay="0.08"
        >
          {SITE.phoneDisplay}
        </a>

        <div className="mt-12 grid gap-3 label text-sand/75 md:grid-cols-3 md:items-center">
          <p className="flex flex-wrap gap-x-5">
            <a className="link-underline hover:text-sand" href={waLink("Marhaba Feniqia!")} target="_blank" rel="noreferrer">
              WhatsApp
            </a>
            <a className="link-underline hover:text-sand" href={SITE.instagram} target="_blank" rel="noreferrer">
              Instagram
            </a>
            <Link className="link-underline hover:text-sand" href="/menu">
              The menu
            </Link>
          </p>
          <p className="md:text-center">Byblos photography from Unsplash</p>
          <p className="md:text-right">Byblos, {new Date().getFullYear()}</p>
        </div>
      </div>
    </footer>
  );
}
