import Image from "next/image";

import { INSTAGRAM, SITE } from "@/lib/site";

type Post = (typeof INSTAGRAM)[number];

function Card({ post }: { post: Post }) {
  return (
    <a
      href={`https://www.instagram.com/${post.kind}/${post.id}/`}
      target="_blank"
      rel="noreferrer"
      className="group/card relative block aspect-[4/5] w-[220px] shrink-0 overflow-hidden bg-raised md:w-[290px]"
    >
      <Image src={`/instagram/${post.id}.jpg`} alt={post.caption} fill sizes="290px" className="object-cover transition-transform duration-[1.2s] ease-[var(--ease-silk)] group-hover/card:scale-105" />
      <span className="absolute inset-0 bg-gradient-to-t from-cedar/90 via-cedar/10 to-transparent opacity-0 transition-opacity duration-500 group-hover/card:opacity-100 group-focus-visible/card:opacity-100" />
      <span className="absolute inset-x-0 bottom-0 translate-y-4 p-5 font-display text-xl leading-snug text-sand opacity-0 transition-[opacity,transform] duration-500 ease-[var(--ease-silk)] group-hover/card:translate-y-0 group-hover/card:opacity-100 group-focus-visible/card:translate-y-0 group-focus-visible/card:opacity-100">
        {post.caption}
      </span>
    </a>
  );
}

/** One row of posts drifting sideways; it holds still under the pointer or keyboard focus. */
function Row({ posts, reverse = false, speed = 70 }: { posts: Post[]; reverse?: boolean; speed?: number }) {
  return (
    <div className="group/row overflow-hidden">
      <div
        className="flex w-max gap-4 animate-[drift_linear_infinite] group-hover/row:[animation-play-state:paused] group-focus-within/row:[animation-play-state:paused] md:gap-5"
        style={{ animationDuration: `${speed}s`, animationDirection: reverse ? "reverse" : "normal" }}
      >
        {[0, 1].map((k) => (
          <div key={k} className="flex shrink-0 gap-4 pr-4 md:gap-5 md:pr-5" aria-hidden={k === 1 || undefined}>
            {posts.map((p) => (
              <Card key={`${k}-${p.id}`} post={p} />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export function Instagram() {
  const half = Math.ceil(INSTAGRAM.length / 2);
  return (
    <section id="instagram" className="relative overflow-hidden bg-cedar py-28 md:py-40">
      <div className="wrap grid items-end gap-10 md:grid-cols-[minmax(0,1fr)_auto]">
        <div>
          <h2 className="section-title" data-reveal>
            Straight from
            <br />
            the souk
          </h2>
          <p className="lede mt-6" data-reveal data-delay="0.1">
            Weekend tables, pans still sizzling and Byblos after sunset, from our feed. Follow along and come see it for yourself.
          </p>
        </div>
        <a href={SITE.instagram} target="_blank" rel="noreferrer" className="btn btn-line justify-self-start" data-reveal data-delay="0.2">
          Follow {SITE.instagramHandle}
        </a>
      </div>

      <div className="mt-16 space-y-4 md:mt-20 md:space-y-5" data-reveal="clip">
        <Row posts={INSTAGRAM.slice(0, half)} speed={80} />
        <Row posts={INSTAGRAM.slice(half)} speed={95} reverse />
      </div>
    </section>
  );
}
