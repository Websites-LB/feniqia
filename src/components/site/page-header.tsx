import Image from "next/image";

/** The opening of an inner page: a title rising out of its mask, a line beneath, and an optional wide photograph. */
export function PageHeader({ eyebrow, title, intro, image }: { eyebrow: string; title: string; intro?: string; image?: { src: string; alt: string } }) {
  return (
    <header className="bg-paper pt-36 md:pt-48">
      <div className="wrap pb-16 text-center md:pb-24">
        <p className="sign animate-[fade_1s_ease_both] text-pome">{eyebrow}</p>
        <h1 className="display mt-5 text-[clamp(3.25rem,8vw,7rem)] leading-[0.98]">
          <span className="line-mask">
            <span>{title}</span>
          </span>
        </h1>
        {intro && (
          <p className="lede mx-auto mt-6 animate-[fade_1.2s_ease_both]" style={{ animationDelay: "0.4s" }}>
            {intro}
          </p>
        )}
      </div>
      {image && (
        <div className="relative h-[56svh] min-h-[360px] overflow-hidden bg-dust md:h-[78svh]" data-reveal="clip">
          <div className="absolute inset-[-12%_0]" data-parallax="0.2">
            <Image src={image.src} alt={image.alt} fill priority sizes="100vw" className="object-cover" />
          </div>
        </div>
      )}
    </header>
  );
}
