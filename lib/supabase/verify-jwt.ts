import { createRemoteJWKSet, jwtVerify } from "jose";

// This project signs access tokens with an asymmetric key (ES256), not a
// shared secret — `supabase projects api-keys` / the dashboard's "JWT
// Secret" field doesn't exist for it. Verifying against the public JWKS
// gives the same cryptographic guarantee a shared secret would, without
// ever needing one: `createRemoteJWKSet` fetches and caches the public
// key, so this never makes a request to Supabase's Auth server itself.
const JWKS = createRemoteJWKSet(new URL(`${process.env.SUPABASE_URL}/auth/v1/.well-known/jwks.json`));

export interface VerifiedSession {
  userId: string;
  email?: string;
}

/**
 * Verifies a Supabase access token's signature and expiry locally — no
 * network round-trip to Supabase. This is an *optimistic* check, suitable
 * for proxy-level route gating; treat `lib/supabase/server.ts`'s
 * `getUser()` (which does call Supabase) as the authoritative check
 * before rendering or mutating actual account data.
 */
export async function verifyAccessToken(token: string | undefined): Promise<VerifiedSession | null> {
  if (!token) return null;
  try {
    const { payload } = await jwtVerify(token, JWKS, {
      issuer: `${process.env.SUPABASE_URL}/auth/v1`,
    });
    if (typeof payload.sub !== "string") return null;
    return { userId: payload.sub, email: typeof payload.email === "string" ? payload.email : undefined };
  } catch {
    return null;
  }
}
