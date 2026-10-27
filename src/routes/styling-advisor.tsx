import { createFileRoute } from "@tanstack/react-router";
import { SiteShell } from "@/components/site-shell";
import { StylingQuiz } from "@/components/styling-quiz";
import { pageHead } from "@/lib/site";

export const Route = createFileRoute("/styling-advisor")({
  head() {
    return {
      ...pageHead({
        title: "Find Your Perfect Piece – Indriya Temple Jewellery",
        description:
          "Personalized styling recommendations for Indriya's temple jewellery. Answer a few questions to find pieces that match your occasion, budget, and style.",
        path: "/styling-advisor",
      }),
    };
  },
  component: StylingAdvisor,
});

function StylingAdvisor() {
  return (
    <SiteShell>
      <main className="min-h-screen" style={{ backgroundColor: "#FAF6EE" }}>
        <div className="max-w-4xl mx-auto px-4 py-12">
          <div className="mb-12 space-y-4">
            <h1 className="text-4xl font-bold" style={{ color: "#4A1420" }}>
              Find Your Perfect Piece
            </h1>
            <p className="text-xl text-gray-700 max-w-2xl">
              Not sure where to start? Tell us about your occasion, budget, and style, and we'll
              suggest the pieces from Indriya's Anantara collection that are made for you.
            </p>
          </div>

          <StylingQuiz />
        </div>
      </main>
    </SiteShell>
  );
}
