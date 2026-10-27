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
 *   data-words           a statement whose words light up as it scrolls past
 *   data-count="1892"    a figure that counts up once it is seen
 *   data-sail            sails right across its section as the section scrolls away
 *   data-voyage          a track that pins its section and slides sideways through its chapters (desktop)
 */
export function ScrollFx() {
  const path = usePathname();

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const mm = gsap.matchMedia();
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

      gsap.utils.toArray<HTMLElement>("[data-words]").forEach((el) => {
        if (!el.dataset.split) {
          el.innerHTML = el.textContent!.trim().split(/\s+/).map((w) => `<span class="inline-block opacity-[0.16]">${w}</span>`).join(" ");
          el.dataset.split = "1";
        }
        gsap.to(el.children, {
          opacity: 1,
          stagger: 0.08,
          ease: "none",
          scrollTrigger: { trigger: el, start: "top 80%", end: "bottom 45%", scrub: true },
        });
      });

      gsap.utils.toArray<HTMLElement>("[data-sail]").forEach((el) => {
        gsap.to(el, {
          x: () => window.innerWidth * 0.95,
          ease: "none",
          scrollTrigger: { trigger: el.closest("section"), start: "top top", end: "bottom top", scrub: 1.2, invalidateOnRefresh: true },
        });
      });

      mm.add("(min-width: 1024px)", () => {
        gsap.utils.toArray<HTMLElement>("[data-voyage]").forEach((track) => {
          const distance = () => track.scrollWidth - window.innerWidth;
          gsap.to(track, {
            x: () => -distance(),
            ease: "none",
            scrollTrigger: { trigger: track.closest("section"), start: "top top", end: () => `+=${distance()}`, pin: true, scrub: 1, invalidateOnRefresh: true },
          });
        });
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
    // and the voyage pin was made after triggers further down, so order them by position first
    const refresh = () => {
      ScrollTrigger.sort();
      ScrollTrigger.refresh();
    };
    window.addEventListener("load", refresh);
    const t = setTimeout(refresh, 600);
    return () => {
      mm.revert();
      ctx.revert();
      clearTimeout(t);
      window.removeEventListener("load", refresh);
    };
  }, [path]);

  return null;
}
