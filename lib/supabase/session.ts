import { createClient, getCurrentUser } from "@/lib/supabase/server";

export interface NavUser {
  email: string;
  fullName: string | null;
  avatarUrl: string | null;
}

/** The signed-in user's nav-display info, or null when signed out. Used by the site headers. */
export async function getNavUser(): Promise<NavUser | null> {
  const user = await getCurrentUser();
  if (!user) return null;

  const supabase = await createClient();
  const { data: profile } = await supabase
    .from("profiles")
    .select("full_name, avatar_url")
    .eq("id", user.id)
    .single();

  return {
    email: user.email ?? "",
    fullName: profile?.full_name ?? null,
    avatarUrl: profile?.avatar_url ?? null,
  };
}
