import { NextRequest, NextResponse } from "next/server";
import { clientFromRequest } from "@/lib/supabase";

export async function GET(req: NextRequest) {
  const brandId = req.nextUrl.searchParams.get("brandId");
  if (!brandId) return NextResponse.json({ error: "brandId required" }, { status: 400 });

  const db = clientFromRequest(req);
  const { data: { user } } = await db.auth.getUser();

  const { data: keywords } = await db
    .from("social_keywords")
    .select("id, keyword, created_at")
    .eq("brand_id", brandId)
    .eq("user_id", user?.id)
    .order("created_at");

  return NextResponse.json({ keywords: keywords ?? [] });
}

export async function POST(req: NextRequest) {
  const { brandId, keyword } = await req.json();
  if (!brandId || !keyword?.trim()) return NextResponse.json({ error: "brandId and keyword required" }, { status: 400 });

  const db = clientFromRequest(req);
  const { data: { user } } = await db.auth.getUser();

  const { data, error } = await db
    .from("social_keywords")
    .insert({ brand_id: brandId, user_id: user?.id, keyword: keyword.trim() })
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 400 });
  return NextResponse.json({ keyword: data });
}

export async function DELETE(req: NextRequest) {
  const id = req.nextUrl.searchParams.get("id");
  if (!id) return NextResponse.json({ error: "id required" }, { status: 400 });

  const db = clientFromRequest(req);
  const { data: { user } } = await db.auth.getUser();

  await db.from("social_keywords").delete().eq("id", id).eq("user_id", user?.id);
  return NextResponse.json({ success: true });
}
