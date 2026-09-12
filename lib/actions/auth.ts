"use server";

import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { createClient } from "@/lib/supabase/server";

export interface AuthFormState {
  error: string | null;
}

function friendlyError(message: string): string {
  if (message.includes("Invalid login credentials")) {
    return "That email and password don't match our records.";
  }
  if (message.includes("User already registered")) {
    return "An account with that email already exists — try signing in instead.";
  }
  if (message.includes("Password should be at least")) {
    return "Use a password with at least 6 characters.";
  }
  return message;
}

export async function signInWithPassword(
  _prevState: AuthFormState,
  formData: FormData
): Promise<AuthFormState> {
  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");
  const next = String(formData.get("next") ?? "/account");

  if (!email || !password) {
    return { error: "Enter your email and password." };
  }

  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    return { error: friendlyError(error.message) };
  }

  redirect(next);
}

export async function signUpWithPassword(
  _prevState: AuthFormState,
  formData: FormData
): Promise<AuthFormState> {
  const fullName = String(formData.get("fullName") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");

  if (!fullName || !email || !password) {
    return { error: "Fill in your name, email and a password." };
  }
  if (password.length < 6) {
    return { error: "Use a password with at least 6 characters." };
  }

  const origin = (await headers()).get("origin");
  const supabase = await createClient();
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { full_name: fullName },
      emailRedirectTo: `${origin}/auth/callback`,
    },
  });

  if (error) {
    return { error: friendlyError(error.message) };
  }

  // Email confirmation is on by default for new Supabase projects: a
  // session with no identities means "check your inbox", not a failure.
  if (data.user && data.user.identities && data.user.identities.length === 0) {
    return { error: "An account with that email already exists — try signing in instead." };
  }

  if (!data.session) {
    redirect("/login?checkEmail=1");
  }

  redirect("/account");
}

export async function signInWithGoogle(formData: FormData) {
  const next = formData.get("next");
  const origin = (await headers()).get("origin");
  const supabase = await createClient();
  const redirectTo = new URL("/auth/callback", origin ?? undefined);
  if (typeof next === "string" && next) redirectTo.searchParams.set("next", next);

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: { redirectTo: redirectTo.toString() },
  });

  if (error || !data.url) {
    redirect(`/login?error=${encodeURIComponent(error?.message ?? "Could not start Google sign-in")}`);
  }

  redirect(data.url);
}

export async function signOut() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/");
}
