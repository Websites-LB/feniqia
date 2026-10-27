"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

import { FOOD, WINE, dish, ll } from "@/lib/menu";
import { IMG, OWN } from "@/lib/site";
import { cn } from "@/lib/utils";

const glass = (name: string) => WINE.flatMap((s) => s.pours).find((p) => p.name === name)!;

type Now = { name: string; price: number; unit?: string };

// What left the harbour in the holds, and what it is on the table today. History kept to what is well attested.
const CARGO: { what: string; then: string; now: Now[]; src: string; alt: string }[] = [
  {
    what: "Wine",
    then: "Sealed in clay jars, it sailed from this coast to every harbour of the Mediterranean.",
    now: [
      { name: "Musar Jeune rouge", price: glass("Musar Jeune rouge").glass!, unit: "glass" },
      { name: "Ksara Blanc de Blancs", price: glass("Ksara Blanc de Blancs").glass!, unit: "glass" },
      { name: "Château Musar 2015", price: glass("Château Musar 2015").bottle!, unit: "bottle" },
    ],
    src: OWN.fattouch,
    alt: "A glass of red beside a bowl of fattouch on a sunlit wooden table",
  },
  {
    what: "Olive oil",
    then: "Pressed in the hills behind the town and shipped to Egypt with the cedar.",
    now: [dish("Warak enab"), dish("Loubieh bi zeit"), dish("Hommos")],
    src: OWN.makle,
    alt: "Plates of taboule and warak enab around a sizzling pan",
  },
  {
    what: "Bread",
    then: "Baked flat against the wall of a clay oven, the way this coast has always baked it.",
    now: [dish("Zaatar bil taboune"), dish("Jebne bil taboune"), dish("Arayes kafta")],
    src: OWN.wrap,
    alt: "Hands holding a taouk wrap of grilled chicken in thin bread",
  },
  {
    what: "Salt and the sea",
    then: "Before the ships made it rich, Byblos was a fishing village. The sea fed it first.",
    now: [dish("Kebbet samak"), dish("Grilled calamari"), dish("Grilled octopus")],
    src: IMG.harbour,
    alt: "The old harbour of Byblos and its fishing boats",
  },
];

/**
 * The manifest: four things the Phoenician holds carried, each opening onto what it became on our menu.
 * The photograph beside the list follows the row you are on, by pointer, by keyboard or by scrolling.
 */
export function Cargo() {
  const [active, setActive] = useState(0);
  const rows = useRef<(HTMLLIElement | null)[]>([]);

  // while scrolling, the row crossing the middle of the screen becomes the active one
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(Number((e.target as HTMLElement).dataset.i))),
      { rootMargin: "-48% 0px -48% 0px" },
    );
    rows.current.forEach((r) => r && io.observe(r));
    return () => io.disconnect();
  }, []);

  return (
    <section id="cargo" className="lamp relative py-28 md:py-40">
      <div className="wrap">
        <h2 className="section-title max-w-[18ch]" data-reveal>
          What the ships carried, we still serve
        </h2>

        <div className="mt-14 grid gap-10 md:mt-20 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-20">
          {/* the picture: a band pinned under the header on phones, a tall frame held beside the list on desktop */}
          <div className="sticky top-20 z-[1] lg:top-[12vh] lg:self-start">
            <div className="relative aspect-[4/3] overflow-hidden bg-hold lg:aspect-[4/5]">
              {CARGO.map((c, i) => (
                <Image
                  key={c.what}
                  src={c.src}
                  alt={c.alt}
                  fill
                  sizes="(min-width: 1024px) 38vw, 92vw"
                  className={cn("object-cover transition-[opacity,transform] duration-700 ease-[var(--ease-silk)]", i === active ? "scale-100 opacity-100" : "scale-[1.04] opacity-0")}
                  aria-hidden={i !== active}
                />
              ))}
            </div>
          </div>

          <ol className="relative">
            {CARGO.map((c, i) => {
              const on = i === active;
              return (
                <li
                  key={c.what}
                  ref={(el) => {
                    rows.current[i] = el;
                  }}
                  data-i={i}
                  onPointerEnter={() => setActive(i)}
                  className="py-6 md:py-8"
                >
                  <button type="button" onClick={() => setActive(i)} onFocus={() => setActive(i)} aria-expanded={on} className="group flex w-full items-baseline gap-5 text-left">
                    <span className={cn("block h-2.5 w-2.5 shrink-0 -translate-y-1 transition-colors duration-500", on ? "bg-brass" : "bg-sand/25 group-hover:bg-sand/60")} aria-hidden />
                    <span className={cn("font-display text-[clamp(2.25rem,4.4vw,3.75rem)] leading-none transition-colors duration-500", on ? "text-sand" : "text-stone group-hover:text-sand")}>
                      {c.what}
                    </span>
                  </button>

                  {/* opens under the name, pushing the rows below down */}
                  <div className={cn("grid transition-[grid-template-rows] duration-700 ease-[var(--ease-silk)]", on ? "grid-rows-[1fr]" : "grid-rows-[0fr]")}>
                    <div className="overflow-hidden pl-[calc(0.625rem+1.25rem)]">
                      <p className="max-w-[44ch] pt-4 font-light leading-relaxed text-sand/80">{c.then}</p>
                      <p className="mt-6 label text-brass">On our table now</p>
                      <ul className="mt-2 max-w-md">
                        {c.now.map((n) => (
                          <li key={n.name} className="flex items-baseline justify-between gap-6 py-1.5">
                            <span>
                              {n.name}
                              {n.unit && <span className="text-stone"> · {n.unit}</span>}
                            </span>
                            <span className="font-display text-[1.15rem] text-brass tabular-nums">{ll(n.price)}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>

        <p className="mt-16 max-w-[52ch] font-light leading-relaxed text-sand/80 lg:ml-[calc(5/12*100%+2rem)]" data-reveal>
          The rest of the manifest runs to {FOOD.length} courses, from sabah el kheir to the last arak.{" "}
          <Link href="/menu" className="link-underline text-sand">
            Read the whole menu →
          </Link>
        </p>
      </div>
    </section>
  );
}
