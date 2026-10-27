"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

import { IMG } from "@/lib/site";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

// Byblos is a tell: each age built on the one before. Scrolling digs down through them.
const LAYERS = [
  { when: "Today", what: "The Old Souk", src: IMG.souk, alt: "A lane of the Byblos Old Souk at dusk, lanterns lit over the shopfronts" },
  { when: "1100s", what: "The Crusader castle", src: IMG.castle, alt: "The Crusader castle of Byblos on its green mound" },
  { when: "Roman Byblos", what: "The colonnade", src: IMG.temple, alt: "The standing Roman columns on the headland, the sea behind" },
  { when: "2600 BC", what: "The cedar harbour", src: IMG.harbour, alt: "The old harbour of Byblos and its small boats" },
  { when: "5000 BC", what: "The first village", src: IMG.ruins, alt: "The excavated foundations of the ancient city running to the sea" },
];

const NAME = "Feniqia";

export function Hero() {
  const root = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const el = root.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let last = 0;
    const ctx = gsap.context(() => {
      const layers = gsap.utils.toArray<HTMLElement>("[data-layer]");
      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: el,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.9,
          onUpdate: (self) => {
            const i = Math.min(LAYERS.length - 1, Math.round(self.progress * (LAYERS.length - 1)));
            if (i !== last) setActive((last = i));
          },
        },
      });
      // each older age surfaces out of the one above it, while the camera presses on down through that one
      layers.forEach((layer, i) => {
        if (i === 0) return;
        const at = i - 1;
        tl.fromTo(layer, { opacity: 0 }, { opacity: 1, duration: 0.8 }, at + 0.1);
        tl.fromTo(layer.firstElementChild, { scale: 1.14 }, { scale: 1, duration: 1 }, at);
        tl.to(layers[i - 1].firstElementChild, { scale: 1.08, duration: 1 }, at);
      });
    }, el);
    return () => ctx.revert();
  }, []);

  const now = LAYERS[active];

  return (
    <section ref={root} id="top" className="relative h-[300svh] bg-cedar motion-reduce:h-[100svh]">
      <div className="sticky top-0 h-[100svh] overflow-hidden">
        {LAYERS.map((l, i) => (
          <div key={l.when} data-layer className="absolute inset-0" style={{ opacity: i === 0 ? 1 : 0 }} aria-hidden={i !== active}>
            <div className="absolute inset-0 will-change-transform">
              <Image
                src={l.src}
                alt={l.alt}
                fill
                priority={i === 0}
                fetchPriority={i === 0 ? "high" : undefined}
                loading={i === 0 ? undefined : "eager"}
                sizes="100vw"
                className={cn("object-cover", i === 0 && "animate-[kenburns_10s_var(--ease-silk)_both]")}
              />
            </div>
          </div>
        ))}
        {/* a neutral scrim under the type only: the head of the frame and its foot */}
        <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-cedar/70 to-transparent" aria-hidden />
        <div className="absolute inset-x-0 bottom-0 h-[62%] bg-gradient-to-t from-cedar via-cedar/60 to-transparent" aria-hidden />
        <div className="absolute inset-y-0 right-0 hidden w-[30%] bg-gradient-to-l from-cedar/75 to-transparent md:block" aria-hidden />

        {/* the depth gauge: where in time you are standing */}
        <ol className="absolute right-4 top-1/2 hidden -translate-y-1/2 md:block md:right-8" aria-label="The ages of Byblos, newest first">
          {LAYERS.map((l, i) => (
            <li key={l.when} className="flex items-center justify-end gap-3 py-2 animate-[fade_1s_ease_both]" style={{ animationDelay: `${0.9 + i * 0.08}s` }}>
              <span className={cn("text-right label transition-colors duration-500", i === active ? "text-sand" : "text-stone")}>
                <span className="block">{l.when}</span>
                <span className={cn("block font-light transition-opacity duration-500", i === active ? "opacity-100" : "opacity-0")}>{l.what}</span>
              </span>
              <span className={cn("block h-2.5 w-2.5 transition-[background-color,transform] duration-500", i === active ? "scale-125 bg-brass" : "bg-sand/35")} aria-hidden />
            </li>
          ))}
          <li className="pt-3 text-right label text-stone animate-[fade_1s_ease_both]" style={{ animationDelay: "1.4s" }} aria-hidden>
            Scroll to dig
          </li>
        </ol>

        {/* on phones the gauge folds into one line under the letterhead */}
        <p className="absolute left-4 top-24 label text-sand md:hidden" aria-live="polite">
          {now.when}, {now.what.toLowerCase()}
        </p>

        <div className="absolute inset-x-0 bottom-0">
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
      </div>
    </section>
  );
}
