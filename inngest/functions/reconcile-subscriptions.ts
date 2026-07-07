import { inngest } from "@/inngest/client";
import { serverClient } from "@/lib/supabase";
import DodoPayments from "dodopayments";

const getDodo = () =>
  new DodoPayments({
    bearerToken: process.env.DODO_API_KEY!,
    environment: (process.env.DODO_ENVIRONMENT ?? "test_mode") as "test_mode" | "live_mode",
  });

// Safety net for missed subscription.active webhooks (confirmed to happen —
// Dodo's delivery or our processing occasionally drops one, leaving a real
// paying customer looking like free-tier with no error surfaced anywhere).
// Cross-checks Dodo's actual active subscriptions from the last 24h against
// user_plans and self-heals any mismatch, so a missed webhook fixes itself
// within one poll cycle instead of needing a manual replay.
export const reconcileDodoSubscriptions = inngest.createFunction(
  { id: "reconcile-dodo-subscriptions", retries: 0, triggers: [{ cron: "*/10 * * * *" }] },
  async ({ step }) => {
    const result = await step.run("reconcile-active-subscriptions", async () => {
      const db = serverClient();
      const dodo = getDodo();
      const since = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString();

      let checked = 0;
      let fixed = 0;

      for await (const sub of dodo.subscriptions.list({ status: "active", created_at_gte: since })) {
        checked++;
        const userId = sub.metadata?.userId;
        const plan = sub.metadata?.plan;
        if (!userId || !plan) continue; // not one of ours (e.g. a different brand on the same Dodo business)

        const { data: existing } = await db
          .from("user_plans")
          .select("dodo_subscription_id")
          .eq("user_id", userId)
          .single();

        if (existing?.dodo_subscription_id === sub.subscription_id) continue; // already in sync

        await db.from("user_plans").upsert(
          {
            user_id: userId,
            plan,
            dodo_customer_id: sub.customer?.customer_id ?? null,
            dodo_subscription_id: sub.subscription_id,
            current_period_end: sub.next_billing_date ?? null,
          },
          { onConflict: "user_id" }
        );
        fixed++;
        console.error("[reconcile-subscriptions] fixed missed webhook", { userId, subscriptionId: sub.subscription_id });
      }

      return { checked, fixed };
    });

    return result;
  }
);
