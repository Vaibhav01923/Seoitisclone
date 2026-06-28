import { NextRequest, NextResponse } from "next/server";
import { clientFromRequest } from "@/lib/supabase";

export async function GET(req: NextRequest) {
  const brandId = req.nextUrl.searchParams.get("brandId");
  if (!brandId) return NextResponse.json({ error: "brandId required" }, { status: 400 });

  const db = clientFromRequest(req);
  const { data: { user } } = await db.auth.getUser();
  if (!user) return NextResponse.json({ error: "unauthorized" }, { status: 401 });

  const { data: latestRun } = await db
    .from("scan_runs")
    .select("id, engines, overall_score")
    .eq("brand_id", brandId)
    .order("created_at", { ascending: false })
    .limit(1)
    .single();

  if (!latestRun) return NextResponse.json({ results: [], scores: [], overallScore: 0 });

  const [{ data: rows, error }, { data: scoreRows }] = await Promise.all([
    db.from("scan_results")
      .select("prompt_id, prompt_text, engine, response, brand_mentioned, brand_rank, competitor_mentions, citations, scanned_at")
      .eq("scan_run_id", latestRun.id)
      .eq("brand_id", brandId),
    db.from("visibility_scores")
      .select("engine, score, mention_count, total_prompts, avg_rank")
      .eq("scan_run_id", latestRun.id),
  ]);

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  const results = (rows ?? []).map((r) => ({
    promptId: r.prompt_id,
    promptText: r.prompt_text,
    engine: r.engine,
    response: r.response,
    brandMentioned: r.brand_mentioned,
    brandRank: r.brand_rank,
    competitorMentions: r.competitor_mentions ?? [],
    citations: r.citations ?? [],
    scannedAt: r.scanned_at,
  }));

  // If visibility_scores weren't written (scan interrupted mid-way),
  // compute them on-the-fly from scan_results so scores are never 0.
  let scores = (scoreRows ?? []).map((s) => ({
    engine: s.engine,
    score: s.score,
    mentionCount: s.mention_count,
    totalPrompts: s.total_prompts,
    avgRank: s.avg_rank,
  }));

  if (scores.length === 0 && results.length > 0) {
    const engines = [...new Set(results.map((r) => r.engine))];
    scores = engines.map((engine) => {
      const er = results.filter((r) => r.engine === engine);
      const mentions = er.filter((r) => r.brandMentioned);
      const ranked = mentions.filter((r) => r.brandRank !== null);
      const avgRank = ranked.length
        ? ranked.reduce((s, r) => s + (r.brandRank ?? 0), 0) / ranked.length
        : null;
      return {
        engine,
        score: Math.round((mentions.length / er.length) * 100),
        mentionCount: mentions.length,
        totalPrompts: er.length,
        avgRank,
      };
    });
  }

  const overallScore = scores.length
    ? Math.round(scores.reduce((s, sc) => s + sc.score, 0) / scores.length)
    : latestRun.overall_score ?? 0;

  return NextResponse.json({ results, scores, overallScore });
}
