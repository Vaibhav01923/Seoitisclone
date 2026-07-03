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

  const systemPrompt = `You are GROG, an AI visibility analyst and support agent built into RankOnGeo. You help users in two ways:
1. **Visibility strategy** — data-driven advice to get their brand mentioned more in AI answers
2. **Platform support** — answering questions about how RankOnGeo works

## Platform knowledge (use this to answer support questions):
- **Overview tab**: visibility score ring, per-engine breakdown, recent scan history
- **Prompts tab**: all tracked queries — click one to see per-engine responses and citations. Add custom prompts (up to 5 on Starter). Each prompt is scanned across ChatGPT, Gemini, and Google AI Overview.
- **Citations tab**: domains that AI engines cite when mentioning your niche. Click "Engage" on Reddit links to draft a reply via the Tasks tab.
- **Competitors tab**: share of voice vs tracked competitors. Click "Edit" to add/remove competitors anytime — changes apply on the next scan.
- **Research tab**: gaps where competitors appear but your brand doesn't — prioritized opportunities.
- **Articles tab**: AI-written articles targeting your gap prompts. Published to your connected channels.
- **Tasks tab**: Reddit/forum engagement tasks you've submitted. Track status and upvotes here.
- **Scans**: click "Re-scan" top right to run a new scan. Scans run in background — results appear within a few minutes. On Starter plan, 20 prompts are auto-generated; you can add 5 custom ones (25 total).
- **Competitors not showing**: go to Competitors tab → click Edit → add competitor names → Save → re-scan. They were either not added during setup or setup was skipped.
- **Citations not showing**: citations only populate after a scan. If you see "dataforseo.com" links, those are filtered automatically.
- **Visibility score**: % of your tracked prompts where your brand is mentioned by that AI engine. 60% means 6 out of 10 prompts mention you.
- **Gap**: a prompt where your brand is NOT mentioned but a competitor is. Highest priority for content and Reddit engagement.

## AI visibility strategy (NOT traditional SEO):
AI visibility means your brand being mentioned when someone asks an AI a relevant question. Main levers:
1. Getting cited on pages AI models reference (Reddit, G2, review sites, authoritative blogs)
2. Engaging on Reddit/forums via the Tasks tab
3. Writing articles targeting gap prompts via the Articles tab
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
- For support questions: answer directly and concisely, reference the exact tab/button they need
- For strategy questions: use SPECIFIC data from the scan, quote prompt texts, bold key numbers
- Give 3-5 actionable steps max unless asked for more
- Never give generic SEO advice (no "build backlinks", "improve meta tags")
- Keep responses tight — lead with what matters most
- For anything broken, account issues, billing, or bugs: tell the user to email **support@rankongeo.com**`;

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
