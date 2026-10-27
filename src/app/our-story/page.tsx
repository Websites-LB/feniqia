import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { PageHeader } from "@/components/site/page-header";
import { IMG, OWN } from "@/lib/site";

export const metadata: Metadata = {
  title: "Our story, Feniqia, Byblos Old Souk",
  description: "Feniqia takes its name from the Phoenicians of Byblos and keeps a Lebanese table in the stone lanes of the Old Souk.",
};

// History kept to what is well attested.
const CHAPTERS = [
  {
    title: "The name",
    text: "Feniqia is Phoenicia. Byblos, Gebal to its own people, was one of the great Phoenician ports, sending cedar, wine and oil across the Mediterranean. The oldest Phoenician inscriptions, ancestors of the Greek, Latin and Arabic alphabets, were found here.",
    src: IMG.ruins,
    alt: "The excavated foundations of ancient Byblos running down to the sea",
  },
  {
    title: "The souk",
    text: "We keep our tables in the Old Souk, among stone lanes that lead up to the Crusader castle and down towards the harbour. Wooden tables, red cushions and the copper sign on the wall: that is how you will know us.",
    src: OWN.terrace,
    alt: "A wooden table laid for two on the terrace, red cushions and the Feniqia napkin holder",
  },
  {
    title: "The table",
    text: "Breakfast from the taboune, mezze for sharing, dishes brought sizzling in the pan, the grill, and arak poured over ice. Lebanese hospitality, every day of the week.",
    src: OWN.pans,
    alt: "A hanging iron tray of small pans of soujouk, mkanek and batata harra",
  },
];

export default function OurStory() {
  return (
    <>
      <PageHeader
        eyebrow="Our story"
        title="Marchand de Liban"
        intro="A Lebanese restaurant named for the merchants who sailed from this coast, in one of the oldest continuously inhabited cities in the world."
        image={{ src: IMG.souk, alt: "A lane of the Byblos Old Souk at dusk" }}
      />

      <div className="bg-paper py-28 md:py-40">
        <div className="wrap grid gap-28 md:gap-40">
          {CHAPTERS.map((c, i) => (
            <section key={c.title} className="grid items-center gap-12 lg:grid-cols-2 lg:gap-28">
              <div className={i % 2 ? "lg:order-2" : ""}>
                <div className="relative aspect-[4/5] overflow-hidden bg-dust" data-reveal="clip">
                  <div className="absolute inset-[-8%_0]" data-parallax="0.1">
                    <Image src={c.src} alt={c.alt} fill sizes="(min-width: 1024px) 45vw, 92vw" className="object-cover" />
                  </div>
                </div>
              </div>
              <div className="lg:max-w-md">
                <p className="sign text-pome" data-reveal>
                  {String(i + 1).padStart(2, "0")}
                </p>
                <h2 className="title mt-5" data-reveal>
                  {c.title}
                </h2>
                <p className="lede mt-6" data-reveal data-delay="0.1">
                  {c.text}
                </p>
              </div>
            </section>
          ))}
        </div>
      </div>

      <section className="bg-lime py-28 text-center md:py-36">
        <div className="wrap">
          <h2 className="title" data-reveal>
            Come and see us
          </h2>
          <div className="mt-10 flex flex-wrap justify-center gap-3" data-reveal data-delay="0.1">
            <Link href="/reservations" className="btn btn-pome">
              Reserve a table
            </Link>
            <Link href="/visit" className="btn btn-ink">
              How to find us
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
