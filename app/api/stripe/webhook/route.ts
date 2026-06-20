import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { serverClient } from "@/lib/supabase";

const getStripe = () => new Stripe(process.env.STRIPE_SECRET_KEY!);

const PLAN_CREDITS: Record<string, number> = {
  starter: 50,
  growth: 200,
  enterprise: 300,
};

export async function POST(req: NextRequest) {
  const body = await req.text();
  const sig = req.headers.get("stripe-signature");
  if (!sig) return NextResponse.json({ error: "Missing signature" }, { status: 400 });

  let event: Stripe.Event;
  try {
    event = getStripe().webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET!);
  } catch {
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  // Webhooks need service role to bypass RLS (no user session cookie here)
  const db = serverClient();

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.CheckoutSession;
    const userId = session.metadata?.userId;
    const plan = session.metadata?.plan ?? "starter";
    const credits = PLAN_CREDITS[plan] ?? 50;

    if (userId) {
      await db.from("user_plans").upsert(
        {
          user_id: userId,
          plan,
          credits_balance: credits,
          credits_monthly: credits,
          stripe_customer_id: session.customer as string,
          stripe_subscription_id: session.subscription as string,
        },
        { onConflict: "user_id" }
      );
    }
  }

  if (event.type === "invoice.payment_succeeded") {
    const invoice = event.data.object as Stripe.Invoice;
    const customerId = invoice.customer as string;
    const { data: plan } = await db
      .from("user_plans")
      .select("credits_monthly")
      .eq("stripe_customer_id", customerId)
      .single();
    if (plan) {
      await db
        .from("user_plans")
        .update({ credits_balance: plan.credits_monthly })
        .eq("stripe_customer_id", customerId);
    }
  }

  if (event.type === "customer.subscription.deleted") {
    const sub = event.data.object as Stripe.Subscription;
    await db
      .from("user_plans")
      .update({ plan: "starter", credits_balance: 50, credits_monthly: 50, stripe_subscription_id: null })
      .eq("stripe_customer_id", sub.customer as string);
  }

  return NextResponse.json({ received: true });
}
