import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

const getClient = () => new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function POST(req: NextRequest) {
  const { messages, scanContext } = await req.json();

  if (!messages?.length) {
    return NextResponse.json({ error: "messages required" }, { status: 400 });
  }

  const {
    brandName, domain, niche, overallScore, scores, gaps,
    totalPrompts, competitors, promptBreakdown,
  } = scanContext ?? {};

  const hasData = overallScore !== null && overallScore !== undefined;

  const perEngineLines = scores?.length
    ? scores.map((s: { engine: string; score: number; mentionCount?: number; totalPrompts?: number }) =>
        `  • ${s.engine}: ${s.score}%${s.mentionCount !== undefined ? ` (mentioned in ${s.mentionCount}/${s.totalPrompts} prompts)` : ""}`
      ).join("\n")
    : "  No scan data yet.";

  const promptBreakdownLines = promptBreakdown?.length
    ? promptBreakdown.map((p: { text: string; chatgpt: boolean | null; gemini: boolean | null; google: boolean | null }) =>
        `  "${p.text}": GPT=${p.chatgpt === null ? "—" : p.chatgpt ? "✓" : "✗"} | Gemini=${p.gemini === null ? "—" : p.gemini ? "✓" : "✗"} | Google=${p.google === null ? "—" : p.google ? "✓" : "✗"}`
      ).join("\n")
    : "";

  const gapLines = gaps?.length
    ? gaps.map((g: { promptText: string; engines?: string[]; topCompetitor?: string }) =>
        `  "${g.promptText}" — missing from: ${g.engines?.join(", ") ?? "all engines"}${g.topCompetitor ? `, top competitor shown: ${g.topCompetitor}` : ""}`
      ).join("\n")
    : "  No gaps found — excellent coverage!";

  const systemPrompt = `You are GROG, an AI visibility analyst built into RankOnGeo. You give sharp, data-driven advice to help brands appear more in AI-generated answers (ChatGPT, Gemini, Google AI Overview).

CRITICAL: This is NOT traditional SEO. AI visibility means your brand being mentioned when someone asks an AI a relevant question. The main levers are:
1. Getting cited on pages AI models reference (Reddit threads, G2, review sites, authoritative blogs)
2. Engaging authentically on Reddit/forums (use the platform's Tasks tab to draft + post replies)
3. Writing targeted articles that target gap prompts (use the platform's Articles tab)
4. Adding more tracked prompts to discover new gaps

${brandName ? `## Analyzing: ${brandName} (${domain}) — ${niche}` : "## No brand loaded yet"}

${hasData ? `## Live scan data:
Overall visibility: **${overallScore}%** across **${totalPrompts} prompts**

Per-engine breakdown:
${perEngineLines}

Competitors tracked: ${competitors?.join(", ") || "none"}

## Prompt-by-prompt results:
${promptBreakdownLines}

## Visibility gaps (where ${brandName} is NOT mentioned):
${gapLines}` : "## No scan data yet — ask the user to run a scan first"}

## How to respond:
- Reference SPECIFIC prompt texts from the data (quote them with "quotes")
- Use SPECIFIC numbers from the scan (%, counts, ranks)
- Give 3-5 actionable steps max unless user asks for more detail
- Tie recommendations to platform features: Articles tab (write content), Tasks tab (Reddit engagement), Prompts tab (add more prompts)
- Never give generic SEO advice (no "build backlinks", "improve meta tags", etc.)
- Bold key numbers: **88%**, **3 gaps**, etc.
- Keep responses concise and punchy — lead with what matters most`;

  const response = await getClient().chat.completions.create({
    model: "gpt-4o-mini",
    max_tokens: 800,
    messages: [
      { role: "system", content: systemPrompt },
      ...messages.map((m: { role: string; content: string }) => ({
        role: m.role as "user" | "assistant",
        content: m.content,
      })),
    ],
  });

  const reply = response.choices[0]?.message?.content ?? "I couldn't generate a response. Please try again.";
  return NextResponse.json({ reply });
}
