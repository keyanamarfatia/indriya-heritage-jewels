import { createFileRoute } from "@tanstack/react-router";
import heroImage from "@/assets/hero.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Indriya Temple Jewellery — Every Jewel Tells a Story" },
      {
        name: "description",
        content:
          "Heritage South Indian temple jewellery. Every jewel tells a story. Student project for Atlas SkillTech University.",
      },
      {
        property: "og:title",
        content: "Indriya Temple Jewellery — Every Jewel Tells a Story",
      },
      {
        property: "og:description",
        content:
          "Heritage South Indian temple jewellery. Every jewel tells a story.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      {/* Hero banner */}
      <section className="relative min-h-[85vh] flex-1 overflow-hidden">
        <img
          src={heroImage}
          alt="Antique gold South Indian temple jewellery — a goddess-motif choker, jhumka earrings and a bangle arranged on deep maroon silk"
          className="absolute inset-0 h-full w-full object-cover object-right"
          width={1920}
          height={1088}
          fetchPriority="high"
        />
        {/* Maroon veil so the ivory headline reads over the photo */}
        <div className="absolute inset-0 bg-gradient-to-r from-maroon/85 via-maroon/40 to-transparent" />
        <div className="relative z-10 flex min-h-[85vh] items-center px-6 sm:px-12 lg:px-24">
          <div className="max-w-xl">
            <p className="mb-4 text-xs font-medium uppercase tracking-[0.35em] text-ivory/80">
              Indriya Temple Jewellery
            </p>
            <h1 className="font-display text-5xl font-medium leading-[1.1] text-ivory sm:text-6xl lg:text-7xl">
              Every Jewel Tells a Story
            </h1>
            <div className="mt-6 h-px w-24 bg-gold" />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-maroon px-6 py-8 text-center sm:px-12">
        <p className="text-sm text-ivory/75">
          Student project for Atlas SkillTech University — not affiliated with
          Indriya / Aditya Birla Group.
        </p>
      </footer>
    </div>
  );
}
