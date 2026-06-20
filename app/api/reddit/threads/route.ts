import { NextRequest, NextResponse } from "next/server";
import { clientFromRequest } from "@/lib/supabase";

export async function GET(req: NextRequest) {
  const brandId = req.nextUrl.searchParams.get("brandId");
  if (!brandId) return NextResponse.json({ error: "brandId required" }, { status: 400 });

  const db = clientFromRequest(req);
  const { data: { user } } = await db.auth.getUser();

  // Verify brand ownership
  const { data: brand } = await db
    .from("brands")
    .select("id")
    .eq("id", brandId)
    .eq("user_id", user?.id)
    .single();

  if (!brand) return NextResponse.json({ threads: [] });

  const { data: threads } = await db
    .from("reddit_threads")
    .select("*")
    .eq("brand_id", brandId)
    .order("reddit_created_at", { ascending: false })
    .limit(50);

  return NextResponse.json({
    threads: (threads ?? []).map((t) => ({
      id: t.id,
      keyword: t.keyword,
      redditId: t.reddit_id,
      subreddit: t.subreddit,
      title: t.title,
      url: t.url,
      body: t.body,
      score: t.score,
      numComments: t.num_comments,
      redditCreatedAt: t.reddit_created_at,
      discoveredAt: t.discovered_at,
      status: t.status,
      draftedReply: t.drafted_reply,
    })),
  });
}
