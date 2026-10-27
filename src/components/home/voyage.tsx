import Image from "next/image";

import { Ship } from "@/components/site/logo";
import { IMG, OWN } from "@/lib/site";

type Chapter = { letter: string; when: string; title: string; text: string; art: { src: string; alt: string; tall?: boolean } | "ship" | "letters" };

// Numbered the way Byblos would have numbered them: aleph, bet, gimel, dalet, he, waw.
const CHAPTERS: Chapter[] = [
  {
    letter: "𐤀",
    when: "Around 5000 BC",
    title: "A village above the bay",
    text: "Byblos is counted among the oldest cities that have never been left empty. It began as fishermen's huts on the headland over a small, sheltered bay.",
    art: { src: IMG.temple, alt: "The columns of the ancient city on the headland, the sea behind them" },
  },
  {
    letter: "𐤁",
    when: "Around 2600 BC",
    title: "Cedar for the pharaohs",
    text: "From this harbour, ships carried the cedar of Mount Lebanon to Egypt. The city, then called Gebal, grew rich as a port of merchants.",
    art: "ship",
  },
  {
    letter: "𐤂",
    when: "Around 1000 BC",
    title: "The alphabet",
    text: "The tomb of King Ahiram, found here, carries one of the oldest inscriptions in the Phoenician alphabet, ancestor of the letters you are reading now.",
    art: "letters",
  },
  {
    letter: "𐤃",
    when: "The Greek centuries",
    title: "A city named for paper",
    text: "Greek traders bought Egyptian papyrus here and named the town for it: byblos. The same word later gave us the Bible.",
    art: { src: IMG.ruins, alt: "The excavated ruins of Byblos running down to the sea" },
  },
  {
    letter: "𐤄",
    when: "The 1100s",
    title: "The Crusader castle",
    text: "Crusaders raised the castle from the old city's stones. Its walls still stand over the souk, a short walk from our tables.",
    art: { src: OWN.castle, alt: "The Crusader castle of Byblos seen through olive leaves", tall: true },
  },
  {
    letter: "𐤅",
    when: "Today",
    title: "The Old Souk",
    text: "Lanterns, stone arches, and the merchants still at their doors. Feniqia sets its tables among them, and keeps the bread warm.",
    art: { src: OWN.dusk, alt: "The Old Souk and its gardens at dusk, lit from within", tall: true },
  },
];

const BOX = "aspect-[4/3] lg:aspect-auto lg:h-[min(46svh,30rem)]";

function Art({ art }: { art: Chapter["art"] }) {
  if (art === "ship") {
    return (
      <div className={`flex items-center justify-center bg-hold text-brass ${BOX}`}>
        <Ship className="w-3/5 animate-[bob_5s_ease-in-out_infinite]" />
      </div>
    );
  }
  if (art === "letters") {
    return (
      <div className={`flex items-center justify-center bg-murex-deep ${BOX}`} lang="phn">
        <span className="glyph text-[clamp(4rem,8vw,7rem)] tracking-[0.15em] text-brass" aria-hidden>
          𐤀𐤁𐤂𐤃
        </span>
      </div>
    );
  }
  return (
    <div className={`relative overflow-hidden bg-hold ${art.tall ? "aspect-[4/5] lg:aspect-auto lg:h-[min(46svh,30rem)]" : BOX}`}>
      {/* eager: the track slides in sideways, which native lazy-loading notices too late */}
      <Image src={art.src} alt={art.alt} fill loading="eager" sizes="(min-width: 1024px) 34vw, 92vw" className="object-cover" />
    </div>
  );
}

/** Seven thousand years told sideways: the section pins and the chapters slide past on desktop; on phones they simply stack. */
export function Voyage() {
  return (
    <section id="voyage" className="lamp-murex relative overflow-hidden motion-reduce:lg:overflow-x-auto">
      <div data-voyage className="flex flex-col gap-20 py-28 lg:h-[100svh] lg:w-max lg:flex-row lg:items-center lg:gap-[6vw] lg:py-0 lg:pl-[max(3rem,calc((100vw-1440px)/2+3rem))] lg:pr-[12vw]">
        <div className="wrap lg:!m-0 lg:w-[30vw] lg:max-w-[440px] lg:!p-0">
          <h2 className="section-title" data-reveal>
            Seven thousand years to this table
          </h2>
          <p className="lede mt-6" data-reveal data-delay="0.1">
            Byblos was a port of merchants long before it was a town of restaurants. Feniqia takes its name from the Phoenicians, and its tagline from them too: marchand de Liban.
          </p>
          <p className="mt-8 hidden items-center gap-3 label text-stone lg:flex" aria-hidden>
            Keep scrolling <span className="text-brass">→</span>
          </p>
        </div>

        {CHAPTERS.map((c) => (
          <article key={c.letter} className="wrap !max-w-[40rem] lg:!m-0 lg:!max-w-[520px] lg:w-[34vw] lg:!p-0">
            <Art art={c.art} />
            <div className="mt-6 flex items-baseline gap-5 border-t border-brass-deep/50 pt-5">
              <span className="glyph w-10 shrink-0 text-[2.5rem] text-brass" lang="phn" aria-hidden>
                {c.letter}
              </span>
              <div>
                <p className="label text-stone">{c.when}</p>
                <h3 className="mt-1 text-[clamp(1.6rem,2.2vw,2.1rem)] leading-tight">{c.title}</h3>
                <p className="mt-3 max-w-[44ch] font-light leading-relaxed text-sand/75">{c.text}</p>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
