import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { cache } from "react";
import type { Database } from "@/lib/supabase/types";

/**
 * Supabase client for use in Server Components, Server Actions and Route
 * Handlers. Reads/writes the session via the request's cookies.
 */
export async function createClient() {
  const cookieStore = await cookies();

  return createServerClient<Database>(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_PUBLISHABLE_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            for (const { name, value, options } of cookiesToSet) {
              cookieStore.set(name, value, options);
            }
          } catch {
            // Called from a Server Component render, where cookies can't be
            // set. Safe to ignore as long as proxy.ts is refreshing the
            // session on every request.
          }
        },
      },
    }
  );
}

/**
 * The signed-in user, authoritative (calls Supabase's Auth server) and
 * memoized for the lifetime of one request — call this as many times as
 * you like across Server Components/actions in the same render without
 * paying for repeat network round-trips. Returns null when signed out.
 */
export const getCurrentUser = cache(async () => {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return user;
});
