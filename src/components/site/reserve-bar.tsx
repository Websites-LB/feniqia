"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import { cn } from "@/lib/utils";

/** Pinned booking bar on phones: shows once past the hero, steps aside at the booking form. */
export function ReserveBar() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const on = () => {
      const form = document.getElementById("book");
      const pastHero = window.scrollY > window.innerHeight * 0.8;
      const r = form?.getBoundingClientRect();
      const atForm = r ? r.top < window.innerHeight && r.bottom > 0 : false;
      setShow(pastHero && !atForm);
    };
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  return (
    <Link
      href="/#book"
      className={cn(
        "btn fixed inset-x-0 bottom-0 z-40 !min-h-14 btn-brass transition-transform duration-500 md:hidden",
        show ? "translate-y-0" : "translate-y-full",
      )}
      aria-hidden={!show}
      tabIndex={show ? 0 : -1}
    >
      Book a table
    </Link>
  );
}
