"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import { Seal, Ship } from "@/components/site/logo";
import { SITE } from "@/lib/site";
import { cn } from "@/lib/utils";

const LINKS = [
  ["/menu", "Menu"],
  ["/menu#bar", "The bar"],
  ["/#alphabet", "Your name"],
  ["/#house", "Find us"],
];

/**
 * A letterhead, not a bar: the seal and name sit small in the top-left corner and the links run as one
 * line in the top-right. Over the photographs they stand on the image; past them, each corner becomes
 * its own small cedar tab, leaving the middle of the screen open.
 */
export function SiteHeader() {
  const [solid, setSolid] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const on = () => setSolid(window.scrollY > window.innerHeight * 0.6);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
  }, [open]);

  const tab = cn("transition-[background-color,padding] duration-700 ease-[var(--ease-silk)]", solid ? "bg-cedar/95 px-4 py-2.5" : "bg-transparent px-0 py-0");

  return (
    <>
      <header className="pointer-events-none fixed inset-x-0 top-0 z-40">
        <div className="flex items-start justify-between gap-6 px-4 pt-4 md:px-6 md:pt-5">
          <Link href="/" aria-label="Feniqia home" className={cn("pointer-events-auto flex items-center gap-3 text-sand", tab)}>
            <Seal className="w-9 shrink-0 md:w-10" />
            <span className="label leading-tight">
              Feniqia
              <span className="block text-sand/70">Marchand de Liban</span>
            </span>
          </Link>

          <nav aria-label="Primary" className={cn("pointer-events-auto flex items-center gap-5 label", tab)}>
            <p className="hidden lg:block">
              {LINKS.map(([href, label], i) => (
                <span key={href}>
                  <Link href={href} className="link-underline py-1 transition-colors hover:text-brass">
                    {label}
                  </Link>
                  {i < LINKS.length - 1 && <span className="text-sand/60">, </span>}
                </span>
              ))}
            </p>
            <Link href="/#book" className="btn btn-brass !hidden !min-h-11 !px-5 sm:!inline-flex">
              Book
            </Link>
            <button onClick={() => setOpen(true)} className="-mr-1 min-h-11 px-1 hover:text-brass lg:hidden" aria-expanded={open} aria-controls="mobile-nav">
              Menu
            </button>
          </nav>
        </div>
      </header>

      <div
        id="mobile-nav"
        className={cn(
          "fixed inset-0 z-50 flex flex-col bg-murex-deep transition-[clip-path,visibility] duration-700 ease-[var(--ease-silk)] lg:hidden",
          open ? "visible [clip-path:inset(0_0_0_0)]" : "invisible [clip-path:inset(0_0_0_100%)]",
        )}
      >
        <div className="flex items-start justify-between px-4 pt-4">
          <span className="flex items-center gap-3 label leading-tight">
            <Seal className="w-9" />
            <span>
              Feniqia
              <span className="block text-sand/70">Marchand de Liban</span>
            </span>
          </span>
          <button onClick={() => setOpen(false)} className="-mr-1 min-h-11 px-1 label hover:text-brass">
            Close
          </button>
        </div>
        <ul className="mt-16 flex-1 px-4">
          {[...LINKS, ["/#book", "Book a table"]].map(([href, label], i) => (
            <li key={href} className="overflow-hidden">
              <Link
                href={href}
                onClick={() => setOpen(false)}
                tabIndex={open ? 0 : -1}
                className={cn("block py-2 font-display text-[2.75rem] leading-tight transition-transform duration-700 ease-[var(--ease-silk)] hover:text-brass", open ? "translate-x-0" : "translate-x-full")}
                style={{ transitionDelay: open ? `${0.12 + i * 0.05}s` : "0s" }}
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>
        <div className="flex items-end justify-between px-4 pb-8">
          <div className="label text-sand/80">
            <p>{SITE.street}, Byblos</p>
            <a href={`tel:+${SITE.phone}`} tabIndex={open ? 0 : -1} className="hover:text-sand">
              {SITE.phoneDisplay}
            </a>
          </div>
          <Ship className="w-20 text-brass" />
        </div>
      </div>
    </>
  );
}
