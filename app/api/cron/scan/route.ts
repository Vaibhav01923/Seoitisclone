import { NextRequest, NextResponse } from "next/server";
import { serverClient } from "@/lib/supabase";
import { runScanForBrand } from "@/lib/scan-engine";
import { AIEngine, BrandData } from "@/lib/types";

export const maxDuration = 300;

// Only 2 engines per cron run to stay within timeout
const CRON_ENGINES: AIEngine[] = ["chatgpt", "claude"];

// Max brands per cron invocation — prevents timeout
const BRANDS_PER_RUN = 2;

export async function GET(req: NextRequest) {
  const authHeader = req.headers.get("authorization");
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const db = serverClient();

  // Pick the brands least recently scanned (rotating fairness)
  // Left join scan_runs to get max scanned_at per brand, order ascending so
  // brands never scanned come first, then oldest scan next.
  const { data: brands, error } = await db
    .from("brands")
    .select(`
      id, name, domain, niche, description, target_audience, competitors,
      scan_runs(created_at)
    `)
    .order("created_at", { referencedTable: "scan_runs", ascending: true })
    .limit(BRANDS_PER_RUN * 5); // fetch extra, filter below to BRANDS_PER_RUN with prompts

  if (error || !brands?.length) {
    return NextResponse.json({ scanned: 0, error: error?.message ?? "No brands found" });
  }

  let scanned = 0;
  let attempted = 0;
  const errors: string[] = [];

  for (const brandRow of brands) {
    if (attempted >= BRANDS_PER_RUN) break;

    const { data: promptRows } = await db
      .from("tracked_prompts")
      .select("id, text, category")
      .eq("brand_id", brandRow.id)
      .limit(20); // cap prompts per brand

    if (!promptRows?.length) continue;
    attempted++;

    const brand: BrandData = {
      id: brandRow.id,
      domain: brandRow.domain,
      name: brandRow.name,
      niche: brandRow.niche,
      description: brandRow.description,
      targetAudience: brandRow.target_audience,
      competitors: brandRow.competitors ?? [],
      trackedPrompts: promptRows.map((p) => ({ id: p.id, text: p.text, category: p.category })),
    };

    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      await runScanForBrand(brand, CRON_ENGINES, db as any);
      scanned++;
      console.log(`[cron] Scanned brand: ${brand.name} (${brand.id})`);
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      errors.push(`${brand.name}: ${msg}`);
      console.error(`[cron] Failed brand ${brand.name}:`, err);
    }
  }

  return NextResponse.json({ scanned, errors: errors.length ? errors : undefined });
}
