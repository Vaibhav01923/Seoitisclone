import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";
import { GoogleGenAI } from "@google/genai";
import { requireAdmin } from "@/lib/admin";
import { serverClient } from "@/lib/supabase";

const getOpenAI = () => new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
const getGemini = () => new GoogleGenAI({ apiKey: process.env.GOOGLE_GEMINI_API_KEY });

const STYLE_GUIDE = `Editorial style: abstract and minimal, in the spirit of a night sky — soft gradients, orbit rings, constellations, drifting seeds, a deep ink-navy background with warm rust, olive and cream accents. No text, letters, logos, or watermarks anywhere in the image. No photorealistic people or faces. No charts, graphs, or dashboards with fabricated data.`;

async function draftPrompt(title: string, description: string): Promise<string> {
  const response = await getOpenAI().chat.completions.create({
    model: "gpt-4o-mini",
    max_tokens: 220,
    messages: [
      {
        role: "user",
        content: `Write a single image-generation prompt for the cover/thumbnail image of a blog post on the RankOnGeo blog (rankongeo.com), a SaaS that tracks brand visibility in AI search engines.

${STYLE_GUIDE}

Blog post title: "${title}"
${description ? `Description: ${description}` : ""}

Return ONLY the image prompt itself as one paragraph — no preamble, no quotes, no markdown.`,
      },
    ],
  });
  return (response.choices[0]?.message?.content ?? "").trim();
}

export async function POST(req: NextRequest) {
  const admin = await requireAdmin(req);
  if (!admin) return NextResponse.json({ error: "Not authorized" }, { status: 403 });

  const { title, description, slug, prompt: providedPrompt } = await req.json();
  if (!title?.trim()) return NextResponse.json({ error: "title is required" }, { status: 400 });

  let prompt = (providedPrompt ?? "").trim();
  if (!prompt) {
    try {
      prompt = await draftPrompt(title.trim(), (description ?? "").trim());
    } catch (e) {
      console.error("[blog-image] prompt draft failed", { error: e instanceof Error ? e.message : e });
      return NextResponse.json({ error: "Could not draft an image prompt — try again" }, { status: 502 });
    }
    if (!prompt) return NextResponse.json({ error: "Could not draft an image prompt — try again" }, { status: 502 });
  }

  let imageB64: string | undefined;
  let mimeType = "image/png";
  try {
    const result = await getGemini().models.generateContent({
      model: "gemini-3.1-flash-lite-image",
      contents: prompt,
      config: { responseModalities: ["IMAGE"] },
    });
    const parts = result.candidates?.[0]?.content?.parts ?? [];
    const imagePart = parts.find((p) => p.inlineData?.data);
    imageB64 = imagePart?.inlineData?.data;
    mimeType = imagePart?.inlineData?.mimeType ?? mimeType;
  } catch (e) {
    console.error("[blog-image] generation failed", { error: e instanceof Error ? e.message : e });
    return NextResponse.json({ error: e instanceof Error ? e.message : "Image generation failed" }, { status: 502 });
  }
  if (!imageB64) return NextResponse.json({ error: "Image generation returned no image" }, { status: 502 });

  const buffer = Buffer.from(imageB64, "base64");
  const ext = mimeType === "image/jpeg" ? "jpg" : mimeType === "image/webp" ? "webp" : "png";
  const baseName = (slug || title).toString().toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 60) || "cover";
  const path = `${baseName}-${Date.now()}.${ext}`;

  const db = serverClient();
  const { error: uploadError } = await db.storage.from("blog-images").upload(path, buffer, {
    contentType: mimeType,
    upsert: false,
  });
  if (uploadError) {
    console.error("[blog-image] upload failed", { path, error: uploadError.message });
    return NextResponse.json({ error: `Failed to store image: ${uploadError.message}` }, { status: 500 });
  }

  const { data: pub } = db.storage.from("blog-images").getPublicUrl(path);

  return NextResponse.json({ prompt, imageUrl: pub.publicUrl });
}
