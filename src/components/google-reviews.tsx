import { Star } from "lucide-react";
import { GOOGLE_REVIEWS, OTHER_LISTINGS } from "@/lib/reviews";
import { directionsUrl, type Store } from "@/lib/stores";

function Stars({ n, className = "h-4 w-4" }: { n: number; className?: string }) {
  return (
    <span className="inline-flex gap-0.5" aria-label={`${n} out of 5 stars`}>
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          aria-hidden="true"
          className={`${className} ${i <= Math.round(n) ? "fill-gold text-gold" : "text-gold/40"}`}
        />
      ))}
    </span>
  );
}

const ext = "noopener noreferrer";

/** A store's real Google reviews (where copied), its rating, and links to the review platforms. */
export function GoogleReviewsPanel({ store }: { store: Store }) {
  const data = GOOGLE_REVIEWS[store.slug];
  const others = OTHER_LISTINGS[store.slug] ?? [];
  return (
    <div className="rounded-3xl border border-border bg-card p-6 text-left sm:p-8">
      <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
        <div>
          <p className="text-xs uppercase tracking-[0.18em] text-gold-deep">Google reviews</p>
          <p className="mt-1 font-display text-5xl leading-none text-ink lining-nums">
            {store.rating.toFixed(1)}
          </p>
        </div>
        <div>
          <Stars n={store.rating} className="h-5 w-5" />
          <p className="mt-1 text-sm text-muted-foreground">
            {store.reviews.toLocaleString("en-IN")} reviews · Indriya {store.name}
          </p>
        </div>
      </div>

      {data && (
        <>
          <ul className="mt-5 flex flex-wrap gap-2" aria-label="What reviewers mention most">
            {data.topics.map((t) => (
              <li
                key={t.label}
                className="rounded-full border border-border px-3 py-1 text-xs text-ink/80"
              >
                {t.label} <span className="text-muted-foreground">{t.count}</span>
              </li>
            ))}
          </ul>
          <ul className="mt-6 space-y-5">
            {data.reviews.map((r) => (
              <li key={r.author} className="border-t border-border pt-5">
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-maroon text-sm text-ivory">
                    {r.author[0]}
                  </span>
                  <span className="font-medium text-ink">{r.author}</span>
                  {r.meta && <span className="text-xs text-muted-foreground">{r.meta}</span>}
                </div>
                <div className="mt-2 flex items-center gap-2 text-xs text-muted-foreground">
                  <Stars n={r.stars} className="h-3.5 w-3.5" /> {r.when}
                </div>
                <blockquote className="mt-2 leading-relaxed text-ink/85">{r.text}</blockquote>
                {r.ownerReply && (
                  <div className="mt-3 border-l-2 border-gold/50 pl-4 text-sm text-ink/75">
                    <p className="font-medium text-ink">Reply from Indriya</p>
                    <p className="mt-1">{r.ownerReply}</p>
                  </div>
                )}
              </li>
            ))}
          </ul>
          <p className="mt-5 text-xs text-muted-foreground">
            Real reviews as shown on Google on {data.checked}. Reviewer names shortened; long
            reviews shortened with “…”.
          </p>
        </>
      )}

      <div className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-sm">
        <a
          href={directionsUrl(store)}
          target="_blank"
          rel={ext}
          className="text-maroon underline decoration-gold underline-offset-4 hover:text-gold-deep"
        >
          Read all reviews on Google ↗
        </a>
        {others.map((o) => (
          <a
            key={o.href}
            href={o.href}
            target="_blank"
            rel={ext}
            className="text-maroon underline decoration-gold underline-offset-4 hover:text-gold-deep"
          >
            Reviews on {o.name} ↗
          </a>
        ))}
      </div>
    </div>
  );
}
