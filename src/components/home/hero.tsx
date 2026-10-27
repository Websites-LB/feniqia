"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

import { IMG } from "@/lib/site";
import { cn } from "@/lib/utils";

const SLIDES = [
  { src: IMG.souk, alt: "A lane of the Byblos Old Souk at dusk, lanterns lit over the shopfronts" },
  { src: IMG.castle, alt: "The Crusader castle of Byblos on its green mound" },
  { src: IMG.harbour, alt: "The old harbour of Byblos and its small boats" },
  { src: IMG.temple, alt: "The Roman columns on the headland, the sea behind" },
];

const HOLD = 6000;
const NAME = "FENIQIA";

/** A full-screen photograph that turns on its own, the name rising letter by letter over it. */
export function Hero() {
  const [active, setActive] = useState(0);
  const [playing, setPlaying] = useState(true);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) setPlaying(false);
  }, []);

  useEffect(() => {
    if (!playing) return;
    const t = setTimeout(() => !document.hidden && setActive((a) => (a + 1) % SLIDES.length), HOLD);
    return () => clearTimeout(t);
  }, [active, playing]);

  return (
    <section className="relative h-[100svh] min-h-[600px] overflow-hidden bg-ink text-paper">
      {SLIDES.map((s, i) => (
        <div key={s.src} className={cn("absolute inset-0 transition-opacity duration-[1800ms] ease-in-out", i === active ? "z-[1] opacity-100" : "opacity-0")} aria-hidden={i !== active}>
          <div className={cn("absolute inset-0", i === active && "animate-[settle_8s_linear_both]")}>
            <Image src={s.src} alt={s.alt} fill priority={i === 0} loading={i === 0 ? undefined : "eager"} sizes="100vw" className="object-cover" />
          </div>
        </div>
      ))}
      <div className="absolute inset-0 z-[2] bg-[linear-gradient(to_bottom,oklch(0.15_0.01_50/0.55),oklch(0.15_0.01_50/0.25)_35%,oklch(0.15_0.01_50/0.6))]" aria-hidden />

      <div className="relative z-[3] flex h-full flex-col items-center justify-center px-5 text-center">
        <p className="sign animate-[fade_1.2s_ease_both] text-paper/80" style={{ animationDelay: "0.4s" }}>
          Old Souk · Byblos · Lebanon
        </p>
        <h1 className="mt-6">
          <span className="sr-only">Feniqia, Lebanese restaurant in the Old Souk of Byblos</span>
          <span className="display flex overflow-hidden text-[clamp(3.5rem,13vw,11rem)] leading-[0.9] tracking-[0.12em]" aria-hidden>
            {NAME.split("").map((c, i) => (
              <span key={i} className="inline-block animate-[rise_1.3s_var(--ease-silk)_both]" style={{ animationDelay: `${0.25 + i * 0.07}s` }}>
                {c}
              </span>
            ))}
          </span>
        </h1>
        <p className="display mt-6 max-w-[30ch] animate-[fade_1.4s_ease_both] text-[clamp(1.15rem,1.7vw,1.5rem)] text-paper/90" style={{ animationDelay: "0.9s" }}>
          Lebanese cuisine in the heart of the Old Souk
        </p>
        <div className="mt-10 flex animate-[fade_1.4s_ease_both] flex-wrap justify-center gap-3" style={{ animationDelay: "1.1s" }}>
          <Link href="/reservations" className="btn btn-paper">
            Reserve a table
          </Link>
          <Link href="/menu" className="btn btn-light">
            View the menu
          </Link>
        </div>
      </div>

      {/* which photograph, and how long until the next */}
      <div className="absolute inset-x-0 bottom-8 z-[3] flex items-center justify-center gap-3">
        {SLIDES.map((s, i) => (
          <button key={s.src} type="button" onClick={() => setActive(i)} aria-label={`Show photograph ${i + 1}`} aria-current={i === active} className="group flex h-11 items-center">
            <span className="relative block h-px w-10 overflow-hidden bg-paper/35 md:w-14">
              {i === active && <span key={active} className="absolute inset-0 origin-left bg-paper" style={{ animation: playing ? `grow ${HOLD}ms linear both` : "none" }} />}
            </span>
          </button>
        ))}
        <button type="button" onClick={() => setPlaying((p) => !p)} className="sign ml-3 min-h-11 text-paper/70 hover:text-paper">
          {playing ? "Pause" : "Play"}
        </button>
      </div>
    </section>
  );
}
