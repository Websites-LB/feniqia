import { cn } from "@/lib/utils";

/**
 * A Phoenician merchant galley, drawn for the site after the ship in the restaurant's seal:
 * crescent hull, curled stern, horse-head prow, one square sail and a bank of oars.
 */
export function Ship({ className, sail = true }: { className?: string; sail?: boolean }) {
  return (
    <svg viewBox="0 0 120 84" className={cn("block h-auto", className)} aria-hidden fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      {/* rigging, behind the sail */}
      <path d="M60 9 L13 37 M60 9 L107 33" strokeWidth="0.8" opacity="0.7" />
      {sail && (
        <>
          <path d="M36 16 Q60 11 84 16 L82 47 Q60 42 38 47 Z" fill="currentColor" fillOpacity="0.14" />
          <path d="M48 14.5 V45 M60 13 V43.5 M72 14.5 V45" strokeWidth="0.9" opacity="0.8" />
        </>
      )}
      <path d="M33 15 Q60 9.5 87 15" />
      <path d="M60 57 V8" />
      {/* hull, with its curled stern and horse-head prow */}
      <path d="M10 52 C30 62 90 62 110 52 C104 64 80 70 60 70 C40 70 16 64 10 52 Z" fill="currentColor" />
      <path d="M10 52 C5 46 5 37 12 33 C15 37 13 41 10 43" />
      <path d="M110 52 C117 44 117 33 108 29 C105 31 106 35 110 36" />
      <path d="M22 58 H98" strokeWidth="0.8" opacity="0.5" />
      {/* oars */}
      <path d="M30 63 L23 76 M42 66 L35 79 M54 67 L47 80 M66 67 L59 80 M78 66 L71 79 M90 63 L83 76" strokeWidth="1.2" />
    </svg>
  );
}

/** The seal: the galley inside a ring, as on their napkins and coasters. */
export function Seal({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" className={cn("block h-auto", className)} aria-hidden>
      <circle cx="50" cy="50" r="47" fill="none" stroke="currentColor" strokeWidth="2.2" />
      <g transform="translate(17 22) scale(0.55)">
        <ShipPaths />
      </g>
    </svg>
  );
}

/** Wordmark set in type, seal drawn, so it stays crisp at any size. */
export function Logo({ className, title = "Feniqia, Marchand de Liban", tagline = true }: { className?: string; title?: string | null; tagline?: boolean }) {
  return (
    <svg
      viewBox={tagline ? "0 0 252 100" : "0 0 252 72"}
      className={cn("block h-auto", className)}
      role={title ? "img" : undefined}
      aria-label={title ?? undefined}
      aria-hidden={title ? undefined : true}
    >
      <text x="0" y="60" fill="currentColor" fontSize="66" fontWeight="300" textLength="178" lengthAdjust="spacingAndGlyphs" style={{ fontFamily: "var(--font-sans)" }}>
        Feniqia
      </text>
      <g transform="translate(186 6)">
        <circle cx="31" cy="31" r="29" fill="none" stroke="currentColor" strokeWidth="2" />
        <g transform="translate(10 14) scale(0.35)">
          <ShipPaths />
        </g>
      </g>
      {tagline && (
        <text x="3" y="94" fill="currentColor" fontSize="17" fontWeight="400" textLength="244" lengthAdjust="spacing" style={{ fontFamily: "var(--font-sans)" }}>
          Marchand de Liban
        </text>
      )}
    </svg>
  );
}

/** The galley's paths without their own <svg>, heavier for small sizes, for nesting inside another drawing. */
function ShipPaths() {
  return (
    <g fill="none" stroke="currentColor" strokeWidth="3.4" strokeLinecap="round" strokeLinejoin="round">
      <path d="M33 15 Q60 9.5 87 15" />
      <path d="M36 16 Q60 11 84 16 L82 47 Q60 42 38 47 Z" fill="currentColor" fillOpacity="0.18" />
      <path d="M60 57 V8" />
      <path d="M10 52 C30 62 90 62 110 52 C104 64 80 70 60 70 C40 70 16 64 10 52 Z" fill="currentColor" />
      <path d="M10 52 C5 46 5 37 12 33 C15 37 13 41 10 43" />
      <path d="M110 52 C117 44 117 33 108 29 C105 31 106 35 110 36" />
      <path d="M30 63 L23 76 M54 67 L47 80 M78 66 L71 79 M90 63 L83 76 M42 66 L35 79 M66 67 L59 80" strokeWidth="2.6" />
    </g>
  );
}
