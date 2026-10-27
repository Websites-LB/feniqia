"use client";

import { useMemo, useState } from "react";

import { Lamp } from "@/components/home/lamp";
import { toPhoenician } from "@/lib/phoenician";

/** Name handed from the stone to the booking form. */
export const NAME_EVENT = "feniqia:name";

/** Type a name, see it in the alphabet Byblos gave the world, lit by a torch that follows the pointer. */
export function NameStone() {
  const [name, setName] = useState("");
  const words = useMemo(() => toPhoenician(name || "Feniqia"), [name]);
  const letters = words.flat();

  const book = () => {
    window.dispatchEvent(new CustomEvent(NAME_EVENT, { detail: name.trim() }));
    const form = document.querySelector<HTMLElement>("#book form");
    if (!form) return;
    if (window.__lenis) window.__lenis.scrollTo(form, { duration: 1.8, offset: -160 });
    else form.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="alphabet" className="lamp-murex relative py-28 md:py-40">
      <div className="wrap grid gap-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.25fr)] lg:items-center lg:gap-24">
        <div>
          <h2 className="section-title max-w-[17ch]" data-reveal>
            Your name in the first alphabet
          </h2>
          <p className="lede mt-6" data-reveal data-delay="0.1">
            The oldest Phoenician inscriptions, ancestor of the Greek, Latin and Arabic letters, were found here in Byblos. Write your name the way a merchant of Gebal would have: right to left, and almost without vowels.
          </p>

          <label className="mt-10 block max-w-md" data-reveal data-delay="0.2">
            <span className="label text-stone">Your name, in English or Arabic</span>
            <input
              className="field mt-2 font-display text-[1.6rem]"
              value={name}
              maxLength={28}
              autoComplete="given-name"
              placeholder="Feniqia"
              onChange={(e) => setName(e.target.value)}
            />
          </label>

          <button type="button" onClick={book} disabled={!name.trim()} className="btn btn-line mt-8 disabled:pointer-events-none disabled:opacity-40" data-reveal data-delay="0.25">
            {name.trim() ? `Book a table as ${name.trim()}` : "Book a table under this name"}
          </button>
        </div>

        {/* the stone */}
        <figure className="relative overflow-hidden bg-[oklch(0.78_0.045_75)] text-murex-deep" data-reveal="clip">
          <div
            className="absolute inset-0 opacity-60 mix-blend-multiply"
            aria-hidden
            style={{
              backgroundImage:
                "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='240' height='240'><filter id='s'><feTurbulence type='fractalNoise' baseFrequency='0.035' numOctaves='4' seed='7'/><feColorMatrix values='0 0 0 0 0.45 0 0 0 0 0.36 0 0 0 0 0.25 0 0 0 0.55 0'/></filter><rect width='100%' height='100%' filter='url(%23s)'/></svg>\")",
            }}
          />
          <Lamp className="pointer-events-none absolute inset-0 overflow-hidden mix-blend-soft-light" />

          <div className="relative flex min-h-[340px] flex-col items-center justify-center px-6 py-16 md:min-h-[460px]">
            <p
              dir="rtl"
              lang="phn"
              className="glyph flex flex-wrap justify-center gap-x-[0.5em] gap-y-2 text-center text-[clamp(3.5rem,9vw,7.5rem)] [text-shadow:0_1px_0_oklch(0.95_0.03_80/0.55),0_-1px_0_oklch(0.2_0.05_350/0.45)]"
              aria-label={`${name || "Feniqia"} written in Phoenician letters`}
            >
              {words.map((w, i) => (
                <span key={i}>{w.map((l) => l.glyph).join("")}</span>
              ))}
            </p>
            <figcaption className="mt-10 flex max-w-full flex-wrap justify-center gap-x-4 gap-y-1 label text-murex-deep/85" dir="rtl" aria-hidden>
              {letters.map((l, i) => (
                <span key={i} className="inline-flex items-baseline gap-1.5">
                  <span className="glyph text-[1.2rem]">{l.glyph}</span>
                  <span dir="ltr">{l.name}</span>
                </span>
              ))}
            </figcaption>
          </div>
        </figure>
      </div>
    </section>
  );
}
