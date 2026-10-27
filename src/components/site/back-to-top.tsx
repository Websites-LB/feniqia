"use client";

export function BackToTop() {
  return (
    <button
      onClick={() => (window.__lenis ? window.__lenis.scrollTo(0, { duration: 2.2 }) : window.scrollTo({ top: 0, behavior: "smooth" }))}
      className="group inline-flex min-h-11 items-center gap-3 label text-stone transition-colors hover:text-sand"
    >
      Back to the top
      <span className="relative flex h-9 w-9 items-center justify-center overflow-hidden rounded-full border border-rule transition-colors duration-500 group-hover:border-brass" aria-hidden>
        <span className="block transition-transform duration-500 ease-[var(--ease-silk)] group-hover:-translate-y-9">↑</span>
        <span className="absolute translate-y-9 text-brass transition-transform duration-500 ease-[var(--ease-silk)] group-hover:translate-y-0">↑</span>
      </span>
    </button>
  );
}
