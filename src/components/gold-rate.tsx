import { useEffect, useRef, useState } from "react";
import { ExternalLink, X } from "lucide-react";
import { OFFICIAL_URL } from "@/lib/site";

/**
 * Gold rate as shown on indriya.com's own "Today's gold rate" pop-up.
 * There is no public feed we can connect to, so this is a dated snapshot — update both values
 * from indriya.com when you refresh the site.
 */
const GOLD_RATE = {
  perGram22kt: 13070,
  updated: "25 October 2026, 4:00 PM",
};

const inr = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  maximumFractionDigits: 0,
});

export function GoldRateWidget() {
  const [open, setOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    const onClick = (e: MouseEvent) => {
      if (panelRef.current && !panelRef.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onClick);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onClick);
    };
  }, [open]);

  return (
    <div ref={panelRef} className="relative">
      {open && (
        <div
          role="dialog"
          aria-label="Today's gold rate"
          className="absolute bottom-0 right-[4.5rem] w-[19rem] border border-gold/40 bg-ivory p-6 text-left shadow-[0_24px_60px_-20px_rgba(74,20,32,0.45)] sm:w-80"
        >
          <button
            type="button"
            onClick={() => setOpen(false)}
            aria-label="Close gold rate"
            className="absolute right-3 top-3 text-maroon/70 hover:text-maroon"
          >
            <X className="h-5 w-5" aria-hidden="true" />
          </button>
          <p className="eyebrow">Today&rsquo;s gold rate</p>
          <p className="mt-3 font-display text-4xl font-light text-maroon">
            {inr.format(GOLD_RATE.perGram22kt)}
            <span className="ml-1 font-sans text-sm text-muted-foreground">per gram</span>
          </p>
          <p className="mt-1 text-sm text-ink">22 karat gold</p>
          <div className="my-4 h-px bg-gold/30" />
          <p className="text-xs leading-relaxed text-muted-foreground">
            As listed by Indriya, last updated {GOLD_RATE.updated}. Rates change through the day;
            your store will confirm the rate on your bill.
          </p>
          <a
            href={OFFICIAL_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex items-center gap-2 border-b border-gold pb-1 text-[11px] font-medium uppercase tracking-[0.22em] text-maroon hover:text-gold"
          >
            Check the live rate on Indriya{" "}
            <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
          </a>
        </div>
      )}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-label="Show today's gold rate"
        className="group flex items-center gap-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2"
      >
        {!open && (
          <span className="hidden border border-gold/40 bg-ivory px-3 py-1.5 font-display text-base italic text-maroon shadow-sm sm:inline">
            Today&rsquo;s gold rate
          </span>
        )}
        <span className="flex h-14 w-14 items-center justify-center rounded-full bg-maroon shadow-lg ring-1 ring-gold/60 transition-transform group-hover:scale-105">
          <svg width="30" height="30" viewBox="0 0 30 30" aria-hidden="true">
            <path d="M4 20 9 12h12l5 8Z" fill="#d9a441" />
            <path d="M9 12 11 8h8l2 4Z" fill="#f0c766" />
            <path d="M4 20h22v3H4Z" fill="#b8862b" />
            <path
              d="m24 4 .8 1.8L26.6 6.6 24.8 7.4 24 9.2 23.2 7.4 21.4 6.6 23.2 5.8Z"
              fill="#fbf5ec"
            />
          </svg>
        </span>
      </button>
    </div>
  );
}
