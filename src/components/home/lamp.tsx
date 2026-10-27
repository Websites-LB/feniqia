"use client";

import { useEffect, useRef } from "react";

/**
 * A warm pool of lamplight that trails the pointer across its parent, easing behind it and
 * settling back to rest on leave. Fine pointers only; on touch it simply stays put.
 */
export function Lamp({ className }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    const host = el?.parentElement;
    if (!el || !host) return;
    if (!window.matchMedia("(pointer: fine)").matches || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const rest = { x: 0.72, y: 0.3 };
    const to = { ...rest };
    const at = { ...rest };
    let raf = 0;

    const loop = () => {
      at.x += (to.x - at.x) * 0.08;
      at.y += (to.y - at.y) * 0.08;
      el.style.transform = `translate3d(${(at.x - 0.5) * 100}%, ${(at.y - 0.5) * 100}%, 0)`;
      raf = Math.abs(to.x - at.x) + Math.abs(to.y - at.y) > 0.0005 ? requestAnimationFrame(loop) : 0;
    };
    const kick = () => {
      if (!raf) raf = requestAnimationFrame(loop);
    };
    const move = (e: PointerEvent) => {
      const r = host.getBoundingClientRect();
      to.x = (e.clientX - r.left) / r.width;
      to.y = (e.clientY - r.top) / r.height;
      kick();
    };
    const leave = () => {
      Object.assign(to, rest);
      kick();
    };

    host.addEventListener("pointermove", move);
    host.addEventListener("pointerleave", leave);
    kick();
    return () => {
      cancelAnimationFrame(raf);
      host.removeEventListener("pointermove", move);
      host.removeEventListener("pointerleave", leave);
    };
  }, []);

  return (
    <div aria-hidden className={className}>
      <div
        ref={ref}
        className="absolute inset-0 will-change-transform"
        style={{ transform: "translate3d(22%, -20%, 0)", background: "radial-gradient(closest-side, oklch(0.8 0.12 75 / 0.22), transparent 70%)", width: "100%", height: "100%" }}
      />
    </div>
  );
}
