// Shared visual pieces that give the site its own look: script-accent headings,
// a kolam-style divider, arch-framed product cards and the promise icons.
import { ExternalLink, Heart } from "lucide-react";
import type { ReactNode } from "react";
import type { Product } from "@/lib/products";

/** Heading with one word in script, e.g. "Temple <Treasures>". Renders as a normal heading for SEO. */
export function ScriptHeading({
  as: Tag = "h2",
  before,
  script,
  after,
  className = "",
}: {
  as?: "h1" | "h2" | "h3";
  before?: string;
  script: string;
  after?: string;
  className?: string;
}) {
  return (
    <Tag className={`font-display text-4xl leading-tight text-ink sm:text-5xl ${className}`}>
      {before && <>{before} </>}
      <span className="font-script text-[1.35em] font-normal text-maroon">{script}</span>
      {after && <> {after}</>}
    </Tag>
  );
}

/** A small kolam-style dot-and-petal divider — our own motif. */
export function KolamDivider({ className = "" }: { className?: string }) {
  return (
    <div
      className={`flex items-center justify-center gap-3 text-gold ${className}`}
      aria-hidden="true"
    >
      <span className="h-px w-16 bg-gold/60 sm:w-24" />
      <svg width="34" height="34" viewBox="0 0 34 34" fill="none">
        <circle cx="17" cy="17" r="2.5" fill="currentColor" />
        <path
          d="M17 3c3 5 3 9 0 14-3-5-3-9 0-14Zm0 28c-3-5-3-9 0-14 3 5 3 9 0 14ZM3 17c5-3 9-3 14 0-5 3-9 3-14 0Zm28 0c-5 3-9 3-14 0 5-3 9-3 14 0Z"
          stroke="currentColor"
          strokeWidth="1.2"
        />
        <circle cx="6" cy="6" r="1.3" fill="currentColor" />
        <circle cx="28" cy="6" r="1.3" fill="currentColor" />
        <circle cx="6" cy="28" r="1.3" fill="currentColor" />
        <circle cx="28" cy="28" r="1.3" fill="currentColor" />
      </svg>
      <span className="h-px w-16 bg-gold/60 sm:w-24" />
    </div>
  );
}

export function SectionIntro({ children }: { children: ReactNode }) {
  return (
    <p className="mx-auto mt-4 max-w-2xl text-center text-lg text-muted-foreground">{children}</p>
  );
}

/** Product card with an arch-topped image frame and a "View on Indriya" button to the official site. */
export function ProductCard({
  product,
  headingLevel = "h3",
}: {
  product: Product;
  headingLevel?: "h2" | "h3";
}) {
  const H = headingLevel;
  return (
    <article className="group flex flex-col">
      <div className="relative overflow-hidden rounded-t-[999px] border border-border bg-[#fbeee3]">
        <img
          src={product.image}
          alt={product.alt}
          width={584}
          height={584}
          loading="lazy"
          decoding="async"
          className="aspect-square w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <a
          href={product.indriyaUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Save ${product.name} to your wishlist on Indriya`}
          className="absolute right-3 top-1/2 inline-flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-ivory/90 text-maroon shadow-sm opacity-0 transition-opacity group-hover:opacity-100 focus:opacity-100"
        >
          <Heart className="h-5 w-5" aria-hidden="true" />
        </a>
      </div>
      <H className="mt-4 font-sans text-base font-semibold leading-snug text-ink">{product.name}</H>
      <p className="mt-1 flex-1 text-sm text-muted-foreground">{product.description}</p>
      <a
        href={product.indriyaUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-3 inline-flex h-11 items-center justify-center gap-2 rounded-full bg-maroon px-5 text-sm font-medium text-ivory transition-colors hover:bg-maroon/90"
      >
        View on Indriya <ExternalLink className="h-4 w-4" aria-hidden="true" />
      </a>
    </article>
  );
}

/** Line icons for the three promises, drawn in terracotta. */
export function PromiseIcon({ kind }: { kind: "certified" | "pricing" | "exchange" }) {
  const common = {
    width: 56,
    height: 56,
    viewBox: "0 0 56 56",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.6,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    className: "shrink-0 text-terracotta",
    "aria-hidden": true,
  };
  if (kind === "certified")
    return (
      <svg {...common}>
        <rect x="9" y="6" width="28" height="38" rx="2" />
        <path d="M15 15h16M15 21h16M15 27h9" />
        <circle cx="38" cy="36" r="9" />
        <path d="m34 36 3 3 5-6M33 44l-2 8 7-3 7 3-2-8" />
      </svg>
    );
  if (kind === "pricing")
    return (
      <svg {...common}>
        <path d="M18 8h20l4 10v14H14V18l4-10Z" />
        <path d="M28 25c-3-3-7 0-4 3l4 4 4-4c3-3-1-6-4-3Z" />
        <path d="M6 44h12l8 3h14l10-6M6 52h10" />
      </svg>
    );
  return (
    <svg {...common}>
      <circle cx="28" cy="28" r="20" />
      <ellipse cx="26" cy="30" rx="10" ry="6" transform="rotate(-30 26 30)" />
      <ellipse cx="31" cy="26" rx="10" ry="6" transform="rotate(-30 31 26)" />
      <path d="M44 14l4-1-1 4M12 42l-4 1 1-4" />
    </svg>
  );
}
