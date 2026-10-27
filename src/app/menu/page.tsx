import type { Metadata } from "next";
import Image from "next/image";

import { ARAK, COCKTAILS, FOOD, SHISHA, SOFT, SPIRITS, WINE, ll, type Course, type Dish, type Pour } from "@/lib/menu";
import { OWN } from "@/lib/site";

export const metadata: Metadata = {
  title: "Menu, Feniqia, Byblos Old Souk",
  description: "Breakfast from the taboune, mezze, dishes bil makle, platters, pizza and dessert, then arak, Lebanese wine, cocktails and spirits, with prices in Lebanese pounds.",
};

const INDEX: [string, string][] = [
  ...FOOD.map((c): [string, string] => [c.id, c.title]),
  ["bar", "Arak and wine"],
  ["cocktails", "Cocktails"],
  ["spirits", "Spirits"],
  ["soft", "Beer, coffee and soft drinks"],
  ["nargile", "Nargile"],
];

function Rows({ items }: { items: Dish[] }) {
  return (
    <ul className="grid gap-x-16 md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
      {items.map((d) => (
        <li key={d.name} className="grid grid-cols-[minmax(0,1fr)_auto] content-start gap-x-6 border-b border-rule py-4">
          <span className="text-[1.0625rem] font-medium">
            {d.name}
            {d.isNew && <span className="ml-2 label font-normal text-brass">new</span>}
          </span>
          <span className="font-display text-[1.2rem] leading-none text-brass tabular-nums">{ll(d.price)}</span>
          {d.desc && <span className="col-span-2 mt-1 label font-light text-stone">{d.desc}</span>}
        </li>
      ))}
    </ul>
  );
}

function CourseBlock({ c, level = 2 }: { c: Course; level?: 2 | 3 }) {
  const H = level === 2 ? "h2" : "h3";
  return (
    <section id={c.id} className={level === 2 ? "scroll-mt-28 pt-16 first:pt-0 md:pt-24" : "scroll-mt-28 pt-12"}>
      <H className={level === 2 ? "section-title" : "text-[2rem] leading-tight"} data-reveal={level === 2 ? true : undefined}>
        {c.title}
      </H>
      {c.note && <p className="lede mt-3">{c.note}</p>}
      <div className={level === 2 ? "mt-8 border-t border-rule" : "mt-5 border-t border-rule"}>
        <Rows items={c.dishes} />
      </div>
    </section>
  );
}

/** Glass, half bottle, bottle: a column only appears when something on the shelf is sold that way. */
function PourTable({ pours, caption }: { pours: Pour[]; caption: string }) {
  const cols = (["glass", "half", "bottle"] as const).filter((k) => pours.some((p) => p[k]));
  const head = { glass: "Glass", half: "½ bottle", bottle: "Bottle" };
  return (
    <div className="mt-5 overflow-x-auto">
      <table className="w-full min-w-[22rem] border-t border-rule text-left">
        <caption className="sr-only">{caption}</caption>
        <thead>
          <tr className="border-b border-rule label text-stone">
            <th className="py-3 font-normal">Name</th>
            {cols.map((k) => (
              <th key={k} className="py-3 pl-4 text-right font-normal">
                {head[k]}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {pours.map((p) => (
            <tr key={p.name} className="border-b border-rule align-top">
              <td className="py-3 pr-4">
                {p.name}
                {p.note && <span className="mt-0.5 block label font-light text-stone">{p.note}</span>}
              </td>
              {cols.map((k) => (
                <td key={k} className="py-3 pl-4 text-right tabular-nums text-sand/90">
                  {p[k] ? ll(p[k]) : ""}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function MenuPage() {
  return (
    <div className="bg-cedar">
      <header className="lamp relative overflow-hidden pt-28 md:pt-36">
        <div className="wrap grid items-end gap-10 pb-14 md:grid-cols-[minmax(0,1fr)_minmax(0,22rem)] md:pb-20">
          <div>
            <p className="label text-brass">Feniqia, Old Souk, Byblos</p>
            <h1 className="display mt-3 text-[clamp(4rem,11vw,9.5rem)] leading-[0.88]">
              <span className="line-mask">
                <span>The menu</span>
              </span>
            </h1>
            <p className="lede mt-6">From sabah el kheir at the taboune to the last arak of the night. Prices in Lebanese pounds.</p>
          </div>
          <div className="relative hidden aspect-[4/5] overflow-hidden md:block" data-reveal="clip">
            <Image src={OWN.pans} alt="A hanging iron tray of small pans of soujouk, mkanek and batata harra" fill priority sizes="22rem" className="object-cover" />
          </div>
        </div>
      </header>

      <div className="wrap grid gap-12 py-14 md:grid-cols-[13rem_minmax(0,1fr)] md:gap-20 md:py-24">
        <aside className="md:sticky md:top-28 md:self-start">
          <nav aria-label="Menu sections">
            <ul className="-mx-1 flex flex-wrap gap-x-5 gap-y-1 md:mx-0 md:block md:space-y-1">
              {INDEX.map(([id, title]) => (
                <li key={id}>
                  <a href={`#${id}`} className="inline-flex min-h-11 items-center px-1 transition-colors hover:text-brass md:min-h-9 md:px-0">
                    {title}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </aside>

        <div className="min-w-0">
          {FOOD.map((c) => (
            <CourseBlock key={c.id} c={c} />
          ))}

          <section id="bar" className="scroll-mt-28 pt-16 md:pt-24">
            <h2 className="section-title" data-reveal>
              Arak and wine
            </h2>
            <p className="lede mt-3">Arak by the glass, the quarter, the half or the bottle. Lebanese wine first, as it should be.</p>
            <h3 className="mt-12 text-[2rem] leading-tight">Arak</h3>
            <PourTable pours={ARAK} caption="Arak" />
            {WINE.map((s) => (
              <div key={s.id} id={s.id} className="scroll-mt-28 pt-12">
                <h3 className="text-[2rem] leading-tight">{s.title}</h3>
                {s.note && <p className="mt-2 label text-stone">{s.note}</p>}
                <PourTable pours={s.pours} caption={s.title} />
              </div>
            ))}
          </section>

          <section id="cocktails" className="scroll-mt-28 pt-16 md:pt-24">
            <h2 className="section-title" data-reveal>
              Cocktails
            </h2>
            {COCKTAILS.map((c) => (
              <CourseBlock key={c.id} c={c} level={3} />
            ))}
          </section>

          <section id="spirits" className="scroll-mt-28 pt-16 md:pt-24">
            <h2 className="section-title" data-reveal>
              Spirits
            </h2>
            <div className="grid gap-x-16 2xl:grid-cols-2">
              {SPIRITS.map((s) => (
                <div key={s.id} id={s.id} className="scroll-mt-28 pt-12">
                  <h3 className="text-[2rem] leading-tight">{s.title}</h3>
                  <PourTable pours={s.pours} caption={s.title} />
                </div>
              ))}
            </div>
          </section>

          <section id="soft" className="scroll-mt-28 pt-16 md:pt-24">
            <h2 className="section-title" data-reveal>
              Beer, coffee and soft drinks
            </h2>
            {SOFT.map((c) => (
              <CourseBlock key={c.id} c={c} level={3} />
            ))}
          </section>

          <section id="nargile" className="scroll-mt-28 pt-16 md:pt-24">
            <h2 className="section-title" data-reveal>
              Nargile
            </h2>
            <div className="mt-8 border-t border-rule">
              <Rows items={SHISHA} />
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
