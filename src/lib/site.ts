// Shared SEO helpers for the Indriya student-project site.

/** Public URL of the published Lovable site. Update this if the site is published under a different domain. */
export const SITE_URL = "https://indriya-heritage-jewels.lovable.app";

export const SITE_NAME = "Indriya Temple Jewellery";

/** The real brand's website, linked from the student-project banner. */
export const OFFICIAL_URL = "https://www.indriya.com/";

/** Author shown on the Temple Jewellery Guide (E-E-A-T). */
export const GUIDE_AUTHOR = {
  name: "Indriya Project Team",
  role: "BBA Marketing students, Atlas SkillTech University",
};

export const GUIDE_PUBLISHED = "2026-10-25";

export const absoluteUrl = (path: string) => `${SITE_URL}${path === "/" ? "/" : path}`;

/** A JSON-LD <script> for a route's head(). Rendered on the server, so crawlers see it without JavaScript. */
export const jsonLd = (data: Record<string, unknown>) => ({
  type: "application/ld+json",
  children: JSON.stringify({ "@context": "https://schema.org", ...data }),
});

type Crumb = { name: string; path: string };

export const breadcrumbLd = (crumbs: Crumb[]) =>
  jsonLd({
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.name,
      item: absoluteUrl(c.path),
    })),
  });

/** Standard per-page meta: title, description, robots, Open Graph, plus a self-referencing canonical. */
export const pageHead = ({
  title,
  description,
  path,
  image,
}: {
  title: string;
  description: string;
  path: string;
  image?: string;
}) => ({
  meta: [
    { title },
    { name: "description", content: description },
    { name: "robots", content: "index, follow" },
    { property: "og:title", content: title },
    { property: "og:description", content: description },
    { property: "og:type", content: "website" },
    { property: "og:url", content: absoluteUrl(path) },
    ...(image ? [{ property: "og:image", content: image }] : []),
    { name: "twitter:card", content: "summary_large_image" },
  ],
  links: [{ rel: "canonical", href: absoluteUrl(path) }],
});
