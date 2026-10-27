"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

gsap.registerPlugin(ScrollTrigger);

/**
 * One place for the page's scroll choreography, driven by data attributes so sections stay server components:
 *   data-reveal          rises into place once, as it enters
 *   data-reveal="clip"   unmasks upward
 *   data-parallax="0.15" drifts against the scroll by that fraction of its height
 *   data-count="1892"    a figure that counts up once it is seen
 *   data-draw            an SVG path that draws itself along the scroll
 */
export function ScrollFx() {
  const path = usePathname();

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((el) => {
        const clip = el.dataset.reveal === "clip";
        if (reduce) return gsap.set(el, { opacity: 1, y: 0, clipPath: "none" });
        gsap.to(el, {
          ...(clip ? { clipPath: "inset(0% 0 0 0)", duration: 1.4 } : { opacity: 1, y: 0, duration: 1.1 }),
          ease: "expo.out",
          delay: Number(el.dataset.delay ?? 0),
          scrollTrigger: { trigger: el, start: "top 88%", once: true },
        });
      });

      if (reduce) return;

      gsap.utils.toArray<HTMLElement>("[data-parallax]").forEach((el) => {
        const amount = Number(el.dataset.parallax || 0.15) * 100;
        gsap.fromTo(
          el,
          { yPercent: -amount / 2 },
          { yPercent: amount / 2, ease: "none", scrollTrigger: { trigger: el.parentElement, start: "top bottom", end: "bottom top", scrub: true } },
        );
      });


      gsap.utils.toArray<SVGPathElement>("[data-draw]").forEach((el) => {
        const len = el.getTotalLength();
        gsap.fromTo(
          el,
          { strokeDasharray: len, strokeDashoffset: len },
          { strokeDashoffset: 0, ease: "none", scrollTrigger: { trigger: el.closest("svg") ?? el, start: "top 80%", end: "bottom 45%", scrub: true } },
        );
      });

      gsap.utils.toArray<HTMLElement>("[data-count]").forEach((el) => {
        const to = Number(el.dataset.count);
        const n = { v: 0 };
        gsap.to(n, {
          v: to,
          duration: 2.2,
          ease: "power3.out",
          onUpdate: () => (el.textContent = Math.round(n.v).toString()),
          scrollTrigger: { trigger: el, start: "top 85%", once: true },
        });
      });
    });

    // images and fonts settle the layout late; measure again once they have
    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener("load", refresh);
    const t = setTimeout(refresh, 600);
    return () => {
      ctx.revert();
      clearTimeout(t);
      window.removeEventListener("load", refresh);
    };
  }, [path]);

  return null;
}
