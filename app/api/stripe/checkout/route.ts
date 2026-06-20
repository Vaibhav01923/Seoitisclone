import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { clientFromRequest } from "@/lib/supabase";

const getStripe = () => new Stripe(process.env.STRIPE_SECRET_KEY!);

const PLAN_PRICES: Record<string, string | undefined> = {
  starter: process.env.STRIPE_STARTER_PRICE_ID,
  growth: process.env.STRIPE_GROWTH_PRICE_ID,
  enterprise: process.env.STRIPE_ENTERPRISE_PRICE_ID,
};

export async function POST(req: NextRequest) {
  const { plan } = await req.json();

  const db = clientFromRequest(req);
  const { data: { user } } = await db.auth.getUser();
  if (!user) return NextResponse.json({ error: "Not authenticated" }, { status: 401 });

  const priceId = PLAN_PRICES[plan];
  if (!priceId) return NextResponse.json({ error: "Invalid plan or Stripe price not configured" }, { status: 400 });

  const origin = req.headers.get("origin") ?? "http://localhost:3000";

  const session = await getStripe().checkout.sessions.create({
    mode: "subscription",
    payment_method_types: ["card"],
    line_items: [{ price: priceId, quantity: 1 }],
    success_url: `${origin}/dashboard?subscription=success`,
    cancel_url: `${origin}/pricing`,
    metadata: { userId: user.id, plan },
    customer_email: user.email ?? undefined,
  });

  return NextResponse.json({ url: session.url });
}
