// "Ask Indriya": a server function that answers visitor questions with Lovable AI, using only the
// knowledge pack in src/lib/knowledge.ts plus the product and store data on this site.
// The API key (LOVABLE_API_KEY) exists only on the server once Lovable Cloud is enabled; it never
// reaches the browser. If the key is missing or the service is busy, the page falls back to the
// closest written FAQ answer.

import { createServerFn } from "@tanstack/react-start";
import {
  ALL_FAQS,
  BRAND_FACTS,
  CARE_PHONE,
  SOURCES,
  sourceById,
  type Source,
} from "@/lib/knowledge";
import { PRODUCTS, productPath } from "@/lib/products";
import { STORES } from "@/lib/stores";

export type ChatMessage = { role: "user" | "assistant"; content: string };

export type AskResult =
  | { ok: true; answer: string; sources: Source[] }
  | { ok: false; reason: "unavailable" | "busy" | "invalid" };

const GATEWAY = "https://ai.gateway.lovable.dev/v1/chat/completions";
const MODELS = ["google/gemini-3.7-flash", "google/gemini-2.5-flash"];
const MAX_QUESTION = 300;
const MAX_HISTORY = 6;

const env = (name: string): string | undefined =>
  (globalThis as { process?: { env?: Record<string, string | undefined> } }).process?.env?.[name];

function buildContext() {
  const faqs = ALL_FAQS.map((f) => `Q: ${f.q}\nA: ${f.a} [${f.source ?? "indriya"}]`).join("\n\n");
  const products = PRODUCTS.map(
    (p) => `- ${p.name} (${p.type}): ${p.description} Page: ${productPath(p)} [anantara]`,
  ).join("\n");
  const stores = STORES.map(
    (s) =>
      `- ${s.name}: ${s.address}. Hours ${s.hours}. Phone ${s.phone}. Page: /store-locator/${s.slug} [stores]`,
  ).join("\n");
  const sources = SOURCES.map((s) => `${s.id} = ${s.label}`).join("; ");
  return `BRAND FACTS\n${BRAND_FACTS.map((f) => `- ${f}`).join("\n")}\n\nFAQS\n${faqs}\n\nANANTARA PRODUCTS\n${products}\n\nMUMBAI STORES\n${stores}\n\nSOURCE IDS: ${sources}`;
}

const SYSTEM_PROMPT = `You are "Ask Indriya", the assistant on a student-project website about Indriya, the Aditya Birla Group's jewellery brand, and its Anantara bridal temple jewellery collection.

Rules:
1. Answer ONLY from the KNOWLEDGE below. If the answer is not there, say you don't know and suggest calling Indriya customer care on ${CARE_PHONE} or visiting a store. Never invent policies, offers, discounts, weights or stock.
2. Never state a price, gold rate or making-charge figure. For prices, say gold rates change daily and point to the gold rate button on this site, or to indriya.com.
3. Only discuss Indriya, jewellery, gold and this site. Politely decline anything else in one sentence.
4. Keep answers to 2-4 short sentences in plain text, warm and polished, like a jewellery expert in a store. No markdown, no lists, no emojis.
5. If asked, be clear that this is a student project and not Indriya's official website or support.
6. End with one final line exactly in this form, listing 1-2 source ids from the knowledge that support your answer: SOURCES: id1, id2

KNOWLEDGE
${buildContext()}`;

function parseInput(raw: unknown): { messages: ChatMessage[] } {
  const list = (raw as { messages?: unknown })?.messages;
  if (!Array.isArray(list)) throw new Error("messages required");
  const messages = list
    .filter(
      (m): m is ChatMessage =>
        !!m &&
        typeof m === "object" &&
        ((m as ChatMessage).role === "user" || (m as ChatMessage).role === "assistant") &&
        typeof (m as ChatMessage).content === "string",
    )
    .slice(-MAX_HISTORY)
    .map((m) => ({ role: m.role, content: m.content.slice(0, MAX_QUESTION * 3) }));
  const last = messages.at(-1);
  if (!last || last.role !== "user" || !last.content.trim()) throw new Error("question required");
  last.content = last.content.slice(0, MAX_QUESTION);
  return { messages };
}

/** Saves the question (never a name or contact detail) if a questions table has been set up. */
async function logQuestion(question: string) {
  console.log(JSON.stringify({ event: "ask-indriya", question, at: new Date().toISOString() }));
  const url = env("SUPABASE_URL");
  const key = env("SUPABASE_SERVICE_ROLE_KEY");
  if (!url || !key) return;
  try {
    await fetch(`${url}/rest/v1/bot_questions`, {
      method: "POST",
      headers: {
        apikey: key,
        Authorization: `Bearer ${key}`,
        "Content-Type": "application/json",
        Prefer: "return=minimal",
      },
      body: JSON.stringify({ question }),
    });
  } catch {
    // Logging is optional; never fail the answer because of it.
  }
}

function splitSources(text: string): { answer: string; sources: Source[] } {
  const match = text.match(/\n?\s*SOURCES?:\s*(.+)\s*$/i);
  const ids = match?.[1]?.split(/[,\s]+/).filter(Boolean) ?? [];
  const sources = [...new Set(ids)]
    .map((id) => sourceById(id.replace(/[^a-z-]/gi, "").toLowerCase()))
    .filter((s): s is Source => !!s)
    .slice(0, 2);
  const answer = (match ? text.slice(0, match.index) : text).replace(/[*#_`]/g, "").trim();
  return { answer, sources };
}

export const askIndriya = createServerFn({ method: "POST" })
  .inputValidator(parseInput)
  .handler(async ({ data }): Promise<AskResult> => {
    const question = data.messages.at(-1)?.content ?? "";
    void logQuestion(question);

    const key = env("LOVABLE_API_KEY");
    if (!key) return { ok: false, reason: "unavailable" };

    for (const model of MODELS) {
      try {
        const res = await fetch(env("ASK_GATEWAY_URL") ?? GATEWAY, {
          method: "POST",
          headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
          body: JSON.stringify({
            model,
            temperature: 0.2,
            max_tokens: 400,
            messages: [{ role: "system", content: SYSTEM_PROMPT }, ...data.messages],
          }),
        });
        if (res.status === 429 || res.status === 402) return { ok: false, reason: "busy" };
        if (!res.ok) continue; // e.g. model not available: try the next one
        const json = (await res.json()) as {
          choices?: { message?: { content?: string } }[];
        };
        const text = json.choices?.[0]?.message?.content?.trim();
        if (!text) continue;
        const { answer, sources } = splitSources(text);
        if (!answer) continue;
        return { ok: true, answer, sources };
      } catch {
        // network error: try the next model, then fall back
      }
    }
    return { ok: false, reason: "unavailable" };
  });
