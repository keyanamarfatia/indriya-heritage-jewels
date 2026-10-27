import { useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { MessageCircleQuestion, Phone, Search, X } from "lucide-react";
import { Breadcrumbs, SiteShell } from "@/components/site-shell";
import { AskIndriya } from "@/components/ask-indriya";
import { OffsiteLink } from "@/components/offsite";
import { breadcrumbLd, jsonLd, pageHead } from "@/lib/site";
import { ALL_FAQS, CARE_PHONE, FAQ_GROUPS, sourceById } from "@/lib/knowledge";

const PATH = "/faq";
const TITLE = "Temple Jewellery FAQs & Ask Indriya | Indriya";
const DESCRIPTION =
  "Answers on temple jewellery, gold purity, BIS hallmarks, lifetime exchange and Indriya's Mumbai stores, plus an AI assistant for your own questions.";

export const Route = createFileRoute("/faq")({
  head: () => ({
    ...pageHead({ title: TITLE, description: DESCRIPTION, path: PATH }),
    scripts: [
      breadcrumbLd([
        { name: "Home", path: "/" },
        { name: "FAQ", path: PATH },
      ]),
      jsonLd({
        "@type": "FAQPage",
        mainEntity: ALL_FAQS.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      }),
    ],
  }),
  component: FaqPage,
});

function FaqPage() {
  const [query, setQuery] = useState("");
  const [group, setGroup] = useState("all");
  const [seed, setSeed] = useState<{ q: string; n: number } | undefined>(undefined);

  const groups = useMemo(() => {
    const q = query.trim().toLowerCase();
    return FAQ_GROUPS.filter((g) => group === "all" || g.id === group)
      .map((g) => ({
        ...g,
        items: q ? g.items.filter((f) => `${f.q} ${f.a}`.toLowerCase().includes(q)) : g.items,
      }))
      .filter((g) => g.items.length > 0);
  }, [query, group]);

  const askInstead = () => {
    setSeed((s) => ({ q: query, n: (s?.n ?? 0) + 1 }));
    document.getElementById("ask")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  let counter = 0;

  return (
    <SiteShell>
      {/* Hero with the assistant */}
      <section id="ask" className="relative scroll-mt-28 overflow-hidden bg-maroon text-ivory">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_80%_30%,rgba(168,131,74,0.28),transparent_55%)]"
        />
        <div className="relative mx-auto grid max-w-7xl items-center gap-10 px-5 py-14 sm:px-8 lg:grid-cols-[1fr_1.1fr] lg:gap-16 lg:py-20">
          <div>
            <p className="eyebrow !text-[#d8b878]">Help centre · Questions people ask</p>
            <h1 className="mt-5 font-display text-4xl font-light leading-[1.08] sm:text-6xl">
              Temple jewellery questions?{" "}
              <span className="font-script text-[1.15em] font-normal text-[#e2c48f]">Ask</span>{" "}
              Indriya
            </h1>
            <p className="mt-5 max-w-lg text-lg font-light leading-relaxed text-ivory/80">
              Ask our assistant anything about designs, gold purity, exchange or our stores. It
              answers from indriya.com and our guide, and shows you where each answer comes from.
            </p>
            <ul className="mt-8 space-y-3 text-sm text-ivory/80">
              {[
                "Answers in a few seconds, any time",
                "Every answer links to its source",
                "Never guesses prices: those change daily",
              ].map((t) => (
                <li key={t} className="flex items-center gap-3">
                  <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-[#d8b878]" />
                  {t}
                </li>
              ))}
            </ul>
            <a
              href={`tel:${CARE_PHONE.replace(/-/g, "")}`}
              className="mt-8 inline-flex items-center gap-2 text-sm text-ivory/85 underline decoration-[#d8b878]/60 underline-offset-4 hover:text-[#e2c48f]"
            >
              <Phone className="h-4 w-4" aria-hidden="true" /> Prefer a person? Call {CARE_PHONE}
            </a>
          </div>
          <AskIndriya seed={seed} />
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="pt-6">
          <Breadcrumbs items={[{ name: "Home", to: "/" }, { name: "FAQ" }]} />
        </div>

        <section className="grid gap-10 py-12 lg:grid-cols-[260px_minmax(0,1fr)] lg:gap-16 lg:py-16">
          {/* Search + topics */}
          <div className="min-w-0 lg:sticky lg:top-40 lg:self-start">
            <h2 className="font-display text-4xl font-light leading-tight text-ink">
              Frequently asked{" "}
              <span className="font-script text-[1.3em] font-normal text-gold-deep">questions</span>
            </h2>
            <label htmlFor="faq-search" className="sr-only">
              Search the FAQ
            </label>
            <div className="mt-6 flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2.5 focus-within:border-maroon">
              <Search className="h-4 w-4 shrink-0 text-muted-foreground" aria-hidden="true" />
              <input
                id="faq-search"
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search questions"
                className="min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
              />
              {query && (
                <button type="button" onClick={() => setQuery("")} aria-label="Clear search">
                  <X className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
                </button>
              )}
            </div>
            <div
              role="group"
              aria-label="Topics"
              className="mt-5 flex gap-2 overflow-x-auto pb-2 lg:flex-col lg:items-start lg:overflow-visible"
            >
              {[{ id: "all", label: "All topics" }, ...FAQ_GROUPS].map((g) => (
                <button
                  key={g.id}
                  type="button"
                  aria-pressed={group === g.id}
                  onClick={() => setGroup(g.id)}
                  className={`shrink-0 rounded-full border px-4 py-2 text-sm transition-colors ${
                    group === g.id
                      ? "border-maroon bg-maroon text-ivory"
                      : "border-border bg-card text-ink hover:border-maroon hover:text-maroon"
                  }`}
                >
                  {g.label}
                </button>
              ))}
            </div>
          </div>

          {/* Questions */}
          <div className="min-w-0 space-y-12">
            {groups.map((g) => (
              <div key={g.id}>
                <p className="eyebrow">{g.label}</p>
                <div className="mt-4 space-y-3">
                  {g.items.map((f) => {
                    counter += 1;
                    const src = f.source ? sourceById(f.source) : undefined;
                    return (
                      <details
                        key={f.q}
                        className="faq-item group rounded-3xl border border-border bg-card transition-colors open:border-gold/50 open:bg-[#f8efe2]"
                      >
                        <summary className="flex cursor-pointer list-none items-start gap-4 px-5 py-4 sm:gap-5 sm:px-7 sm:py-5 [&::-webkit-details-marker]:hidden">
                          <span
                            aria-hidden="true"
                            className="w-8 shrink-0 font-display text-2xl font-light leading-none text-gold-deep/70 group-open:text-gold-deep"
                          >
                            {String(counter).padStart(2, "0")}
                          </span>
                          <h3 className="flex-1 font-display text-xl leading-snug text-ink">
                            {f.q}
                          </h3>
                          <span
                            aria-hidden="true"
                            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-maroon/30 text-maroon transition-transform duration-300 group-open:rotate-45 group-open:border-maroon group-open:bg-maroon group-open:text-ivory"
                          >
                            +
                          </span>
                        </summary>
                        <div className="px-5 pb-5 pl-[4.25rem] sm:px-7 sm:pl-[5.25rem]">
                          <p className="leading-relaxed text-ink/85">{f.a}</p>
                          {src &&
                            (src.official ? (
                              <OffsiteLink
                                href={src.href}
                                variant="inline"
                                className="mt-3 text-sm"
                              >
                                {src.label}
                              </OffsiteLink>
                            ) : (
                              <a
                                href={src.href}
                                className="mt-3 inline-block text-sm text-maroon underline decoration-gold underline-offset-4 hover:text-gold-deep"
                              >
                                {src.label}
                              </a>
                            ))}
                        </div>
                      </details>
                    );
                  })}
                </div>
              </div>
            ))}

            {groups.length === 0 && (
              <div className="rounded-3xl border border-gold/40 bg-card p-8 text-center">
                <MessageCircleQuestion
                  className="mx-auto h-8 w-8 text-gold-deep"
                  aria-hidden="true"
                />
                <p className="mt-3 font-display text-2xl text-ink">No written answer yet</p>
                <p className="mt-1 text-sm text-muted-foreground">
                  Our assistant may still know. Send it your question.
                </p>
                <button type="button" onClick={askInstead} className="btn-lux mt-5">
                  Ask Indriya
                </button>
              </div>
            )}
          </div>
        </section>
      </div>
    </SiteShell>
  );
}
