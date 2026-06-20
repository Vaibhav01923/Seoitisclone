import { NextRequest, NextResponse } from "next/server";
import { clientFromRequest } from "@/lib/supabase";

export async function GET(req: NextRequest) {
  const db = clientFromRequest(req);
  const { data: { user } } = await db.auth.getUser();
  if (!user) return NextResponse.json({ error: "Not authenticated" }, { status: 401 });

  let { data: plan } = await db.from("user_plans").select("*").eq("user_id", user.id).single();

  if (!plan) {
    const { data: created } = await db
      .from("user_plans")
      .insert({ user_id: user.id, plan: "starter", credits_balance: 50, credits_monthly: 50 })
      .select()
      .single();
    plan = created;
  }

  return NextResponse.json({
    plan: plan?.plan ?? "starter",
    creditsBalance: plan?.credits_balance ?? 50,
    creditsMonthly: plan?.credits_monthly ?? 50,
    stripeCustomerId: plan?.stripe_customer_id ?? null,
    currentPeriodEnd: plan?.current_period_end ?? null,
  });
}
