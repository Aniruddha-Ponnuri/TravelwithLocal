// Google sign-in is implemented (lib/actions/auth.ts's signInWithGoogle,
// components/auth/GoogleButton.tsx) but disabled until the Google provider
// is configured in the Supabase dashboard (Authentication → Providers →
// Google, with a Google Cloud OAuth client). Flip this back to true once
// that's done — no other code changes needed.
export const GOOGLE_AUTH_ENABLED = false;
