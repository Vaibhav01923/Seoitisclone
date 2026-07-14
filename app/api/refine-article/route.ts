import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";
import { clientFromRequest } from "@/lib/supabase";
import { checkRateLimit } from "@/lib/rate-limit";

const getClient = () => new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function POST(req: NextRequest) {
  const { data: { user } } = await clientFromRequest(req).auth.getUser();
  if (!user) return NextResponse.json({ error: "Not authenticated" }, { status: 401 });

  if (!(await checkRateLimit("refine-article", user.id, 30, 3600))) {
    return NextResponse.json({ error: "Too many requests — please try again in a bit." }, { status: 429 });
  }

  const { content, title, instruction } = await req.json();

  if (!content || !instruction) {
    return NextResponse.json({ error: "content and instruction are required" }, { status: 400 });
  }

  const prompt = `You are an expert content editor. Apply the following instruction to the article below. Return the complete modified article in the same markdown format, preserving structure and quality. Keep the H1 title at the top unless specifically instructed to change it.

Instruction: ${instruction}

Article to edit:
${content}

Return only the modified article markdown, no commentary or preamble.`;

  try {
    const response = await getClient().chat.completions.create({
      model: "gpt-4o-mini",
      max_tokens: 4096,
      messages: [{ role: "user", content: prompt }],
    });

    const raw = response.choices[0]?.message?.content ?? "";
    const refined = raw.replace(/^```(?:markdown)?\n?/i, "").replace(/\n?```$/i, "").trim();
    if (!refined) throw new Error("Model returned an empty response");

    const titleMatch = refined.match(/^#\s+(.+)/m);
    const refinedTitle = titleMatch ? titleMatch[1].trim() : title;
    const wordCount = refined.split(/\s+/).filter(Boolean).length;

    return NextResponse.json({ article: refined, title: refinedTitle, wordCount });
  } catch (err) {
    return NextResponse.json({ error: err instanceof Error ? err.message : "Failed to refine article" }, { status: 500 });
  }
}
