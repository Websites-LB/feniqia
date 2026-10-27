import type { Metadata } from "next";

import { PageHeader } from "@/components/site/page-header";
import { ARAK, COCKTAILS, FOOD, SHISHA, SOFT, SPIRITS, WINE, ll, type Course, type Dish, type Pour } from "@/lib/menu";

export const metadata: Metadata = {
  title: "Menu, Feniqia, Byblos Old Souk",
  description: "Breakfast from the taboune, mezze, dishes bil makle, platters, pizza and dessert, then arak, Lebanese wine, cocktails and spirits, with prices in Lebanese pounds.",
};

const INDEX: [string, string][] = [
  ...FOOD.map((c): [string, string] => [c.id, c.title]),
  ["bar", "Arak and wine"],
  ["cocktails", "Cocktails"],
  ["spirits", "Spirits"],
  ["soft", "Beer, coffee, soft"],
  ["nargile", "Nargile"],
];

function Rows({ items, dark = false }: { items: Dish[]; dark?: boolean }) {
  return (
    <ul className="grid gap-x-14 md:grid-cols-2">
      {items.map((d) => (
        <li key={d.name} className={dark ? "border-b border-paper/10 py-4" : "border-b border-line py-4"}>
          <p className="flex items-baseline gap-3">
            <span className="text-[1.0625rem]">
              {d.name}
              {d.isNew && <span className="sign ml-3 text-pome">New</span>}
            </span>
            <span className="flex-1" aria-hidden />
            <span className={dark ? "tabular-nums text-lantern" : "tabular-nums text-ink-soft"}>{ll(d.price)}</span>
          </p>
          {d.desc && <p className={dark ? "mt-1 max-w-[52ch] text-[0.92rem] text-paper/60" : "mt-1 max-w-[52ch] text-[0.92rem] text-ink-soft"}>{d.desc}</p>}
        </li>
      ))}
    </ul>
  );
}

function CourseBlock({ c, i }: { c: Course; i: number }) {
  return (
    <section id={c.id} className="scroll-mt-44 pt-20 first:pt-0 md:pt-28">
      <div className="text-center">
        <p className="sign text-pome">{String(i + 1).padStart(2, "0")}</p>
        <h2 className="display mt-3 text-[clamp(2.25rem,4vw,3.5rem)] leading-none" data-reveal>
          {c.title}
        </h2>
        {c.note && <p className="swash mt-3 text-[1.2rem] text-ink-soft">{c.note}</p>}
      </div>
      <div className="mt-10 border-t border-line">
        <Rows items={c.dishes} />
      </div>
    </section>
  );
}

function SubBlock({ c }: { c: Course }) {
  return (
    <div id={c.id} className="scroll-mt-28 pt-10">
      <h3 className="swash text-[2rem] leading-tight text-lantern">{c.title}</h3>
      {c.note && <p className="mt-1 text-[0.92rem] text-paper/60">{c.note}</p>}
      <div className="mt-3 border-t border-paper/15">
        <Rows items={c.dishes} dark />
      </div>
    </div>
  );
}

