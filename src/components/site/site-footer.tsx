import Image from "next/image";
import Link from "next/link";

import { BackToTop } from "@/components/site/back-to-top";
import { Logo } from "@/components/site/logo";
import { IMG, SITE, mapsUrl, waLink } from "@/lib/site";

/** The last course: an invitation over the harbour, the seal, the details, and a farewell that drifts past. */
export function SiteFooter() {
  return (
    <footer className="relative overflow-hidden bg-cedar pb-16 md:pb-0">
      {/* the invitation */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-[-15%_0]" data-parallax="0.25" aria-hidden>
          <Image src={IMG.harbour} alt="" fill sizes="100vw" className="object-cover" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-cedar via-cedar/70 to-cedar" aria-hidden />

        <div className="wrap relative flex min-h-[85svh] flex-col items-center justify-center py-32 text-center">
          <p className="label text-brass" data-reveal>
            {SITE.street}, Byblos
          </p>
          <h2 className="display mt-6 text-[clamp(3.5rem,10vw,9rem)] leading-[0.92]" data-reveal data-delay="0.08">
            The table
            <br />
            is set
          </h2>
          <p className="mt-6 max-w-[34ch] text-[clamp(1.1rem,1.6vw,1.35rem)] font-light text-sand/80" data-reveal data-delay="0.16">
            Seven thousand years of travellers have eaten in this town. Tonight it is your turn.
          </p>
          <div className="mt-11 flex flex-wrap justify-center gap-3" data-reveal data-delay="0.24">
            <Link href="/#book" className="btn btn-brass">
              Book a table
            </Link>
            <a href={`tel:+${SITE.phone}`} className="btn btn-line">
              Call {SITE.phoneDisplay}
            </a>
          </div>
        </div>
      </div>

      {/* the seal and the details */}
      <div className="wrap relative">
        <div className="grid items-end gap-14 border-t border-brass-deep/50 pt-16 md:pt-20 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-24">
          <div data-reveal>
            <Logo className="w-full max-w-[460px] text-sand" />
          </div>

          <div className="grid gap-10 sm:grid-cols-3" data-reveal data-delay="0.1">
            <div>
              <p className="label text-brass">Find us</p>
              <p className="mt-3 leading-relaxed">
                {SITE.street}
                <br />
                Jbeil, Lebanon
              </p>
              <a className="link-underline mt-2 inline-block label text-stone hover:text-sand" href={mapsUrl} target="_blank" rel="noreferrer">
                Directions
              </a>
            </div>
            <div>
              <p className="label text-brass">Open</p>
              <p className="mt-3 leading-relaxed">
                Every day
                <br />
                From breakfast on
              </p>
            </div>
            <div>
              <p className="label text-brass">Talk to us</p>
              <a className="link-underline mt-3 inline-block" href={`tel:+${SITE.phone}`}>
                {SITE.phoneDisplay}
              </a>
              <br />
              <a className="link-underline inline-block" href={waLink("Marhaba Feniqia!")} target="_blank" rel="noreferrer">
                WhatsApp
              </a>
              <br />
              <a className="link-underline inline-block" href={SITE.instagram} target="_blank" rel="noreferrer">
                Instagram
              </a>
              <br />
              <Link className="link-underline inline-block" href="/menu">
                The menu
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* the farewell */}
      <div className="relative mt-20 select-none overflow-hidden md:mt-28" aria-hidden>
        <div className="flex w-max animate-[drift_45s_linear_infinite] whitespace-nowrap">
          {[0, 1].map((k) => (
            <span key={k} className="display shrink-0 pr-[0.35em] text-[clamp(5.5rem,17vw,15rem)] leading-[0.95] text-transparent [-webkit-text-stroke:1px_var(--color-brass-deep)]">
              Sahtein ✦ صحتين ✦ Sahtein ✦ صحتين ✦
            </span>
          ))}
        </div>
      </div>

      <div className="wrap relative flex flex-col items-start justify-between gap-4 border-t border-rule py-6 label text-stone/80 sm:flex-row sm:items-center">
        <span>© {new Date().getFullYear()} Feniqia, Byblos</span>
        <span>Byblos photography from Unsplash</span>
        <BackToTop />
      </div>
    </footer>
  );
}
