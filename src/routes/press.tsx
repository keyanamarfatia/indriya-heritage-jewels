import { createFileRoute } from "@tanstack/react-router";
import { ArrowUpRight, Newspaper } from "lucide-react";
import { Breadcrumbs, SiteShell } from "@/components/site-shell";
import {
  SITE_UPDATED,
  absoluteUrl,
  authorLd,
  breadcrumbLd,
  formatDateLong,
  jsonLd,
  pageHead,
} from "@/lib/site";
import { PRESS } from "@/lib/press";

const PATH = "/press";
const TITLE = "Indriya in the News: Press Coverage | Indriya Temple Jewellery";
const DESCRIPTION =
  "Press coverage of Indriya and its Anantara bridal temple jewellery collection, from Outlook Business, Business Today, Indian Jeweller and more.";

export const Route = createFileRoute("/press")({
  head: () => ({
    ...pageHead({ title: TITLE, description: DESCRIPTION, path: PATH }),
    scripts: [
      breadcrumbLd([
        { name: "Home", path: "/" },
        { name: "Press", path: PATH },
      ]),
      jsonLd({
        "@type": "CollectionPage",
        name: "Indriya in the news",
        description: DESCRIPTION,
        url: absoluteUrl(PATH),
        dateModified: SITE_UPDATED,
        author: authorLd(),
        mainEntity: {
          "@type": "ItemList",
          itemListElement: PRESS.map((p, i) => ({
            "@type": "ListItem",
            position: i + 1,
            item: {
              "@type": "NewsArticle",
              headline: p.headline,
              url: p.url,
              publisher: { "@type": "Organization", name: p.outlet },
              ...(p.date ? { datePublished: p.date } : {}),
              about: { "@type": "Organization", name: "Indriya" },
            },
          })),
        },
      }),
    ],
  }),
  component: PressPage,
});

function PressPage() {
  const anantara = PRESS.filter((p) => p.anantara).length;
  return (
    <SiteShell>
      <header className="bg-maroon text-ivory">
        <div className="mx-auto max-w-4xl px-5 py-16 sm:px-8">
          <p className="eyebrow !text-[#d8b878]">Press &amp; media</p>
          <h1 className="mt-4 font-display text-4xl font-light leading-tight sm:text-6xl">
            Indriya in the{" "}
            <span className="font-script text-[1.15em] font-normal text-[#e2c48f]">news</span>
          </h1>
          <p className="mt-5 max-w-2xl text-lg font-light leading-relaxed text-ivory/80">
            Indriya has been covered by {PRESS.length - 1} publications since the Aditya Birla Group
            launched the brand in July 2024, including {anantara} articles on the Anantara
            collection.
          </p>
        </div>
      </header>

      <div className="mx-auto max-w-4xl px-5 sm:px-8">
        <div className="pt-6">
          <Breadcrumbs items={[{ name: "Home", to: "/" }, { name: "Press" }]} />
        </div>
        <ul className="space-y-4 py-12">
          {PRESS.map((p) => (
            <li key={p.url}>
              <a
                href={p.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex gap-5 rounded-3xl border border-border bg-card p-6 transition-colors hover:border-gold"
              >
                <Newspaper
                  className="mt-1 h-6 w-6 shrink-0 text-gold-deep"
                  strokeWidth={1.5}
                  aria-hidden="true"
                />
                <div className="min-w-0 flex-1">
                  <p className="text-xs uppercase tracking-[0.18em] text-gold-deep">
                    {p.outlet}
                    {p.date && (
                      <>
                        {" · "}
                        <time dateTime={p.date}>{formatDateLong(p.date)}</time>
                      </>
                    )}
                    {p.anantara && (
                      <span className="ml-2 rounded-full bg-maroon px-2 py-0.5 text-[10px] text-ivory">
                        Anantara
                      </span>
                    )}
                  </p>
                  <h2 className="mt-2 font-display text-2xl leading-snug text-ink group-hover:text-maroon">
                    {p.headline}
                  </h2>
                  <p className="mt-2 text-sm leading-relaxed text-ink/80">{p.summary}</p>
                </div>
                <ArrowUpRight
                  className="mt-1 h-5 w-5 shrink-0 text-ink/40 group-hover:text-maroon"
                  aria-hidden="true"
                />
                <span className="sr-only">(opens {p.outlet} in a new tab)</span>
              </a>
            </li>
          ))}
        </ul>
        <p className="pb-16 text-sm text-muted-foreground">
          Headlines and dates as published. Last checked {formatDateLong(SITE_UPDATED)}.
        </p>
      </div>
    </SiteShell>
  );
}