/** Glass, half bottle, bottle: a column only appears when something on the shelf is sold that way. */
function PourTable({ pours, caption }: { pours: Pour[]; caption: string }) {
  const cols = (["glass", "half", "bottle"] as const).filter((k) => pours.some((p) => p[k]));
  const head = { glass: "Glass", half: "½ bottle", bottle: "Bottle" };
  return (
    <div className="mt-4 overflow-x-auto">
      <table className="w-full min-w-[22rem] border-t border-paper/15 text-left">
        <caption className="sr-only">{caption}</caption>
        <thead>
          <tr className="sign border-b border-paper/15 text-paper/55">
            <th className="py-3 font-[inherit]">Name</th>
            {cols.map((k) => (
              <th key={k} className="py-3 pl-4 text-right font-[inherit]">
                {head[k]}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {pours.map((p) => (
            <tr key={p.name} className="border-b border-paper/10 align-top">
              <td className="py-3 pr-4">
                {p.name}
                {p.note && <span className="mt-0.5 block text-[0.88rem] text-paper/55">{p.note}</span>}
              </td>
              {cols.map((k) => (
                <td key={k} className="py-3 pl-4 text-right tabular-nums text-lantern">
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

function Index({ items }: { items: [string, string][] }) {
  return (
    <nav aria-label="Menu sections" className="sticky top-[68px] z-30 border-y border-line bg-paper md:top-[84px]">
      <ul className="wrap flex justify-start gap-1 overflow-x-auto [scrollbar-width:none] xl:justify-center">
        {items.map(([id, title]) => (
          <li key={id} className="shrink-0">
            <a href={`#${id}`} className="sign inline-flex min-h-12 items-center px-3 text-ink-soft transition-colors hover:text-pome">
              {title}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default function MenuPage() {
  return (
    <div className="bg-paper">
      <PageHeader eyebrow="Menu" title="The menu" intro="From breakfast at the taboune to the last arak of the night. Prices in Lebanese pounds." />

      <Index items={INDEX} />

      <div className="wrap max-w-5xl py-20 md:py-28">
        {FOOD.map((c, i) => (
          <CourseBlock key={c.id} c={c} i={i} />
        ))}
      </div>

      {/* the bar keeps night hours */}
      <div className="bg-night text-paper">
        <div className="wrap py-20 md:py-28">
          <section id="bar" className="scroll-mt-44">
            <p className="sign text-lantern">The bar</p>
            <h2 className="title mt-3" data-reveal>
              Arak <span className="swash">and wine</span>
            </h2>
            <p className="mt-4 max-w-[46ch] text-paper/70">Arak by the glass, the quarter, the half or the bottle. Lebanese wine first, as it should be.</p>
            <div className="grid gap-x-16 xl:grid-cols-2">
              <div className="pt-10">
                <h3 className="swash text-[2rem] leading-tight text-lantern">Arak</h3>
                <PourTable pours={ARAK} caption="Arak" />
              </div>
              {WINE.map((s) => (
                <div key={s.id} id={s.id} className="scroll-mt-44 pt-10">
                  <h3 className="swash text-[2rem] leading-tight text-lantern">{s.title}</h3>
                  {s.note && <p className="mt-1 text-[0.92rem] text-paper/60">{s.note}</p>}
                  <PourTable pours={s.pours} caption={s.title} />
                </div>
              ))}
            </div>
          </section>

          <section id="cocktails" className="scroll-mt-44 pt-20 md:pt-28">
            <h2 className="title" data-reveal>
              Cocktails
            </h2>
            {COCKTAILS.map((c) => (
              <SubBlock key={c.id} c={c} />
            ))}
          </section>

          <section id="spirits" className="scroll-mt-44 pt-20 md:pt-28">
            <h2 className="title" data-reveal>
              Spirits
            </h2>
            <div className="grid gap-x-16 xl:grid-cols-2">
              {SPIRITS.map((s) => (
                <div key={s.id} id={s.id} className="scroll-mt-44 pt-10">
                  <h3 className="swash text-[2rem] leading-tight text-lantern">{s.title}</h3>
                  <PourTable pours={s.pours} caption={s.title} />
                </div>
              ))}
            </div>
          </section>

          <section id="soft" className="scroll-mt-44 pt-20 md:pt-28">
            <h2 className="title" data-reveal>
              Beer, coffee <span className="swash">and soft drinks</span>
            </h2>
            {SOFT.map((c) => (
              <SubBlock key={c.id} c={c} />
            ))}
          </section>

          <section id="nargile" className="scroll-mt-44 pt-20 md:pt-28">
            <h2 className="title" data-reveal>
              Nargile
            </h2>
            <div className="mt-6 border-t border-paper/15">
              <Rows items={SHISHA} dark />
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
