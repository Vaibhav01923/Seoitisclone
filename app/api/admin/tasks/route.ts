import { NextRequest } from "next/server";
import { clientFromRequest, serverClient } from "@/lib/supabase";

async function requireAdmin(req: NextRequest): Promise<{ email: string } | Response> {
  const { data: { user } } = await clientFromRequest(req).auth.getUser();
  if (!user?.email) {
    return new Response(JSON.stringify({ error: "Forbidden" }), { status: 403 });
  }
  const { data: adminRow } = await serverClient()
    .from("admins")
    .select("email")
    .eq("email", user.email)
    .maybeSingle();
  if (!adminRow) {
    return new Response(JSON.stringify({ error: "Forbidden" }), { status: 403 });
  }
  return { email: user.email };
}

function mapTask(t: Record<string, unknown>, email: string) {
  return {
    id: t.id,
    brandId: t.brand_id,
    userId: t.user_id,
    userEmail: email,
    url: t.url,
    promptText: t.prompt_text,
    engine: t.engine,
    replyText: t.reply_text,
    upvotesOrdered: t.upvotes_ordered,
    deliverySpeed: t.delivery_speed,
    status: t.status,
    createdAt: t.created_at,
    completedAt: t.completed_at ?? null,
  };
}

export async function GET(req: NextRequest) {
  const auth = await requireAdmin(req);
  if (auth instanceof Response) return auth;

  const admin = serverClient();

  const { data: tasks, error } = await admin
    .from("engage_tasks")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  if (!tasks?.length) return new Response(JSON.stringify({ tasks: [] }), { headers: { "Content-Type": "application/json" } });

  // Resolve user_id → email via auth.admin.listUsers
  const userIds = [...new Set(tasks.map((t) => t.user_id as string))];
  const emailMap: Record<string, string> = {};

  try {
    const { data: usersData } = await admin.auth.admin.listUsers({ perPage: 1000 });
    for (const u of usersData?.users ?? []) {
      if (userIds.includes(u.id)) emailMap[u.id] = u.email ?? u.id;
    }
  } catch {
    // fallback: show user_id as email if listUsers fails (missing service role key)
    for (const id of userIds) emailMap[id] = id;
  }

  const result = tasks.map((t) => mapTask(t as Record<string, unknown>, emailMap[t.user_id as string] ?? t.user_id));

  return new Response(JSON.stringify({ tasks: result }), { headers: { "Content-Type": "application/json" } });
}

export async function PATCH(req: NextRequest) {
  const auth = await requireAdmin(req);
  if (auth instanceof Response) return auth;

  const { taskId, status } = await req.json();
  if (!taskId || !status) return new Response(JSON.stringify({ error: "taskId and status required" }), { status: 400 });

  const update: Record<string, unknown> = { status };
  if (status === "completed") update.completed_at = new Date().toISOString();

  const { error } = await serverClient()
    .from("engage_tasks")
    .update(update)
    .eq("id", taskId);

  if (error) return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  return new Response(JSON.stringify({ ok: true }), { headers: { "Content-Type": "application/json" } });
}
