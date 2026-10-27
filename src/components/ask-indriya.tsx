import { useEffect, useRef, useState, type FormEvent } from "react";
import { ArrowUp, Phone, Sparkles } from "lucide-react";
import { askIndriya } from "@/lib/ask-indriya";
import {
  CARE_PHONE,
  SUGGESTED_QUESTIONS,
  matchFaq,
  sourceById,
  type Source,
} from "@/lib/knowledge";
import { OffsiteLink } from "@/components/offsite";

type Msg = {
  role: "user" | "assistant";
  content: string;
  sources?: Source[];
  /** Shown under answers that came from the written FAQ instead of the AI. */
  note?: string;
};

const GREETING: Msg = {
  role: "assistant",
  content:
    "Namaste! I can help with temple jewellery, the Anantara collection, gold purity, exchange and our Mumbai stores. What would you like to know?",
};

function SourceLinks({ sources }: { sources: Source[] }) {
  return (
    <div className="mt-3 flex flex-wrap gap-2">
      {sources.map((s) =>
        s.official ? (
          <OffsiteLink key={s.id} href={s.href} variant="pill">
            {s.label}
          </OffsiteLink>
        ) : (
          <a
            key={s.id}
            href={s.href}
            className="inline-flex items-center rounded-full border border-maroon/25 px-3 py-1 text-xs text-maroon transition-colors hover:border-maroon hover:bg-maroon hover:text-ivory"
          >
            {s.label}
          </a>
        ),
      )}
    </div>
  );
}

/** Interactive assistant. `seed` lets the page send a question in (e.g. from an empty FAQ search). */
export function AskIndriya({ seed }: { seed?: { q: string; n: number } | undefined }) {
  const [messages, setMessages] = useState<Msg[]>([GREETING]);
  const [input, setInput] = useState("");
  const [pending, setPending] = useState(false);
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = listRef.current;
    if (el) el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
  }, [messages, pending]);

  async function send(raw: string) {
    const q = raw.trim().slice(0, 300);
    if (!q || pending) return;
    const history = [...messages.slice(1), { role: "user" as const, content: q }];
    setMessages((m) => [...m, { role: "user", content: q }]);
    setInput("");
    setPending(true);

    let reply: Msg;
    try {
      const res = await askIndriya({
        data: { messages: history.map(({ role, content }) => ({ role, content })) },
      });
      if (res.ok) {
        reply = { role: "assistant", content: res.answer, sources: res.sources };
      } else {
        reply = fallback(q);
      }
    } catch {
      reply = fallback(q);
    }
    setMessages((m) => [...m, reply]);
    setPending(false);
  }

  useEffect(() => {
    if (seed?.q) void send(seed.q);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [seed?.n]);

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    void send(input);
  }

  const started = messages.length > 1;

  return (
    <div className="flex flex-col overflow-hidden rounded-[2rem] border border-gold/40 bg-ivory text-ink shadow-[0_30px_80px_-30px_rgba(0,0,0,0.6)]">
      {/* Header */}
      <div className="flex items-center gap-3 border-b border-border px-5 py-4 sm:px-6">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-maroon">
          <Sparkles className="h-4 w-4 text-[#e2c48f]" aria-hidden="true" />
        </span>
        <div className="min-w-0">
          <p className="font-display text-xl leading-tight">Ask Indriya</p>
          <p className="truncate text-xs text-muted-foreground">
            AI assistant · answers from indriya.com and our guide
          </p>
        </div>
        <span className="ml-auto flex items-center gap-1.5 text-[11px] text-muted-foreground">
          <span className="h-2 w-2 rounded-full bg-emerald-600" aria-hidden="true" /> Online
        </span>
      </div>

      {/* Messages */}
      <div
        ref={listRef}
        aria-live="polite"
        className="h-[22rem] space-y-4 overflow-y-auto overscroll-contain px-5 py-5 sm:px-6"
      >
        {messages.map((m, i) =>
          m.role === "user" ? (
            <div key={i} className="flex justify-end">
              <p className="max-w-[85%] rounded-3xl rounded-br-md bg-maroon px-4 py-2.5 text-sm leading-relaxed text-ivory">
                {m.content}
              </p>
            </div>
          ) : (
            <div key={i} className="max-w-[92%]">
              <div className="rounded-3xl rounded-bl-md border border-border bg-card px-4 py-3 text-sm leading-relaxed">
                <p className="whitespace-pre-line">{m.content}</p>
                {m.sources && m.sources.length > 0 && <SourceLinks sources={m.sources} />}
              </div>
              {m.note && <p className="mt-1.5 pl-2 text-[11px] text-muted-foreground">{m.note}</p>}
            </div>
          ),
        )}
        {pending && (
          <div
            className="flex w-16 items-center justify-center gap-1 rounded-3xl rounded-bl-md border border-border bg-card py-4"
            aria-label="Ask Indriya is typing"
          >
            {[0, 1, 2].map((d) => (
              <span
                key={d}
                className="h-1.5 w-1.5 animate-bounce rounded-full bg-gold-deep"
                style={{ animationDelay: `${d * 0.15}s` }}
              />
            ))}
          </div>
        )}
        {!started && (
          <div className="flex flex-wrap gap-2 pt-1">
            {SUGGESTED_QUESTIONS.map((q) => (
              <button
                key={q}
                type="button"
                onClick={() => void send(q)}
                className="rounded-full border border-gold/50 bg-transparent px-3.5 py-1.5 text-left text-xs text-ink transition-colors hover:border-maroon hover:text-maroon"
              >
                {q}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Input */}
      <form onSubmit={onSubmit} className="border-t border-border px-4 py-4 sm:px-5">
        <label htmlFor="ask-input" className="sr-only">
          Ask a question about Indriya jewellery
        </label>
        <div className="flex items-center gap-2 rounded-full border border-border bg-card py-1.5 pl-5 pr-1.5 focus-within:border-maroon">
          <input
            id="ask-input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            maxLength={300}
            autoComplete="off"
            placeholder="Type your question…"
            className="min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
          />
          <button
            type="submit"
            disabled={!input.trim() || pending}
            aria-label="Send question"
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-maroon text-ivory transition-opacity disabled:opacity-40"
          >
            <ArrowUp className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>
        <p className="mt-3 px-2 text-[11px] leading-relaxed text-muted-foreground">
          AI assistant for a student project, not Indriya&rsquo;s official support. Please confirm
          prices and offers on indriya.com. Questions are saved anonymously to improve this FAQ.
        </p>
      </form>
    </div>
  );
}

function fallback(q: string): Msg {
  const hit = matchFaq(q);
  if (hit) {
    const src = hit.source ? sourceById(hit.source) : undefined;
    return {
      role: "assistant",
      content: hit.a,
      sources: src ? [src] : [],
      note: "Answered from our FAQ",
    };
  }
  return {
    role: "assistant",
    content: `I don't have an answer for that yet. Indriya's jewellery experts can help: call customer care on ${CARE_PHONE} or visit a store near you.`,
    sources: [sourceById("stores"), sourceById("indriya")].filter((s): s is Source => !!s),
  };
}

export function CareLine() {
  return (
    <a
      href={`tel:${CARE_PHONE.replace(/-/g, "")}`}
      className="inline-flex items-center gap-2 text-sm text-ivory/85 hover:text-[#e2c48f]"
    >
      <Phone className="h-4 w-4" aria-hidden="true" /> {CARE_PHONE}
    </a>
  );
}
