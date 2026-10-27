// Shared visual pieces that give the site its own look: script-accent headings,
// a kolam-style divider, arch-framed product cards and the promise icons.
import { Link } from "@tanstack/react-router";
import { OffsiteLink } from "@/components/offsite";
import type { ReactNode } from "react";
import { formatINR, productSrcSet, type Product } from "@/lib/products";

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
    <Tag
      className={`font-display text-4xl font-light leading-tight tracking-wide text-ink sm:text-[3.25rem] ${className}`}
    >
      {before && <>{before} </>}
      <span className="font-script text-[1.3em] font-normal tracking-normal text-gold-deep">
        {script}
      </span>
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
      <span className="h-px w-20 bg-gold/50 sm:w-32" />
      <svg width="22" height="22" viewBox="0 0 34 34" fill="none">
        <circle cx="17" cy="17" r="2.5" fill="currentColor" />
        <path
          d="M17 3c3 5 3 9 0 14-3-5-3-9 0-14Zm0 28c-3-5-3-9 0-14 3 5 3 9 0 14ZM3 17c5-3 9-3 14 0-5 3-9 3-14 0Zm28 0c-5 3-9 3-14 0 5-3 9-3 14 0Z"
          stroke="currentColor"
          strokeWidth="1"
        />
        <circle cx="6" cy="6" r="1.3" fill="currentColor" />
        <circle cx="28" cy="6" r="1.3" fill="currentColor" />
        <circle cx="6" cy="28" r="1.3" fill="currentColor" />
        <circle cx="28" cy="28" r="1.3" fill="currentColor" />
      </svg>
      <span className="h-px w-20 bg-gold/50 sm:w-32" />
    </div>
  );
}

export function SectionIntro({ children }: { children: ReactNode }) {
  return (
    <p className="mx-auto mt-4 max-w-2xl text-center text-lg text-muted-foreground">{children}</p>
  );
}

/** Hero image in an arch, with one fine gold line set just inside the edge. */
export function HeroArch({
  src,
  alt,
  width,
  height,
  className = "",
  imgClassName = "",
  srcSet,
  sizes,
  blend = false,
}: {
  blend?: boolean;
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
  imgClassName?: string;
  srcSet?: string;
  sizes?: string;
}) {
  return (
    <div
      className={`relative overflow-hidden rounded-t-[999px] bg-[#efe1cd] shadow-[0_30px_70px_-30px_rgba(0,0,0,0.55)] ${className}`}
      style={{ aspectRatio: `${width} / ${height}` }}
    >
      <img
        src={src}
        srcSet={srcSet}
        sizes={sizes}
        alt={alt}
        width={width}
        height={height}
        fetchPriority="high"
        className={`h-full w-full object-cover ${imgClassName}`}
        style={{ mixBlendMode: blend ? "multiply" : undefined }}
      />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-3 rounded-t-[999px] border border-[#e8d3a6]/80"
      />
    </div>
  );
}

/** Product card: arch-topped frame with a hairline gold border, quiet serif name, understated link. */
export function ProductCard({
  product,
  headingLevel = "h3",
}: {
  product: Product;
  headingLevel?: "h2" | "h3";
}) {
  const H = headingLevel;
  return (
    <article className="group flex flex-col text-center">
      <Link
        to="/jewellery/$slug"
        params={{ slug: product.slug }}
        aria-label={`${product.name}: see details`}
        className="relative block overflow-hidden rounded-t-[999px] bg-[#efe1cd] p-1.5 ring-1 ring-gold/30 transition-shadow duration-500 group-hover:shadow-[0_18px_40px_-20px_rgba(74,20,32,0.45)] sm:p-2"
      >
        <img
          src={product.image}
          srcSet={productSrcSet(product)}
          sizes="(min-width: 1024px) 260px, (min-width: 640px) 45vw, 46vw"
          alt={product.alt}
          width={584}
          height={584}
          loading="lazy"
          decoding="async"
          className="aspect-[4/5] w-full rounded-t-[999px] object-cover mix-blend-multiply transition-transform duration-700 group-hover:scale-[1.04]"
        />
      </Link>
      <H className="mt-4 font-display text-base font-normal leading-snug text-ink sm:mt-5 sm:text-xl">
        <Link to="/jewellery/$slug" params={{ slug: product.slug }} className="hover:text-maroon">
          {product.name}
        </Link>
      </H>
      {product.listing && (
        <p className="mt-1.5 text-sm font-medium text-maroon">
          {formatINR(product.listing.price)}
          <span className="font-normal text-muted-foreground"> approx.</span>
        </p>
      )}
      <p className="mx-auto mt-1 hidden max-w-[16rem] flex-1 text-[13px] leading-relaxed text-muted-foreground sm:block">
        {product.description}
      </p>
      <div className="mx-auto mt-3 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 sm:mt-4">
        <Link
          to="/jewellery/$slug"
          params={{ slug: product.slug }}
          className="border-b border-gold pb-0.5 text-[11px] font-medium uppercase tracking-[0.16em] text-maroon hover:text-gold-deep"
        >
          Details
        </Link>
        <OffsiteLink href={product.indriyaUrl} variant="pill">
          indriya.com
        </OffsiteLink>
      </div>
    </article>
  );
}

/** Line icons for the three promises, drawn in terracotta. */
export function PromiseIcon({ kind }: { kind: "certified" | "pricing" | "exchange" }) {
  const common = {
    width: 48,
    height: 48,
    viewBox: "0 0 56 56",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.1,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    className: "shrink-0 text-gold",
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
