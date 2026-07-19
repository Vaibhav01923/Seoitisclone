import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/admin";
import { serverClient } from "@/lib/supabase";

const MAX_BYTES = 8 * 1024 * 1024;
const EXT_BY_TYPE: Record<string, string> = {
  "image/png": "png",
  "image/jpeg": "jpg",
  "image/webp": "webp",
  "image/gif": "gif",
};

// Manual upload counterpart to generate-image/route.ts — same "blog-images"
// storage bucket and public-URL shape, so both paths (AI-generated or
// hand-picked) drop into the same place whether it's a post's thumbnail or
// an image inserted into the body while writing.
export async function POST(req: NextRequest) {
  const admin = await requireAdmin(req);
  if (!admin) return NextResponse.json({ error: "Not authorized" }, { status: 403 });

  const form = await req.formData().catch(() => null);
  const file = form?.get("file");
  if (!(file instanceof File)) return NextResponse.json({ error: "file is required" }, { status: 400 });

  const ext = EXT_BY_TYPE[file.type];
  if (!ext) return NextResponse.json({ error: "Unsupported image type — use PNG, JPEG, WebP, or GIF" }, { status: 400 });
  if (file.size > MAX_BYTES) return NextResponse.json({ error: "Image is too large (max 8MB)" }, { status: 400 });

  const buffer = Buffer.from(await file.arrayBuffer());
  const baseName = file.name.replace(/\.[^.]+$/, "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 60) || "image";
  const path = `${baseName}-${Date.now()}.${ext}`;

  const db = serverClient();
  const { error: uploadError } = await db.storage.from("blog-images").upload(path, buffer, {
    contentType: file.type,
    upsert: false,
  });
  if (uploadError) {
    console.error("[blog-upload-image] upload failed", { path, error: uploadError.message });
    return NextResponse.json({ error: `Failed to store image: ${uploadError.message}` }, { status: 500 });
  }

  const { data: pub } = db.storage.from("blog-images").getPublicUrl(path);
  return NextResponse.json({ imageUrl: pub.publicUrl });
}
