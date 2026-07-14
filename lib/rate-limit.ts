import { NextRequest } from "next/server";
import { serverClient } from "@/lib/supabase";

// True if the request is still under its limit for this bucket (and counts
// it towards the limit); false once the caller should be rejected. Backed by
// an atomic Postgres upsert (see supabase/migrations/*_add_rate_limiting.sql)
// so concurrent requests from the same IP can't race past the limit.
export async function checkRateLimit(bucket: string, identifier: string, limit: number, windowSeconds: number): Promise<boolean> {
  const { data, error } = await serverClient().rpc("check_rate_limit", {
    p_key: `${bucket}:${identifier}`,
    p_limit: limit,
    p_window_seconds: windowSeconds,
  });
  // Fail open on infra error — a broken rate limiter shouldn't take down the
  // feature it's protecting.
  if (error) return true;
  return !!data;
}

// Vercel/most proxies set x-forwarded-for to "client, proxy1, proxy2, ...";
// the first entry is the original client.
export function clientIp(req: NextRequest): string {
  const fwd = req.headers.get("x-forwarded-for");
  if (fwd) return fwd.split(",")[0].trim();
  return req.headers.get("x-real-ip") ?? "unknown";
}
