import { NextRequest, NextResponse } from "next/server";
import { clientFromRequest, serverClient } from "@/lib/supabase";

export async function GET(req: NextRequest) {
  const { data: { user } } = await clientFromRequest(req).auth.getUser();
  if (!user?.email) return NextResponse.json({ isAdmin: false });

  const { data: adminRow } = await serverClient()
    .from("admins")
    .select("email")
    .eq("email", user.email)
    .maybeSingle();

  return NextResponse.json({ isAdmin: !!adminRow });
}
