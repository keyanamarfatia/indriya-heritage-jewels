import { useEffect, useRef, useState } from "react";
import { ExternalLink, X } from "lucide-react";
import { OFFICIAL_URL } from "@/lib/site";
import { fetchLiveGold, type LiveGold } from "@/lib/live-gold";

/**
 * Indriya's own store rate, as shown on indriya.com's "Today's gold rate" pop-up.
 * Indriya publishes no feed, so this is a dated snapshot — update both values from indriya.com.
 */
const INDRIYA_RATE = {
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
  const [live, setLive] = useState<LiveGold | null>(null);
  const [status, setStatus] = useState<"idle" | "loading" | "ok" | "error">("idle");

  // Fetch the live market rate each time the pop-up opens (cached for 10 minutes).
  useEffect(() => {
    if (!open) return;
    let cancelled = false;
    setStatus((s) => (s === "ok" ? s : "loading"));
    fetchLiveGold()
      .then((v) => {
        if (cancelled) return;
        setLive(v);
        setStatus(v ? "ok" : "error");
      })
      .catch(() => !cancelled && setStatus("error"));
    return () => {
      cancelled = true;
    };
  }, [open]);

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
          className="absolute bottom-0 right-[4.5rem] max-h-[80vh] w-[19rem] overflow-y-auto rounded-2xl border border-gold/40 bg-ivory p-6 text-left shadow-[0_24px_60px_-20px_rgba(74,20,32,0.45)] sm:w-80"
        >
          <button
            type="button"
            onClick={() => setOpen(false)}
            aria-label="Close gold rate"
            className="absolute right-3 top-3 text-maroon/70 hover:text-maroon"
          >
            <X className="h-5 w-5" aria-hidden="true" />
          </button>
          <p className="eyebrow">Live market rate</p>
          <div aria-live="polite">
            {status === "loading" && (
              <p className="mt-3 animate-pulse font-display text-3xl font-light text-maroon/50">
                Fetching&hellip;
              </p>
            )}
            {status === "ok" && live && (
              <>
                <dl className="mt-3 grid grid-cols-2 gap-4">
                  <div>
                    <dt className="text-xs text-muted-foreground">24 karat</dt>
                    <dd className="font-display text-3xl font-light text-maroon">
                      {inr.format(live.perGram24k)}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-xs text-muted-foreground">22 karat</dt>
                    <dd className="font-display text-3xl font-light text-maroon">
                      {inr.format(live.perGram22k)}
                    </dd>
                  </div>
                </dl>
                <p className="mt-1 text-xs text-muted-foreground">
                  per gram &middot; updated{" "}
                  {live.source === "spot"
                    ? live.asOf.toLocaleTimeString("en-IN", { hour: "numeric", minute: "2-digit" })
                    : live.asOf.toLocaleDateString("en-IN", { day: "numeric", month: "short" })}
                </p>
              </>
            )}
            {status === "error" && (
              <p className="mt-3 text-sm text-ink">
                The live rate couldn&rsquo;t load right now. Please try again in a moment.
              </p>
            )}
          </div>
          <p className="mt-3 text-[11px] leading-relaxed text-muted-foreground">
            International gold price converted to rupees. Indicative only: it excludes import duty,
            GST and making charges, so store rates are higher.
          </p>

          <div className="my-4 h-px bg-gold/30" />

          <p className="eyebrow">Indriya store rate</p>
          <p className="mt-2 font-display text-2xl font-light text-maroon">
            {inr.format(INDRIYA_RATE.perGram22kt)}
            <span className="ml-1 font-sans text-xs text-muted-foreground">per gram, 22 karat</span>
          </p>
          <p className="mt-1 text-[11px] leading-relaxed text-muted-foreground">
            As last listed on indriya.com, {INDRIYA_RATE.updated}. Your store confirms the rate on
            your bill.
          </p>
          <a
            href={OFFICIAL_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex items-center gap-2 border-b border-gold pb-1 text-[11px] font-medium uppercase tracking-[0.16em] text-maroon hover:text-gold"
          >
            Check today&rsquo;s rate on Indriya{" "}
            <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
          </a>
          <p className="mt-4 text-[10px] text-muted-foreground/80">
            Live data:{" "}
            <a
              href="https://gold-api.com"
              target="_blank"
              rel="noopener noreferrer"
              className="underline"
            >
              Gold API
            </a>{" "}
            &middot;{" "}
            <a
              href="https://www.exchangerate-api.com"
              target="_blank"
              rel="noopener noreferrer"
              className="underline"
            >
              Rates By Exchange Rate API
            </a>
          </p>
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
          <span className="hidden rounded-full border border-gold/40 bg-ivory px-4 py-1.5 font-display text-base italic text-maroon shadow-sm sm:inline">
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
