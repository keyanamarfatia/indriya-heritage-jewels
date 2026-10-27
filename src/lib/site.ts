// Shared SEO helpers for the Indriya student-project site.

/** Public URL of the published Lovable site. Update this if the site is published under a different domain. */
export const SITE_URL = "https://indriya-anantara.lovable.app";

export const SITE_NAME = "Indriya Temple Jewellery";

/** The real brand's website, linked from the student-project banner. */
export const OFFICIAL_URL = "https://www.indriya.com/";

/** Indriya's official social profiles (as linked by the brand). */
export const SOCIAL_LINKS = [
  { name: "Instagram", href: "https://www.instagram.com/indriyajewels/" },
  { name: "Facebook", href: "https://www.facebook.com/p/Indriya-Jewels-61560479585835/" },
  { name: "YouTube", href: "https://www.youtube.com/@indriyajewels" },
] as const;

/**
 * This student project's own profiles (made by the team, not by Indriya). Paste each URL once the
 * profile exists; empty ones are hidden everywhere.
 */
export const PROJECT_LINKS: { name: string; href: string }[] = [
  { name: "GitHub", href: "https://github.com/keyanamarfatia/indriya-heritage-jewels" },
  { name: "LinkedIn", href: "" },
  { name: "Reddit", href: "" },
  { name: "TikTok", href: "" },
  { name: "Product Hunt", href: "" },
  { name: "Crunchbase", href: "" },
].filter((l) => l.href);

/** Official profiles of Indriya's parent company, the Aditya Birla Group (verified October 2026). */
export const PARENT_LINKS = [
  { name: "Aditya Birla Group website", short: "Website", href: "https://www.adityabirla.com/" },
  {
    name: "Aditya Birla Group on Wikipedia",
    short: "Wikipedia",
    href: "https://en.wikipedia.org/wiki/Aditya_Birla_Group",
  },
  { name: "Aditya Birla Group on X", short: "X (Twitter)", href: "https://x.com/AdityaBirlaGrp" },
] as const;

/** Author shown on the Temple Jewellery Guide (E-E-A-T). */
export const TEAM = ["Keyana Marfatia", "Adnan Gilitwala", "Aadhyan Rao"] as const;

export const GUIDE_AUTHOR = {
  name: "Keyana Marfatia, Adnan Gilitwala and Aadhyan Rao",
  role: "BBA Marketing students, Atlas SkillTech University",
  initials: "KA",
};

/** Each team member as a schema.org Person. */
export const teamLd = () =>
  TEAM.map((name) => ({
    "@type": "Person",
    name,
    jobTitle: "BBA Marketing student",
    affiliation: { "@type": "CollegeOrUniversity", name: "Atlas SkillTech University" },
  }));

export const GUIDE_PUBLISHED = "2026-10-25";

/** When the site went live and when it was last reviewed (shown on the homepage and About page). */
export const SITE_PUBLISHED = "2026-10-25";
export const SITE_UPDATED = "2026-10-27";

export const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });

/** Who made the site, for author/publisher in schema. */
export const authorLd = () => ({
  "@type": "Organization",
  name: GUIDE_AUTHOR.name,
  description: GUIDE_AUTHOR.role,
  url: `${SITE_URL}/about`,
  parentOrganization: { "@type": "CollegeOrUniversity", name: "Atlas SkillTech University" },
  knowsAbout: ["Digital marketing", "Search engine optimisation", "Temple jewellery"],
  member: teamLd(),
  ...(PROJECT_LINKS.length ? { sameAs: PROJECT_LINKS.map((l) => l.href) } : {}),
});

/** "October 27, 2026": the month-first form many date parsers expect. */
export const formatDateLong = (iso: string) =>
  new Date(iso).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  });

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
    { property: "og:site_name", content: SITE_NAME },
    { property: "og:url", content: absoluteUrl(path) },
    ...(image ? [{ property: "og:image", content: image }] : []),
    { name: "twitter:card", content: "summary_large_image" },
  ],
  links: [{ rel: "canonical", href: absoluteUrl(path) }],
});
