import { NextRequest, NextResponse } from "next/server";
import { serverClient } from "@/lib/supabase";

// Whoever clicks this link already has an account (they're verifying an
// existing one, not signing up) — route through /auth in sign-in mode
// rather than straight to /dashboard, whose own auth guard has no way to
// know "signin" is the right default and would otherwise show signup.
// A visitor with a live session here just bounces straight through (see
// proxy.ts's already-signed-in /auth handling) — no extra step for them.
function loginRedirect(origin: string, target: string): string {
  return `${origin}/auth?mode=signin&redirect=${encodeURIComponent(target)}`;
}

// Public by design — the unguessable token is the sole trust boundary, same
// shape as the team_invites accept flow. Works with no session so it
// doesn't matter which browser/device the link ends up opened in.
export async function GET(req: NextRequest) {
  const token = req.nextUrl.searchParams.get("token");
  const origin = req.nextUrl.origin;
  if (!token) return NextResponse.redirect(loginRedirect(origin, "/dashboard"));

  const admin = serverClient();
  const { data: row } = await admin
    .from("user_plans")
    .select("user_id, email_verify_token_expires_at")
    .eq("email_verify_token", token)
    .maybeSingle();

  if (!row) return NextResponse.redirect(loginRedirect(origin, "/dashboard"));
  if (row.email_verify_token_expires_at && new Date(row.email_verify_token_expires_at).getTime() < Date.now()) {
    return NextResponse.redirect(loginRedirect(origin, "/dashboard?verify_expired=1"));
  }

  await admin
    .from("user_plans")
    .update({ email_verified_at: new Date().toISOString(), email_verify_token: null, email_verify_token_expires_at: null })
    .eq("user_id", row.user_id);

  return NextResponse.redirect(loginRedirect(origin, "/dashboard?verified=1"));
}
