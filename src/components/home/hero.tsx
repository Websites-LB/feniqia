import Image from "next/image";
import Link from "next/link";

import { Lamp } from "@/components/home/lamp";
import { Logo, Ship } from "@/components/site/logo";
import { IMG } from "@/lib/site";

/** Plays once on arrival: the mark on cedar, then the curtain lifts. Pure CSS, so it never blocks the page. */
export function Curtain() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-[80] flex items-center justify-center bg-cedar animate-[curtain_1.1s_var(--ease-silk)_1.6s_forwards]">
      <Logo title={null} className="w-[220px] text-sand animate-[logo-in_1.9s_ease_both] md:w-[300px]" />
    </div>
  );
}

const after = (s: number) => ({ animationDelay: `${1.9 + s}s` });

export function Hero() {
  return (
    <section id="top" className="relative h-[100svh] min-h-[660px] overflow-hidden bg-cedar">
      <div className="absolute inset-[-8%_0]" data-parallax="0.22">
        <Image
          src={IMG.souk}
          alt="A lane of the Byblos Old Souk at dusk, lanterns lit over the shopfronts"
          fill
          priority
          fetchPriority="high"
          sizes="100vw"
          className="animate-[kenburns_10s_var(--ease-silk)_both] object-cover"
        />
      </div>
      <div className="scrim absolute inset-0" />
      <Lamp className="pointer-events-none absolute inset-0 overflow-hidden mix-blend-screen" />

      <div className="relative flex h-full flex-col items-center justify-center px-4 pb-24 pt-16 text-center">
        <p className="label text-brass animate-[fade_1.2s_ease_both]" style={after(0)}>
          In the Old Souk of Byblos
        </p>
        <h1 className="display mt-4 text-[clamp(4.5rem,17vw,15rem)] leading-[0.86] text-sand">
          <span className="line-mask">
            <span style={after(0.05)}>Feniqia</span>
          </span>
        </h1>
        <p className="mt-5 font-display text-[clamp(1.6rem,3.2vw,2.75rem)] leading-tight text-sand/90">
          <span className="line-mask">
            <span style={after(0.22)}>History in a plate</span>
          </span>
        </p>
        <p className="mt-6 max-w-[40ch] text-[1.0625rem] font-light leading-relaxed text-sand/75 animate-[fade_1.4s_ease_both]" style={after(0.5)}>
          Mezze, pans bil makle and the grill, served in the stone lanes of the oldest harbour on the coast.
        </p>
        <div className="mt-10 flex flex-wrap justify-center gap-3 animate-[fade_1.4s_ease_both]" style={after(0.7)}>
          <Link href="#book" className="btn btn-brass">
            Book a table
          </Link>
          <Link href="/menu" className="btn btn-line">
            See the menu
          </Link>
        </div>
      </div>

      {/* the galley: sails in on arrival, rides the swell, and your scroll carries it out of the harbour */}
      <div className="pointer-events-none absolute inset-x-0 bottom-[84px] md:bottom-[92px]" aria-hidden>
        <div className="h-px w-full bg-gradient-to-r from-transparent via-brass-deep/60 to-transparent" />
        <div className="absolute bottom-0 left-[6vw]" data-sail>
          <div className="animate-[sail-in_3.2s_var(--ease-silk)_both]" style={after(0.4)}>
            <div className="animate-[bob_4.5s_ease-in-out_infinite] text-brass">
              <Ship className="w-[84px] translate-y-[38%] md:w-[112px]" />
            </div>
          </div>
        </div>
      </div>

      <div className="absolute inset-x-0 bottom-0 animate-[fade_1.4s_ease_both]" style={after(1)}>
        <div className="wrap flex items-end justify-between pb-6 label text-stone">
          <span className="hidden items-center gap-3 md:flex">
            <span className="glyph text-xl text-brass" lang="phn">
              𐤂𐤁𐤋
            </span>
            Gebal, the city&apos;s first name
          </span>
          <span className="relative mx-auto block h-12 w-px overflow-hidden bg-sand/20 md:mx-0" aria-hidden>
            <span className="absolute inset-x-0 top-0 h-1/2 animate-[cue_2.4s_ease-in-out_infinite] bg-brass" />
          </span>
          <span className="hidden md:block">Open every day</span>
        </div>
      </div>
    </section>
  );
}
