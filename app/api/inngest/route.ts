import { serve } from "inngest/next";
import { inngest } from "@/inngest/client";
import { scheduledScanAll, scanBrand, manualScanBrand } from "@/inngest/functions/scan";
import { pollRedditOrders } from "@/inngest/functions/reddit-orders";

export const maxDuration = 300;

export const { GET, POST, PUT } = serve({
  client: inngest,
  functions: [scheduledScanAll, scanBrand, manualScanBrand, pollRedditOrders],
});
