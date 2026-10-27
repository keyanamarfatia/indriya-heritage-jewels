import type { ReactNode } from "react";
import { Breadcrumbs, SiteShell } from "@/components/site-shell";
import { GUIDE_AUTHOR, SITE_UPDATED, formatDateLong } from "@/lib/site";

/** Plain, readable layout shared by the Privacy policy and Terms of use pages. */
export function PolicyPage({
  title,
  intro,
  crumb,
  children,
}: {
  title: string;
  intro: string;
  crumb: string;
  children: ReactNode;
}) {
  return (
    <SiteShell>
      <div className="mx-auto max-w-3xl px-5 sm:px-8">
        <div className="pt-6">
          <Breadcrumbs items={[{ name: "Home", to: "/" }, { name: crumb }]} />
        </div>
        <article className="py-12">
          <p className="eyebrow">Policies</p>
          <h1 className="mt-3 font-display text-5xl font-light leading-tight text-ink">{title}</h1>
          <p className="mt-4 text-lg leading-relaxed text-muted-foreground">{intro}</p>
          <p className="mt-4 text-sm text-muted-foreground">
            Last updated: <time dateTime={SITE_UPDATED}>{formatDateLong(SITE_UPDATED)}</time> · By{" "}
            <a href="/about" rel="author" className="underline underline-offset-4">
              {GUIDE_AUTHOR.name}
            </a>
          </p>
          <div className="mt-10 space-y-8 leading-relaxed [&_h2]:font-display [&_h2]:text-2xl [&_h2]:text-ink [&_p]:mt-2 [&_p]:text-ink/85">
            {children}
          </div>
        </article>
      </div>
    </SiteShell>
  );
}
