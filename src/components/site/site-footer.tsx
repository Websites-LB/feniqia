import Link from "next/link";

import { BackToTop } from "@/components/site/back-to-top";
import { Seal } from "@/components/site/logo";
import { SITE, mapsUrl, waLink } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="relative bg-pome-deep text-paper">
      <div className="wrap flex flex-col items-center pt-24 text-center md:pt-28">
        <Seal className="w-12 text-lantern" />
        <p className="display mt-6 text-[clamp(2.25rem,4vw,3.25rem)] leading-none tracking-[0.28em]">FENIQIA</p>
        <p className="sign mt-3 tracking-[0.32em] text-paper/60">Marchand de Liban</p>

        <div className="mt-16 grid w-full max-w-4xl gap-10 border-t border-paper/15 pt-12 sm:grid-cols-3">
          <div>
            <p className="sign text-lantern">Address</p>
            <p className="mt-3 text-paper/85">
              {SITE.street}, Jbeil (Byblos)
              <br />
              <a className="link-underline text-paper/60 hover:text-paper" href={mapsUrl} target="_blank" rel="noreferrer">
                Get directions
              </a>
            </p>
          </div>
          <div>
            <p className="sign text-lantern">Hours</p>
            <p className="mt-3 text-paper/85">
              {SITE.hours}
              <br />
              <span className="text-paper/60">From breakfast</span>
            </p>
          </div>
          <div>
            <p className="sign text-lantern">Contact</p>
            <p className="mt-3 text-paper/85">
              <a className="link-underline" href={`tel:+${SITE.phone}`}>
                {SITE.phoneDisplay}
              </a>
              <br />
              <a className="link-underline text-paper/60 hover:text-paper" href={waLink("Marhaba Feniqia!")} target="_blank" rel="noreferrer">
                WhatsApp
              </a>
            </p>
          </div>
        </div>

        <div className="mt-14">
          <BackToTop />
        </div>
      </div>

      <div className="wrap mt-16 flex flex-wrap items-center justify-between gap-4 border-t border-paper/15 py-6 text-[0.8rem] text-paper/55">
        <p>© {new Date().getFullYear()} Feniqia, Byblos</p>
        <p className="flex gap-6">
          {[
            ["/menu", "Menu"],
            ["/our-story", "Our story"],
            ["/visit", "Visit"],
            ["/reservations", "Reservations"],
          ].map(([href, label]) => (
            <Link key={href} className="link-underline hover:text-paper" href={href}>
              {label}
            </Link>
          ))}
          <a className="link-underline hover:text-paper" href={SITE.instagram} target="_blank" rel="noreferrer">
            Instagram
          </a>
        </p>
        <p>Byblos photography from Unsplash</p>
      </div>
    </footer>
  );
}
