import { Link } from "@tanstack/react-router";
import { BookOpen, MapPin, Phone, Sparkles } from "lucide-react";
import { TEMPLE_FAQS } from "@/lib/faqs";

const CARE_PHONE = "18002108383";

/**
 * FAQ for AEO: answer-first, every answer in the server-rendered HTML (native <details>),
 * so Google and AI tools can read it without JavaScript. Pairs with FAQPage schema.
 */
export function FaqSection({ id = "faq" }: { id?: string }) {
  return (
    <section id={id} className="scroll-mt-32 border-t border-border py-16 lg:py-20">
      <div className="grid gap-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16">
        {/* Intro + help card */}
        <div className="lg:sticky lg:top-40 lg:self-start">
          <p className="eyebrow">Questions people ask</p>
          <h2 className="mt-4 font-display text-4xl font-light leading-tight text-ink sm:text-5xl">
            Your questions,{" "}
            <span className="font-script text-[1.3em] font-normal text-gold-deep">answered</span>
          </h2>
          <p className="mt-5 max-w-md leading-relaxed text-muted-foreground">
            The five things people most often ask Google about temple jewellery, answered in a line
            or two each.
          </p>

          <div className="mt-8 rounded-3xl border border-gold/30 bg-card p-6">
            <p className="font-display text-2xl text-ink">Still wondering?</p>
            <p className="mt-1 text-sm text-muted-foreground">
              Our guide goes deeper, or talk to a jewellery expert.
            </p>
            <div className="mt-5 flex flex-col gap-3 sm:flex-row lg:flex-col xl:flex-row">
              <Link to="/temple-jewellery-guide" className="btn-lux !px-5">
                <BookOpen className="h-4 w-4" aria-hidden="true" /> Read the guide
              </Link>
              <a href={`tel:${CARE_PHONE}`} className="btn-lux-outline !px-5">
                <Phone className="h-4 w-4" aria-hidden="true" /> Call 1800-210-8383
              </a>
            </div>
            <Link
              to="/faq"
              className="mt-4 flex w-fit items-center gap-1.5 text-sm text-maroon underline decoration-gold underline-offset-4 hover:text-gold-deep"
            >
              <Sparkles className="h-4 w-4" aria-hidden="true" /> More questions? Ask Indriya
            </Link>
            <Link
              to="/store-locator"
              className="mt-3 inline-flex items-center gap-1.5 text-sm text-maroon underline decoration-gold underline-offset-4 hover:text-gold-deep"
            >
              <MapPin className="h-4 w-4" aria-hidden="true" /> Or ask in a store near you
            </Link>
          </div>
        </div>

        {/* Questions */}
        <div className="space-y-4">
          {TEMPLE_FAQS.map((f, i) => (
            <details
              key={f.q}
              open={i === 0}
              className="faq-item group rounded-3xl border border-border bg-card transition-colors open:border-gold/50 open:bg-[#f8efe2]"
            >
              <summary className="flex cursor-pointer list-none items-start gap-5 px-6 py-5 sm:px-7 sm:py-6 [&::-webkit-details-marker]:hidden">
                <span
                  aria-hidden="true"
                  className="font-display text-3xl font-light leading-none text-gold-deep/70 group-open:text-gold-deep"
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="flex-1">
                  <span className="block text-[10px] font-medium uppercase tracking-[0.25em] text-muted-foreground">
                    {f.tag}
                  </span>
                  <h3 className="mt-1 font-display text-xl leading-snug text-ink sm:text-2xl">
                    {f.q}
                  </h3>
                </span>
                <span
                  aria-hidden="true"
                  className="mt-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-maroon/30 text-lg text-maroon transition-transform duration-300 group-open:rotate-45 group-open:border-maroon group-open:bg-maroon group-open:text-ivory"
                >
                  +
                </span>
              </summary>
              <div className="faq-answer px-6 pb-6 pl-[4.75rem] sm:px-7 sm:pl-[5.25rem]">
                <p className="leading-relaxed text-ink/85">{f.a}</p>
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
