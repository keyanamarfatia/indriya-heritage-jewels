import type { ReactNode } from "react";
import { ArrowUpRight } from "lucide-react";

/**
 * Links that leave this student site for indriya.com.
 * They use Indriya's own navy (never our red/gold) plus an ↗ arrow, so they never look
 * like part of this site, and they announce the new tab to screen readers.
 */
type Variant = "button" | "inline" | "pill" | "light" | "icon";

const STYLES: Record<Variant, string> = {
  button: "btn-offsite",
  inline:
    "inline-flex items-center gap-1 text-navy underline decoration-navy/40 decoration-dotted underline-offset-4 hover:decoration-solid",
  pill: "inline-flex items-center gap-1.5 rounded-full border border-navy/30 bg-navy/[0.06] px-3.5 py-2 text-xs font-medium text-navy transition-colors hover:bg-navy hover:text-ivory",
  light:
    "inline-flex items-center gap-1 text-[#b9c8ef] underline decoration-[#b9c8ef]/50 decoration-dotted underline-offset-4 hover:text-white",
  icon: "relative inline-flex items-center gap-1.5 text-navy hover:opacity-80",
};

export function OffsiteLink({
  href,
  children,
  variant = "inline",
  className = "",
  label,
  arrow = true,
}: {
  href: string;
  children?: ReactNode;
  variant?: Variant;
  className?: string;
  /** Accessible name when the link has no visible text (icon links). */
  label?: string;
  /** Hide the ↗ arrow when a surrounding element already marks the link as external. */
  arrow?: boolean;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      title="Opens the official indriya.com in a new tab"
      aria-label={label ? `${label} (opens indriya.com in a new tab)` : undefined}
      className={`${STYLES[variant]} ${className}`}
    >
      {children}
      {arrow && (
        <ArrowUpRight
          className={variant === "button" ? "h-4 w-4" : "h-3.5 w-3.5 shrink-0"}
          aria-hidden="true"
        />
      )}
      {!label && <span className="sr-only"> (opens indriya.com in a new tab)</span>}
    </a>
  );
}

/** Small marker shown on images that link out to indriya.com. */
export function OffsiteBadge({ className = "" }: { className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={`inline-flex items-center gap-1 rounded-full bg-navy/90 px-2.5 py-1 text-[10px] font-medium tracking-wide text-white ${className}`}
    >
      indriya.com <ArrowUpRight className="h-3 w-3" />
    </span>
  );
}
