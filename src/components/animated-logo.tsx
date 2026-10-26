import deer from "@/assets/indriya-logo-deer.png";
import word from "@/assets/indriya-logo-word.png";

/**
 * Indriya logo in the spirit of the brand's own intro film: a gold deer that
 * glides in and keeps a slow gallop, a light that sweeps across the gold, a few
 * twinkling sparkles, and the wordmark revealed left to right.
 * The PNGs are used as masks so the shapes can be filled with a gold gradient.
 * Respects prefers-reduced-motion. Height is set with a Tailwind h-* class.
 */
export function AnimatedLogo({
  light = false,
  className = "h-10",
}: {
  light?: boolean;
  className?: string;
}) {
  const gold = light ? "logo-gold-light" : "logo-gold";
  return (
    <span
      role="img"
      aria-label="Indriya"
      className={`deer-logo relative inline-flex items-center gap-2 sm:gap-2.5 ${className}`}
    >
      <span className="deer-walk-in relative inline-block h-full">
        <span
          aria-hidden="true"
          className={`deer-stride logo-mask ${gold} block h-full`}
          style={{
            aspectRatio: "50 / 79",
            maskImage: `url(${deer})`,
            WebkitMaskImage: `url(${deer})`,
          }}
        />
        {/* sparkles around the deer */}
        <span
          aria-hidden="true"
          className="logo-sparkle"
          style={{ left: "-18%", top: "12%", animationDelay: "0.2s" }}
        />
        <span
          aria-hidden="true"
          className="logo-sparkle"
          style={{ left: "88%", top: "4%", animationDelay: "1.4s" }}
        />
        <span
          aria-hidden="true"
          className="logo-sparkle"
          style={{ left: "70%", top: "62%", animationDelay: "2.6s" }}
        />
        <span
          aria-hidden="true"
          className="logo-sparkle"
          style={{ left: "-6%", top: "70%", animationDelay: "3.5s" }}
        />
      </span>
      <span
        aria-hidden="true"
        className={`deer-word logo-mask ${gold} block h-[42%]`}
        style={{
          aspectRatio: "208 / 33",
          maskImage: `url(${word})`,
          WebkitMaskImage: `url(${word})`,
        }}
      />
    </span>
  );
}
