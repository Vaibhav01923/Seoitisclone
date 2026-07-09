import { NextRequest, NextResponse } from "next/server";
import { clientFromRequest } from "@/lib/supabase";

const THIRTY_DAYS_MS = 30 * 24 * 60 * 60 * 1000;
const LIVE_WINDOW_MS = 5 * 60 * 1000;

export async function GET(req: NextRequest) {
  const db = clientFromRequest(req);
  const { data: { user } } = await db.auth.getUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const brandId = req.nextUrl.searchParams.get("brandId");
  if (!brandId) return NextResponse.json({ error: "brandId required" }, { status: 400 });

  const { data: brand } = await db.from("brands").select("id, site_key").eq("id", brandId).eq("user_id", user.id).single();
  if (!brand) return NextResponse.json({ error: "Brand not found" }, { status: 404 });

  const since = new Date(Date.now() - THIRTY_DAYS_MS).toISOString();
  const { data: rows } = await db
    .from("bot_visits")
    .select("bot_name, path, referrer, created_at")
    .eq("brand_id", brandId)
    .gte("created_at", since)
    .order("created_at", { ascending: false });

  const visits = rows ?? [];
  const liveCutoff = Date.now() - LIVE_WINDOW_MS;

  const liveBots = new Set(visits.filter((v) => new Date(v.created_at).getTime() >= liveCutoff).map((v) => v.bot_name)).size;
  const botPageviews = visits.length;

  const byBot: Record<string, number> = {};
  for (const v of visits) byBot[v.bot_name] = (byBot[v.bot_name] ?? 0) + 1;

  return NextResponse.json({
    siteKey: brand.site_key,
    stats: { liveBots, botPageviews },
    breakdown: Object.entries(byBot).map(([botName, count]) => ({ botName, count })).sort((a, b) => b.count - a.count),
    recent: visits.slice(0, 20).map((v) => ({ botName: v.bot_name, path: v.path, referrer: v.referrer, createdAt: v.created_at })),
  });
}
