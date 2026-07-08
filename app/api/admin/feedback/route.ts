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

export async function GET(req: NextRequest) {
  const auth = await requireAdmin(req);
  if (auth instanceof Response) return auth;

  const admin = serverClient();

  const { data: submissions, error } = await admin
    .from("feedback")
    .select("id, user_id, category, title, description, created_at")
    .order("created_at", { ascending: false });

  if (error) return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  if (!submissions?.length) return new Response(JSON.stringify({ submissions: [] }), { headers: { "Content-Type": "application/json" } });

  const userIds = [...new Set(submissions.map((s) => s.user_id as string))];
  const emailMap: Record<string, string> = {};

  try {
    const { data: usersData } = await admin.auth.admin.listUsers({ perPage: 1000 });
    for (const u of usersData?.users ?? []) {
      if (userIds.includes(u.id)) emailMap[u.id] = u.email ?? u.id;
    }
  } catch {
    for (const id of userIds) emailMap[id] = id;
  }

  const result = submissions.map((s) => ({
    id: s.id,
    userEmail: emailMap[s.user_id as string] ?? s.user_id,
    category: s.category,
    title: s.title,
    description: s.description,
    createdAt: s.created_at,
  }));

  return new Response(JSON.stringify({ submissions: result }), { headers: { "Content-Type": "application/json" } });
}
