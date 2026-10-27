import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Occasion,
  BudgetRange,
  StyleVibe,
  getRecommendations,
  describeQuiz,
} from "@/lib/styling-advisor";
import { ProductCard } from "@/components/brand";
import { formatINR } from "@/lib/products";

type QuizStep = "occasion" | "budget" | "vibe" | "results";

export function StylingQuiz() {
  const [step, setStep] = useState<QuizStep>("occasion");
  const [occasion, setOccasion] = useState<Occasion | null>(null);
  const [budget, setBudget] = useState<BudgetRange | null>(null);
  const [vibe, setVibe] = useState<StyleVibe | null>(null);

  const handleOccasionSelect = (o: Occasion) => {
    setOccasion(o);
    setStep("budget");
  };

  const handleBudgetSelect = (b: BudgetRange) => {
    setBudget(b);
    setStep("vibe");
  };

  const handleVibeSelect = (v: StyleVibe) => {
    setVibe(v);
    setStep("results");
  };

  const handleReset = () => {
    setStep("occasion");
    setOccasion(null);
    setBudget(null);
    setVibe(null);
  };

  const recommendations =
    occasion && budget && vibe ? getRecommendations(occasion, budget, vibe) : [];

  return (
    <div className="w-full max-w-3xl mx-auto px-4 py-12">
      {/* Step 1: Occasion */}
      {step === "occasion" && (
        <div className="space-y-8">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold" style={{ color: "#4A1420" }}>
              What's the occasion?
            </h2>
            <p className="text-lg text-gray-600">
              Tell us what you're dressing up for, and we'll suggest the perfect pieces.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {(["wedding", "engagement", "festival", "milestone"] as Occasion[]).map((o) => (
              <button
                key={o}
                onClick={() => handleOccasionSelect(o)}
                className="p-4 border-2 rounded-lg text-left font-semibold transition-all hover:shadow-lg"
                style={{
                  borderColor: "#4A1420",
                  color: "#4A1420",
                }}
              >
                {o === "wedding" && "💍 Wedding or Bridal"}
                {o === "engagement" && "💎 Engagement"}
                {o === "festival" && "🕉️ Festival or Temple"}
                {o === "milestone" && "🎉 Milestone Celebration"}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Step 2: Budget */}
      {step === "budget" && occasion && (
        <div className="space-y-8">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold" style={{ color: "#4A1420" }}>
              What's your budget?
            </h2>
            <p className="text-lg text-gray-600">
              Our pieces range from ₹2 lakhs to ₹46 lakhs. Pick a range that feels right.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {(["2-4", "4-12", "12-20", "20+"] as BudgetRange[]).map((b) => (
              <button
                key={b}
                onClick={() => handleBudgetSelect(b)}
                className="p-4 border-2 rounded-lg text-left font-semibold transition-all hover:shadow-lg"
                style={{
                  borderColor: "#4A1420",
                  color: "#4A1420",
                }}
              >
                {b === "2-4" && "₹2–4 lakhs"}
                {b === "4-12" && "₹4–12 lakhs"}
                {b === "12-20" && "₹12–20 lakhs"}
                {b === "20+" && "₹20+ lakhs"}
              </button>
            ))}
          </div>
          <button
            onClick={() => setStep("occasion")}
            className="text-sm underline"
            style={{ color: "#4A1420" }}
          >
            ← Back
          </button>
        </div>
      )}

      {/* Step 3: Style Vibe */}
      {step === "vibe" && occasion && budget && (
        <div className="space-y-8">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold" style={{ color: "#4A1420" }}>
              What's your style vibe?
            </h2>
            <p className="text-lg text-gray-600">
              All our pieces are traditionally rooted. Which calls to you?
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <button
              onClick={() => handleVibeSelect("traditional")}
              className="p-4 border-2 rounded-lg text-left font-semibold transition-all hover:shadow-lg"
              style={{
                borderColor: "#4A1420",
                color: "#4A1420",
              }}
            >
              <div className="font-bold text-lg">Traditional</div>
              <div className="text-sm text-gray-600 font-normal">
                Timeless, elegant, and rooted in heritage.
              </div>
            </button>
            <button
              onClick={() => handleVibeSelect("statement")}
              className="p-4 border-2 rounded-lg text-left font-semibold transition-all hover:shadow-lg"
              style={{
                borderColor: "#4A1420",
                color: "#4A1420",
              }}
            >
              <div className="font-bold text-lg">Statement</div>
              <div className="text-sm text-gray-600 font-normal">
                Bold, sophisticated, and showstopping.
              </div>
            </button>
          </div>
          <button
            onClick={() => setStep("budget")}
            className="text-sm underline"
            style={{ color: "#4A1420" }}
          >
            ← Back
          </button>
        </div>
      )}

      {/* Step 4: Results */}
      {step === "results" && occasion && budget && vibe && (
        <div className="space-y-8">
          <div className="space-y-4">
            <h2 className="text-3xl font-bold" style={{ color: "#4A1420" }}>
              Your perfect pieces
            </h2>
            <p className="text-gray-600 text-lg">{describeQuiz(occasion, budget, vibe)}</p>
          </div>

          {recommendations.length > 0 ? (
            <div className="space-y-8">
              {recommendations.map((rec, idx) => (
                <div key={rec.product.slug} className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-6 items-start">
                    <div>
                      <ProductCard product={rec.product} headingLevel="h3" compact />
                    </div>
                    <div className="space-y-3">
                      <div>
                        <h3 className="font-bold text-lg" style={{ color: "#4A1420" }}>
                          Why this works
                        </h3>
                        <p className="text-gray-700">{rec.reason}</p>
                      </div>
                      <div>
                        <h4 className="font-bold" style={{ color: "#8A5A12" }}>
                          Styling tip
                        </h4>
                        <p className="text-gray-700 text-sm">{rec.stylingTip}</p>
                      </div>
                      {rec.product.listing && (
                        <div>
                          <p className="text-sm text-gray-600">
                            <span className="font-semibold">Price:</span>{" "}
                            {formatINR(rec.product.listing.price)}
                          </p>
                        </div>
                      )}
                      <a
                        href={`/jewellery/${rec.product.slug}`}
                        className="inline-block mt-2 px-4 py-2 rounded font-semibold text-white transition-colors"
                        style={{ backgroundColor: "#4A1420" }}
                        onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#6a2a3a")}
                        onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#4A1420")}
                      >
                        View details →
                      </a>
                    </div>
                  </div>
                  {idx < recommendations.length - 1 && <hr style={{ borderColor: "#E9D9C0" }} />}
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-600 text-lg">
                No pieces matched those exact criteria. Try adjusting your budget or occasion.
              </p>
            </div>
          )}

          <div className="space-y-4 pt-6 border-t" style={{ borderColor: "#E9D9C0" }}>
            <p className="text-sm text-gray-600">
              Not quite right?{" "}
              <a href="/faq" className="underline font-semibold" style={{ color: "#4A1420" }}>
                Ask Indriya
              </a>{" "}
              for personalized help, or visit a store to see these pieces in person.
            </p>
            <button
              onClick={handleReset}
              className="w-full py-3 rounded font-semibold text-white transition-colors"
              style={{ backgroundColor: "#4A1420" }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#6a2a3a")}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#4A1420")}
            >
              Start over
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
