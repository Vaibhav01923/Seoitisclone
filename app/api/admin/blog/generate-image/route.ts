import { NextRequest, NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";
import { requireAdmin } from "@/lib/admin";
import { serverClient } from "@/lib/supabase";

const getGemini = () => new GoogleGenAI({ apiKey: process.env.GOOGLE_GEMINI_API_KEY });

export async function POST(req: NextRequest) {
  const admin = await requireAdmin(req);
  if (!admin) return NextResponse.json({ error: "Not authorized" }, { status: 403 });

  const { title, slug, prompt: providedPrompt } = await req.json();
  if (!title?.trim()) return NextResponse.json({ error: "title is required" }, { status: 400 });

  const prompt =
    (providedPrompt ?? "").trim() || `Generate a thumbnail for this blog post: "${title.trim()}"`;

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
