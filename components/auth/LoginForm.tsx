"use client";

import { useActionState } from "react";
import { signInWithPassword, type AuthFormState } from "@/lib/actions/auth";
import { AuthField } from "@/components/auth/AuthField";
import { FormError } from "@/components/auth/FormError";
import { Button } from "@/components/ui/Button";

const initialState: AuthFormState = { error: null };

export function LoginForm({ next }: { next?: string }) {
  const [state, formAction, pending] = useActionState(signInWithPassword, initialState);

  return (
    <form action={formAction} className="flex flex-col gap-4">
      {next ? <input type="hidden" name="next" value={next} /> : null}
      <FormError message={state.error} />
      <AuthField label="Email" name="email" type="email" autoComplete="email" required />
      <AuthField label="Password" name="password" type="password" autoComplete="current-password" required />
      <Button type="submit" variant="primary" size="lg" className="mt-2 w-full" disabled={pending}>
        {pending ? "Signing in…" : "Sign in"}
      </Button>
    </form>
  );
}
