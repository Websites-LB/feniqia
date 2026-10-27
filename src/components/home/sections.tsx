import Image from "next/image";
import Link from "next/link";

import { ReserveForm } from "@/components/home/reserve-form";
import { Seal } from "@/components/site/logo";
import { COUNTS, HOUSE_DISHES, dish, ll } from "@/lib/menu";
import { OWN, SITE, mapsUrl } from "@/lib/site";

// Two of their own photographs the cargo above does not already use.
const PLATES = [
  {
    src: OWN.pans,
    alt: "A hanging iron tray of small pans: soujouk, mkanek, batata harra and ras asfour",
    title: "Bil makle, all at once",
    text: "Soujouk, mkanek, batata harra and ras asfour, each in its own small pan, hung from one iron tray.",
  },
  {
    src: OWN.grill,
    alt: "Skewers of grilled meat served upright on an iron rack, with salad, wedges and halloumi",
    title: "From the grill, to the table",
    text: "Skewers arrive on their own iron rack, still dripping, with the salads and the halloumi.",
  },
];

export function HousePlates() {
  return (
    <section id="plates" className="relative bg-cedar py-28 md:py-40">
      <div className="wrap">
        <div className="grid items-end gap-8 md:grid-cols-[minmax(0,1fr)_auto]">
          <h2 className="section-title max-w-[12ch]" data-reveal>
            History in a plate
          </h2>
          <Link href="/menu" className="btn btn-line justify-self-start" data-reveal data-delay="0.1">
            The whole menu
          </Link>
        </div>

        <div className="mt-14 grid gap-6 md:mt-20 md:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] md:gap-8">
          {PLATES.map((p, i) => (
            <figure key={p.src} className={i === 1 ? "md:mt-32" : ""} data-reveal data-delay={String(i * 0.1)}>
              <div className="group relative aspect-[4/5] overflow-hidden bg-hold">
                <Image src={p.src} alt={p.alt} fill sizes="(min-width: 768px) 50vw, 92vw" className="object-cover transition-transform duration-[1.4s] ease-[var(--ease-silk)] group-hover:scale-[1.04]" />
              </div>
              <figcaption className="mt-5">
                <span className="block font-display text-[1.6rem] leading-tight">{p.title}</span>
                <span className="mt-2 block max-w-[46ch] label font-light text-stone">{p.text}</span>
              </figcaption>
            </figure>
          ))}
        </div>

        <div className="mt-24 grid gap-10 md:mt-32 lg:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] lg:gap-24">
          <div data-reveal>
            <h3 className="text-[clamp(1.8rem,2.6vw,2.4rem)] leading-tight">The ones with our name on</h3>
            <p className="lede mt-4">House dishes, and the ones regulars order before they sit down. Prices in Lebanese pounds.</p>
          </div>
          <ul className="grid border-t border-rule md:grid-cols-2 md:gap-x-12" data-reveal data-delay="0.1">
            {HOUSE_DISHES.map((d) => (
              <li key={d.name} className="grid grid-cols-[minmax(0,1fr)_auto] content-start gap-x-6 border-b border-rule py-4">
                <span className="text-[1.0625rem] font-medium">{d.name}</span>
                <span className="font-display text-[1.2rem] leading-none text-brass tabular-nums">{ll(d.price)}</span>
                {d.desc && <span className="col-span-2 mt-1 label font-light text-stone">{d.desc}</span>}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

// What the names on the menu remember. Kept to what the histories agree on.
const NAMES = [
  { name: "Achtarout", what: "pizza", price: dish("Achtarout").price, story: "Astarte, great goddess of the Phoenician coast, honoured in Byblos as the Lady of Gebal." },
  { name: "Alissar", what: "pizza", price: dish("Alissar").price, story: "Elissa, princess of Tyre, who sailed west and founded Carthage." },
  { name: "Aphrodite", what: "pizza", price: dish("Aphrodite").price, story: "Astarte's Greek sister, born from the sea foam of the eastern Mediterranean." },
  { name: "Byzantia", what: "salad", price: dish("Byzantia salad").price, story: "For the Byzantine centuries, when Byblos was a seat of bishops." },
  { name: "Citadella", what: "pizza", price: dish("Citadella").price, story: "The Crusader citadel at the top of the souk." },
  { name: "Port", what: "salad", price: dish("Port salad").price, story: "The old harbour just down the hill, where the cedar ships tied up." },
];

export function Names() {
  return (
    <section className="lamp relative py-28 md:py-40">
      <div className="wrap grid gap-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.6fr)] lg:gap-24">
        <div className="lg:sticky lg:top-32 lg:self-start">
          <h2 className="section-title" data-reveal>
            Read the menu like a map
          </h2>
          <p className="lede mt-6" data-reveal data-delay="0.1">
            Half our dishes are named for the people and places of this coast. Order a pizza, and you are ordering a goddess.
          </p>
          <div className="mt-10 w-24 text-brass-deep" data-reveal data-delay="0.2">
            <Seal />
          </div>
        </div>

        <ol className="border-t border-rule">
          {NAMES.map((n, i) => (
            <li key={n.name} className="grid grid-cols-[2.5rem_minmax(0,1fr)] gap-x-4 border-b border-rule py-7 md:grid-cols-[3.5rem_minmax(0,1fr)_auto] md:gap-x-8 md:py-9" data-reveal data-delay={String((i % 3) * 0.06)}>
              <span className="pt-1 font-display text-[1.1rem] text-brass-deep tabular-nums">{String(i + 1).padStart(2, "0")}</span>
              <div>
                <h3 className="text-[clamp(2rem,3.4vw,3rem)] leading-none">{n.name}</h3>
                <p className="mt-3 max-w-[46ch] font-light leading-relaxed text-sand/75">{n.story}</p>
              </div>
              <p className="col-start-2 mt-3 label text-stone md:col-start-3 md:mt-0 md:pt-2 md:text-right">
                {n.what}
                <span className="ml-3 font-display text-[1.15rem] text-brass tabular-nums md:ml-0 md:mt-1 md:block">{ll(n.price)}</span>
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

const WORDS = ["Sabah el kheir", "Mezze", "Bil makle", "Mechwe", "Arak", "Nargile", "Sahtein"];

export function Marquee() {
  return (
    <section className="overflow-hidden border-y border-rule bg-cedar py-10 md:py-14" aria-hidden>
      <div className="flex w-max animate-[drift_55s_linear_infinite] whitespace-nowrap">
        {[0, 1].map((k) => (
          <div key={k} className="flex shrink-0 items-center">
            {WORDS.map((w) => (
              <span key={w} className="flex items-center font-display text-[clamp(3rem,7vw,6.5rem)] leading-none text-sand/20">
                <span className="px-8 md:px-12">{w}</span>
                <span className="text-xl text-brass/70">✦</span>
              </span>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}

const FIGURES = [
  { n: COUNTS.lebaneseWines, label: "Lebanese wines, from Musar and Ksara to Ixir and Adyar" },
  { n: COUNTS.signatures, label: "signature cocktails, It's About Thym among them" },
  { n: COUNTS.spirits, label: "whiskies, gins, vodkas and more behind the bar" },
];

export function Bar() {
  return (
    <section id="bar" className="lamp-murex relative overflow-hidden py-28 md:py-40">
      <div className="wrap grid gap-16 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:items-center lg:gap-24">
        <div className="relative grid grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] gap-4 md:gap-6">
          <div className="relative aspect-[3/4] overflow-hidden" data-reveal="clip">
            <div className="absolute inset-[-12%_0]" data-parallax="0.16">
              <Image src={OWN.ade} alt="A tall glass of fresh lemonade on a Feniqia coaster" fill sizes="(min-width: 1024px) 26vw, 55vw" className="object-cover" />
            </div>
          </div>
          <div className="relative mt-20 aspect-[3/4] overflow-hidden" data-reveal="clip" data-delay="0.15">
            <div className="absolute inset-[-12%_0]" data-parallax="0.22">
              <Image src={OWN.bell} alt="A brass bell on a chain against the old stone wall" fill sizes="(min-width: 1024px) 20vw, 45vw" className="object-cover" />
            </div>
          </div>
        </div>

        <div>
          <h2 className="section-title max-w-[13ch]" data-reveal>
            Arak at sunset, Musar after dark
          </h2>
          <p className="lede mt-6" data-reveal data-delay="0.1">
            Arak by the glass, the quarter or the bottle, poured over ice the way it should be. Lebanese wine by the glass. Fresh -ades for the afternoon, and a nargile when the evening runs long.
          </p>

          <dl className="mt-14 grid gap-10 sm:grid-cols-3">
            {FIGURES.map((f, i) => (
              <div key={f.label} className="border-t border-brass-deep/60 pt-6" data-reveal data-delay={String(0.1 + i * 0.1)}>
                <dt className="sr-only">{f.label}</dt>
                <dd>
                  <span className="display block text-[clamp(3.25rem,5.5vw,5rem)] leading-none text-brass tabular-nums" data-count={f.n}>
                    {f.n}
                  </span>
                  <span className="mt-3 block max-w-[22ch] label font-light text-sand/75" aria-hidden>
                    {f.label}
                  </span>
                </dd>
              </div>
            ))}
          </dl>

          <Link href="/menu#bar" className="btn btn-line mt-14" data-reveal data-delay="0.3">
            The drinks list
          </Link>
        </div>
      </div>
    </section>
  );
}

export function House() {
  return (
    <section id="house" className="relative bg-cedar py-28 md:py-40">
      <div className="wrap grid gap-16 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)] lg:gap-24">
        <div>
          <h2 className="section-title" data-reveal>
            Find us in the lanes
          </h2>
          <p className="lede mt-6" data-reveal data-delay="0.1">
            Follow the stone lanes of the Old Souk in the shadow of the castle. Wooden tables, red cushions, a copper sign on the wall: you have arrived.
          </p>

          <dl className="mt-12 grid gap-8 border-t border-brass-deep/60 pt-8 sm:grid-cols-3" data-reveal data-delay="0.2">
            <div>
              <dt className="label text-brass">Where</dt>
              <dd className="mt-2">
                {SITE.street}
                <br />
                Jbeil, Lebanon
              </dd>
              <dd className="mt-2">
                <a className="link-underline label text-stone hover:text-sand" href={mapsUrl} target="_blank" rel="noreferrer">
                  Open in Maps
                </a>
              </dd>
            </div>
            <div>
              <dt className="label text-brass">When</dt>
              <dd className="mt-2">{SITE.hours}</dd>
            </div>
            <div>
              <dt className="label text-brass">Call</dt>
              <dd className="mt-2">
                <a className="link-underline" href={`tel:+${SITE.phone}`}>
                  {SITE.phoneDisplay}
                </a>
              </dd>
            </div>
          </dl>
        </div>

        <div className="relative aspect-[4/3] overflow-hidden bg-hold lg:aspect-auto lg:min-h-[480px]" data-reveal="clip">
          <iframe
            title="Feniqia on the map, in the Old Souk of Byblos"
            src={`https://www.google.com/maps?q=${encodeURIComponent(SITE.mapsQuery)}&output=embed`}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="absolute inset-0 h-full w-full border-0 [filter:grayscale(1)_sepia(0.55)_contrast(0.9)_brightness(0.82)]"
          />
        </div>
      </div>
    </section>
  );
}

export function Book() {
  return (
    <section id="book" className="relative bg-cedar">
      <div className="grid lg:grid-cols-2">
        <div className="relative min-h-[60svh] overflow-hidden lg:min-h-full" data-reveal="clip">
          <div className="absolute inset-[-10%_0]" data-parallax="0.15">
            <Image src={OWN.terrace} alt="A wooden table laid for two on the terrace, red cushions and the Feniqia napkin holder" fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" />
          </div>
        </div>
        <div className="wrap !max-w-[720px] py-24 md:py-36 lg:!mx-0 lg:!px-20">
          <h2 className="section-title" data-reveal>
            Save us a table
          </h2>
          <p className="lede mt-6" data-reveal data-delay="0.1">
            Your request opens in WhatsApp, ready to send, and we reply to confirm. Or call{" "}
            <a className="text-sand underline decoration-brass-deep underline-offset-4 hover:text-brass" href={`tel:+${SITE.phone}`}>
              {SITE.phoneDisplay}
            </a>
            .
          </p>
          <div className="mt-12" data-reveal data-delay="0.2">
            <ReserveForm />
          </div>
        </div>
      </div>
    </section>
  );
}
