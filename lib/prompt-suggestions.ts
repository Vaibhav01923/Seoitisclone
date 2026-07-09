import OpenAI from "openai";

const getClient = () => new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export type PromptSuggestionDraft = { text: string; category: string };

// Generates fresh discovery-prompt suggestions via the LLM. Used for the
// initial batch, a full "suggest new ones" regenerate, and single-item
// backfill after a suggestion gets accepted into tracked_prompts — count
// and excludeTexts (already-tracked + already-suggested) change per caller.
export async function generatePromptSuggestions(params: {
  brandName: string;
  domain: string;
  niche: string;
  description: string;
  competitors: string;
  excludeTexts: string[];
  count: number;
}): Promise<PromptSuggestionDraft[]> {
  const { brandName, domain, niche, description, competitors, excludeTexts, count } = params;

  const systemPrompt = `You are an AI visibility strategist for "${brandName}" (${niche}).

Description: ${description}
Competitors: ${competitors || "unknown — infer from niche"}

Generate ${count} NEW discovery search prompts — questions people in this niche type into ChatGPT/Gemini when they have a problem and don't know ${brandName} exists. Think: seasonal queries, emerging trends, underserved use cases, competitor-alternative asks, casual Reddit-style questions.

Rules:
- NEVER mention "${brandName}" or "${domain}" — these are discovery prompts.
- Do NOT duplicate or trivially rephrase any of these already-tracked/suggested prompts:
${excludeTexts.map((t) => `- ${t}`).join("\n")}
- category is "Competitor" if the prompt names a competitor, otherwise "Commercial".

Return JSON: { "prompts": [ { "text": "...", "category": "Commercial" }, ... ] }`;

  const response = await getClient().chat.completions.create({
    model: "gpt-5.5",
    max_completion_tokens: Math.max(500, count * 200),
    messages: [{ role: "user", content: systemPrompt }],
    response_format: { type: "json_object" },
  });

  const raw = response.choices[0]?.message?.content ?? "{}";
  let prompts: PromptSuggestionDraft[];
  try {
    const parsed = JSON.parse(raw);
    prompts = Array.isArray(parsed) ? parsed : (parsed.prompts ?? []);
  } catch {
    return [];
  }

  const nameRe = brandName.trim()
    ? new RegExp(brandName.trim().replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "i")
    : null;
  const excludeLower = new Set(excludeTexts.map((t) => t.toLowerCase().trim()));

  return prompts
    .filter((p) => p.text?.trim() && !(nameRe && nameRe.test(p.text)) && !excludeLower.has(p.text.toLowerCase().trim()))
    .slice(0, count);
}
