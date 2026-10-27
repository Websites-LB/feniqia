"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { SITE } from "@/lib/site";
import { cn } from "@/lib/utils";

const LINKS = [
  ["/menu", "Menu"],
  ["/our-story", "Our story"],
  ["/visit", "Visit"],
];

/** A full-width bar: links to the left, the name in the centre, the telephone and reservations to the right. */
export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const path = usePathname();

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 24);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
  }, [open]);

  useEffect(() => {
    const esc = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", esc);
    return () => window.removeEventListener("keydown", esc);
  }, []);

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-40 border-b bg-paper text-ink transition-[border-color,box-shadow] duration-500",
          scrolled ? "border-line shadow-[0_10px_30px_-24px_oklch(0.2_0.015_50/0.5)]" : "border-transparent",
        )}
      >
        <div className="grid h-[68px] grid-cols-[1fr_auto_1fr] items-center px-5 md:h-[84px] md:px-10">
          <nav aria-label="Primary" className="flex items-center gap-8">
            <button onClick={() => setOpen(true)} className="sign -ml-1 min-h-11 px-1 lg:hidden" aria-expanded={open} aria-controls="site-menu">
              Menu
            </button>
            {LINKS.map(([href, label]) => (
              <Link
                key={href}
                href={href}
                aria-current={path === href ? "page" : undefined}
                className={cn("sign link-underline hidden py-1 lg:inline-block", path === href && "bg-[length:100%_1px]")}
              >
                {label}
              </Link>
            ))}
          </nav>

          <Link href="/" aria-label="Feniqia home" className="flex flex-col items-center leading-none">
            <span className="display text-[1.2rem] tracking-[0.2em] md:text-[1.9rem] md:tracking-[0.28em]">FENIQIA</span>
            <span className="sign mt-1.5 hidden text-[0.6rem] tracking-[0.32em] text-ink-soft md:block">Marchand de Liban</span>
          </Link>

          <div className="flex items-center justify-end gap-8">
            <a href={`tel:+${SITE.phone}`} className="sign link-underline hidden py-1 xl:inline-block">
              {SITE.phoneDisplay}
            </a>
            <Link href="/reservations" className="btn btn-pome !min-h-10 !px-4 md:!min-h-11 md:!px-6">
              Reserve
            </Link>
          </div>
        </div>
      </header>

      <div
        id="site-menu"
        role="dialog"
        aria-modal="true"
        aria-label="Site menu"
        className={cn(
          "fixed inset-0 z-50 flex flex-col bg-paper text-ink transition-[opacity,visibility] duration-500 lg:hidden",
          open ? "visible opacity-100" : "invisible opacity-0",
        )}
      >
        <div className="grid h-[68px] grid-cols-[1fr_auto_1fr] items-center border-b border-line px-5">
          <button onClick={() => setOpen(false)} tabIndex={open ? 0 : -1} className="sign -ml-1 min-h-11 justify-self-start px-1">
            Close
          </button>
          <span className="display text-[1.55rem] leading-none tracking-[0.28em]">FENIQIA</span>
        </div>
        <ul className="flex flex-1 flex-col items-center justify-center gap-2">
          {[["/", "Home"], ...LINKS, ["/reservations", "Reservations"]].map(([href, label], i) => (
            <li key={href} className="overflow-hidden">
              <Link
                href={href}
                onClick={() => setOpen(false)}
                tabIndex={open ? 0 : -1}
                className={cn("display block py-1 text-[2.6rem] transition-transform duration-700 ease-[var(--ease-silk)]", open ? "translate-y-0" : "translate-y-full")}
                style={{ transitionDelay: open ? `${0.1 + i * 0.05}s` : "0s" }}
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>
        <div className="sign pb-10 text-center leading-loose text-ink-soft">
          {SITE.street}, Byblos
          <br />
          <a href={`tel:+${SITE.phone}`} tabIndex={open ? 0 : -1}>
            {SITE.phoneDisplay}
          </a>
        </div>
      </div>
    </>
  );
}
