"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { Logo } from "@/components/site/logo";
import { SITE } from "@/lib/site";
import { cn } from "@/lib/utils";

const LINKS = [
  ["/menu", "Menu"],
  ["/menu#bar", "The bar"],
  ["/#voyage", "Byblos"],
  ["/#house", "Find us"],
];

/** Clear over the hero, smoked glass once scrolled; slides away while you read down and returns when you scroll up. */
export function SiteHeader() {
  const path = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    let last = window.scrollY;
    const on = () => {
      const y = window.scrollY;
      setScrolled(y > 60);
      if (y > 400 && y > last + 4) setHidden(true);
      else if (y < last - 4 || y <= 400) setHidden(false);
      last = y;
    };
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
  }, [open]);

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-40 border-b transition-[transform,background-color,border-color] duration-700 ease-[var(--ease-silk)]",
          scrolled || path !== "/" ? "border-rule/60 bg-cedar/80 backdrop-blur-md" : "border-transparent bg-transparent",
          hidden && !open ? "-translate-y-full" : "translate-y-0",
        )}
      >
        <div className="wrap flex h-16 items-center justify-between gap-6 md:h-20">
          <Link href="/" aria-label="Feniqia home" className="text-sand transition-opacity hover:opacity-80">
            <Logo title={null} tagline={false} className="w-[118px] md:w-[138px]" />
          </Link>

          <nav aria-label="Primary" className="flex items-center gap-8 label">
            {LINKS.map(([href, label]) => (
              <Link key={href} href={href} className="link-underline hidden py-1 transition-colors hover:text-brass lg:inline">
                {label}
              </Link>
            ))}
            <Link href="/#book" className="btn btn-brass !hidden !min-h-11 !px-5 sm:!inline-flex">
              Book a table
            </Link>
            <button onClick={() => setOpen(true)} className="-mr-2 flex min-h-11 items-center gap-3 px-2 hover:text-brass lg:hidden" aria-expanded={open} aria-controls="mobile-nav">
              <span className="flex w-6 flex-col items-end gap-[6px]" aria-hidden>
                <span className="h-px w-full bg-current" />
                <span className="h-px w-2/3 bg-current" />
              </span>
              <span className="sr-only">Open navigation</span>
            </button>
          </nav>
        </div>
      </header>

      <div
        id="mobile-nav"
        className={cn(
          "fixed inset-0 z-50 flex flex-col bg-cedar transition-[clip-path,visibility] duration-700 ease-[var(--ease-silk)] lg:hidden",
          open ? "visible [clip-path:inset(0_0_0_0)]" : "invisible [clip-path:inset(0_0_100%_0)]",
        )}
      >
        <div className="wrap flex h-16 items-center justify-between">
          <Logo title={null} tagline={false} className="w-[118px] text-sand" />
          <button onClick={() => setOpen(false)} className="-mr-2 flex min-h-11 items-center px-2 label hover:text-brass">
            Close
          </button>
        </div>
        <ul className="wrap mt-12 flex-1">
          {[...LINKS, ["/#book", "Book a table"]].map(([href, label], i) => (
            <li key={href} className="overflow-hidden border-b border-rule">
              <Link
                href={href}
                onClick={() => setOpen(false)}
                tabIndex={open ? 0 : -1}
                className={cn("block py-4 font-display text-[2.5rem] leading-tight transition-transform duration-700 ease-[var(--ease-silk)] hover:text-brass", open ? "translate-y-0" : "translate-y-full")}
                style={{ transitionDelay: open ? `${0.15 + i * 0.06}s` : "0s" }}
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>
        <div className="wrap pb-10 label text-stone">
          <p>
            {SITE.street}, {SITE.town}
          </p>
          <a href={`tel:+${SITE.phone}`} tabIndex={open ? 0 : -1} className="hover:text-sand">
            {SITE.phoneDisplay}
          </a>
        </div>
      </div>
    </>
  );
}
