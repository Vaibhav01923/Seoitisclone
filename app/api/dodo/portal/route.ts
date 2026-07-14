import { NextRequest, NextResponse } from "next/server";
import DodoPayments from "dodopayments";
import { clientFromRequest } from "@/lib/supabase";

const getDodo = () =>
  new DodoPayments({
    bearerToken: process.env.DODO_API_KEY!,
    environment: (process.env.DODO_ENVIRONMENT ?? "test_mode") as "test_mode" | "live_mode",
  });

// Hands back a link to Dodo's hosted customer portal — payment method,
// invoices, and cancellation are handled there rather than reimplemented here.
export async function POST(req: NextRequest) {
  const db = clientFromRequest(req);
  const { data: { user } } = await db.auth.getUser();
  if (!user) return NextResponse.json({ error: "Not authenticated" }, { status: 401 });

  const { data: userPlan } = await db
    .from("user_plans")
    .select("dodo_customer_id")
    .eq("user_id", user.id)
    .maybeSingle();

  if (!userPlan?.dodo_customer_id) {
    return NextResponse.json({ error: "No billing account yet — subscribe to a plan first" }, { status: 400 });
  }

  const origin = req.headers.get("origin") ?? "http://localhost:3000";
  const session = await getDodo().customers.customerPortal.create(userPlan.dodo_customer_id, {
    return_url: `${origin}/settings`,
  });

  return NextResponse.json({ url: session.link });
}
