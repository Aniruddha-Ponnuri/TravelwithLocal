"use client";

import { useActionState } from "react";
import { signUpWithPassword, type AuthFormState } from "@/lib/actions/auth";
import { AuthField } from "@/components/auth/AuthField";
import { FormError } from "@/components/auth/FormError";
import { Button } from "@/components/ui/Button";

const initialState: AuthFormState = { error: null };

export function SignupForm() {
  const [state, formAction, pending] = useActionState(signUpWithPassword, initialState);

  return (
    <form action={formAction} className="flex flex-col gap-4">
      <FormError message={state.error} />
      <AuthField label="Full name" name="fullName" autoComplete="name" required />
      <AuthField label="Email" name="email" type="email" autoComplete="email" required />
      <AuthField
        label="Password"
        name="password"
        type="password"
        autoComplete="new-password"
        minLength={6}
        required
      />
      <Button type="submit" variant="primary" size="lg" className="mt-2 w-full" disabled={pending}>
        {pending ? "Creating account…" : "Create account"}
      </Button>
    </form>
  );
}
