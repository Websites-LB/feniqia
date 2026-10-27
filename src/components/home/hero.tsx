"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

import { IMG } from "@/lib/site";
import { cn } from "@/lib/utils";

// Byblos is a tell: each age built on the one before. The hero passes down through them on its own.
const LAYERS = [
  { when: "Today", what: "The Old Souk", src: IMG.souk, alt: "A lane of the Byblos Old Souk at dusk, lanterns lit over the shopfronts" },
  { when: "1100s", what: "The Crusader castle", src: IMG.castle, alt: "The Crusader castle of Byblos on its green mound" },
  { when: "Roman Byblos", what: "The colonnade", src: IMG.temple, alt: "The standing Roman columns on the headland, the sea behind" },
  { when: "2600 BC", what: "The cedar harbour", src: IMG.harbour, alt: "The old harbour of Byblos and its small boats" },
  { when: "5000 BC", what: "The first village", src: IMG.ruins, alt: "The excavated foundations of the ancient city running to the sea" },
];

const HOLD = 5000;
const NAME = "Feniqia";

export function Hero() {
  const [active, setActive] = useState(0);
  const [prev, setPrev] = useState(-1);
  const [playing, setPlaying] = useState(true);
  // bumps on every change so the gauge's timer bar restarts from empty
  const [cycle, setCycle] = useState(0);

  const go = (i: number) => {
    if (i !== active) {
      setPrev(active);
      setActive(i);
    }
    setCycle((c) => c + 1);
  };

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) setPlaying(false);
  }, []);

  useEffect(() => {
    if (!playing) return;
    // a timeout per frame, not an interval, so a click on the gauge gives the new age its full five seconds
    const t = setTimeout(() => {
      // a hidden tab just waits another round
      if (!document.hidden) {
        setPrev(active);
        setActive((active + 1) % LAYERS.length);
      }
      setCycle((c) => c + 1);
    }, HOLD);
    return () => clearTimeout(t);
  }, [active, cycle, playing]);

  const now = LAYERS[active];

  return (
    <section id="top" className="relative h-[100svh] min-h-[600px] overflow-hidden bg-cedar">
      {LAYERS.map((l, i) => (
        <div
          key={l.when}
          className={cn("absolute inset-0 transition-opacity duration-[1600ms] ease-in-out", i === active ? "z-[1] opacity-100" : "opacity-0")}
          aria-hidden={i !== active}
        >
          <div className={cn("absolute inset-0", (i === active || i === prev) && "animate-[settle_7s_linear_both]")}>
            <Image
              src={l.src}
              alt={l.alt}
              fill
              priority={i === 0}
              fetchPriority={i === 0 ? "high" : undefined}
              loading={i === 0 ? undefined : "eager"}
              sizes="100vw"
              className="object-cover"
            />
          </div>
        </div>
      ))}

      {/* a neutral scrim under the type only: the head of the frame, its foot, and the gauge's edge */}
      <div className="absolute inset-0 z-[2]" aria-hidden>
        <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-cedar/70 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-[62%] bg-gradient-to-t from-cedar via-cedar/60 to-transparent" />
        <div className="absolute inset-y-0 right-0 hidden w-[30%] bg-gradient-to-l from-cedar/75 to-transparent md:block" />
      </div>

      {/* the gauge: where in time the picture stands; each age can be picked */}
      <div className="absolute right-4 top-1/2 z-[3] hidden -translate-y-1/2 md:block md:right-8">
        <ol aria-label="The ages of Byblos, newest first">
          {LAYERS.map((l, i) => (
            <li key={l.when} className="animate-[fade_1s_ease_both]" style={{ animationDelay: `${0.9 + i * 0.08}s` }}>
              <button
                type="button"
                onClick={() => go(i)}
                aria-current={i === active ? "true" : undefined}
                className="group flex min-h-11 w-full items-center justify-end gap-3 py-1.5 text-right"
              >
                <span className={cn("label transition-colors duration-500", i === active ? "text-sand" : "text-stone group-hover:text-sand")}>
                  <span className="block">{l.when}</span>
                  <span className={cn("block font-light transition-opacity duration-500", i === active ? "opacity-100" : "opacity-0")}>{l.what}</span>
                </span>
                <span className="relative block h-9 w-[3px] overflow-hidden bg-sand/25" aria-hidden>
                  {i === active && (
                    <span
                      key={cycle}
                      className="absolute inset-x-0 top-0 h-full origin-top bg-brass"
                      style={{ animation: playing ? `fill ${HOLD}ms linear both` : "none" }}
                    />
                  )}
                </span>
              </button>
            </li>
          ))}
        </ol>
        <button type="button" onClick={() => setPlaying((p) => !p)} className="mt-2 ml-auto block min-h-11 label text-stone transition-colors hover:text-sand">
          {playing ? "Pause" : "Play"}
        </button>
      </div>

      {/* on phones the gauge folds into one line under the letterhead */}
      <button type="button" onClick={() => go((active + 1) % LAYERS.length)} className="absolute left-4 top-24 z-[3] min-h-11 text-left label text-sand md:hidden">
        {now.when}, {now.what.toLowerCase()} <span className="text-brass">→</span>
      </button>

      <div className="absolute inset-x-0 bottom-0 z-[3]">
        <div className="wrap grid items-end gap-6 pb-5 md:grid-cols-[minmax(0,1fr)_auto] md:gap-10 md:pb-6">
          <h1 className="display text-[clamp(5.25rem,18vw,17rem)] leading-[0.78] text-sand">
            <span className="sr-only">Feniqia, Lebanese restaurant in the Old Souk of Byblos</span>
            <span className="flex overflow-hidden pb-[0.04em]" aria-hidden>
              {NAME.split("").map((c, i) => (
                <span key={i} className="inline-block animate-[rise_1.2s_var(--ease-silk)_both]" style={{ animationDelay: `${0.15 + i * 0.07}s` }}>
                  {c}
                </span>
              ))}
            </span>
          </h1>
          <div className="max-w-[34ch] pb-2 animate-[fade_1.4s_ease_both] md:pb-5 md:text-right" style={{ animationDelay: "0.8s" }}>
            <p className="font-display text-[1.5rem] leading-tight text-sand">History in a plate.</p>
            <p className="mt-2 font-light leading-relaxed text-sand/80">Mezze, pans bil makle and the grill, in the stone lanes of the Byblos Old Souk.</p>
            <div className="mt-5 flex flex-wrap items-center gap-5 md:justify-end">
              <Link href="/menu" className="link-underline label text-sand">
                See the menu →
              </Link>
              <Link href="#book" className="btn btn-brass">
                Book a table
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
