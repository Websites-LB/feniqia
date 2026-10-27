import Image from "next/image";
import Link from "next/link";

import { HOUSE_DISHES, ll } from "@/lib/menu";
import { IMG, OWN, SITE } from "@/lib/site";

export function Intro() {
  return (
    <section className="bg-paper py-28 md:py-44">
      <div className="wrap text-center">
        <p className="display mx-auto max-w-[26ch] text-[clamp(1.75rem,3.2vw,3rem)] leading-[1.25]" data-reveal>
          A Lebanese table in one of the oldest cities in the world, set among the stone lanes of the Byblos Old Souk.
        </p>
        <div className="mt-12" data-reveal data-delay="0.1">
          <Link href="/our-story" className="more">
            Our story
          </Link>
        </div>
      </div>
    </section>
  );
}

export function Kitchen() {
  return (
    <section className="bg-paper pb-28 md:pb-44">
      <div className="wrap grid items-center gap-14 lg:grid-cols-2 lg:gap-28">
        <div className="relative aspect-[4/5] overflow-hidden bg-dust" data-reveal="clip">
          <div className="absolute inset-[-8%_0]" data-parallax="0.1">
            <Image src={OWN.makle} alt="Taboule, warak enab and a sizzling pan on a wooden table" fill sizes="(min-width: 1024px) 45vw, 92vw" className="object-cover" />
          </div>
        </div>
        <div className="lg:max-w-md">
          <p className="sign text-pome" data-reveal>
            The kitchen
          </p>
          <h2 className="title mt-5" data-reveal>
            Mezze, the pan and the grill
          </h2>
          <p className="lede mt-6" data-reveal data-delay="0.1">
            Breakfast from the taboune, cold and hot mezze for the table, dishes brought sizzling bil makle, and skewers from the grill. Some of them carry our name.
          </p>
          <ul className="mt-10 border-t border-line" data-reveal data-delay="0.15">
            {HOUSE_DISHES.slice(0, 4).map((d) => (
              <li key={d.name} className="flex items-baseline justify-between gap-6 border-b border-line py-4">
                <span className="display text-[1.3rem]">{d.name}</span>
                <span className="text-[0.9rem] tabular-nums text-ink-soft">{ll(d.price)} LL</span>
              </li>
            ))}
          </ul>
          <div className="mt-10" data-reveal data-delay="0.2">
            <Link href="/menu" className="btn btn-ink">
              View the menu
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

const CATEGORIES = [
  { title: "Breakfast", id: "sabah-el-kheir", src: OWN.wrap, alt: "A taouk wrap in thin bread" },
  { title: "Mezze", id: "cold-starters", src: OWN.fattouch, alt: "A bowl of fattouch beside a glass of red" },
  { title: "Bil makle", id: "bil-makle", src: OWN.pans, alt: "Small pans of soujouk, mkanek and batata harra" },
  { title: "Grill", id: "platters", src: OWN.grill, alt: "Skewers served on an iron rack" },
];

export function Categories() {
  return (
    <section className="bg-lime py-24 md:py-32">
      <div className="wrap">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <h2 className="title" data-reveal>
            From the menu
          </h2>
          <Link href="/menu" className="more" data-reveal>
            Full menu
          </Link>
        </div>
        <div className="mt-12 grid grid-cols-2 gap-x-4 gap-y-10 md:mt-16 lg:grid-cols-4 lg:gap-6">
          {CATEGORIES.map((c, i) => (
            <Link key={c.id} href={`/menu#${c.id}`} className="group block" data-reveal data-delay={String(i * 0.08)}>
              <div className="relative aspect-[3/4] overflow-hidden bg-dust">
                <Image src={c.src} alt={c.alt} fill sizes="(min-width: 1024px) 22vw, 46vw" className="object-cover transition-transform duration-[1.4s] ease-[var(--ease-silk)] group-hover:scale-[1.05]" />
              </div>
              <div className="mt-4 flex items-center justify-between border-b border-line pb-3">
                <span className="display text-[1.4rem]">{c.title}</span>
                <span className="sign text-ink-soft transition-transform duration-500 group-hover:translate-x-1" aria-hidden>
                  →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Band() {
  return (
    <section className="relative h-[70svh] min-h-[420px] overflow-hidden bg-ink md:h-[90svh]" aria-label="The Crusader castle of Byblos">
      <div className="absolute inset-[-15%_0]" data-parallax="0.25">
        <Image src={IMG.castle} alt="The Crusader castle of Byblos on its green mound" fill sizes="100vw" className="object-cover" />
      </div>
      <div className="absolute inset-0 bg-ink/30" aria-hidden />
      <div className="absolute inset-x-0 bottom-0 p-6 text-paper md:p-12">
        <p className="sign text-paper/80">A few steps from the Crusader castle</p>
      </div>
    </section>
  );
}

export function Bar() {
  return (
    <section className="bg-night py-28 text-paper md:py-40">
      <div className="wrap grid items-center gap-14 lg:grid-cols-2 lg:gap-28">
        <div className="lg:order-2">
          <div className="grid grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)] items-end gap-4">
            <div className="relative aspect-[4/5] overflow-hidden" data-reveal="clip">
              <div className="absolute inset-[-10%_0]" data-parallax="0.12">
                <Image src={OWN.dusk} alt="Byblos at dusk from above" fill sizes="(min-width: 1024px) 26vw, 52vw" className="object-cover" />
              </div>
            </div>
            <div className="relative mb-16 aspect-[3/4] overflow-hidden" data-reveal="clip" data-delay="0.15">
              <div className="absolute inset-[-10%_0]" data-parallax="0.2">
                <Image src={OWN.ade} alt="A tall glass of lemonade on a Feniqia coaster" fill sizes="(min-width: 1024px) 20vw, 40vw" className="object-cover" />
              </div>
            </div>
          </div>
        </div>
        <div className="lg:order-1 lg:max-w-md">
          <p className="sign text-lantern" data-reveal>
            The bar
          </p>
          <h2 className="title mt-5" data-reveal>
            Arak and Lebanese wine
          </h2>
          <p className="mt-6 text-[1.0625rem] leading-[1.75] text-paper/70" data-reveal data-delay="0.1">
            Arak by the glass, the quarter or the bottle, poured over ice. Wines from Musar, Ksara, Ixir and Adyar, cocktails of our own, fresh lemonades in the afternoon and a nargile into the evening.
          </p>
          <div className="mt-10" data-reveal data-delay="0.2">
            <Link href="/menu#bar" className="btn btn-light">
              Drinks list
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export function Reserve() {
  return (
    <section className="bg-paper py-28 md:py-40">
      <div className="wrap text-center">
        <h2 className="title" data-reveal>
          Reserve a table
        </h2>
        <p className="lede mx-auto mt-6" data-reveal data-delay="0.1">
          Open every day from breakfast. Send a request online, or call us on {SITE.phoneDisplay}.
        </p>
        <div className="mt-10 flex flex-wrap justify-center gap-3" data-reveal data-delay="0.2">
          <Link href="/reservations" className="btn btn-pome">
            Book a table
          </Link>
          <a href={`tel:+${SITE.phone}`} className="btn btn-ink">
            Call {SITE.phoneDisplay}
          </a>
        </div>
      </div>
    </section>
  );
}
