import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";
import { verifyAccessToken } from "@/lib/supabase/verify-jwt";

/**
 * Refreshes the Supabase session cookie on every request so server
 * components always see an up-to-date auth state. Also gates /account
 * behind sign-in.
 *
 * The sign-in check itself is optimistic and local: `getSession()` reads
 * the access token straight from the cookie (refreshing it via the
 * refresh token only when it's actually expired), and `verifyAccessToken`
 * checks that token's signature and expiry against Supabase's public
 * JWKS. Neither step calls Supabase's Auth server, so this runs on every
 * request without adding a network round trip. It's still only an
 * optimistic check — `app/account/page.tsx` calls the authoritative
 * `getUser()` before it renders or edits anything.
 */
export async function updateSession(request: NextRequest) {
  let response = NextResponse.next({ request });

  const supabase = createServerClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_PUBLISHABLE_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          for (const { name, value } of cookiesToSet) {
            request.cookies.set(name, value);
          }
          response = NextResponse.next({ request });
          for (const { name, value, options } of cookiesToSet) {
            response.cookies.set(name, value, options);
          }
        },
      },
    }
  );

  const {
    data: { session },
  } = await supabase.auth.getSession();
  const verified = await verifyAccessToken(session?.access_token);

  if (!verified && request.nextUrl.pathname.startsWith("/account")) {
    const redirectUrl = new URL("/login", request.url);
    redirectUrl.searchParams.set("next", request.nextUrl.pathname);
    return NextResponse.redirect(redirectUrl);
  }

  return response;
}
