"use client";

import { useActionState } from "react";
import { updateProfile, type ProfileFormState } from "@/lib/actions/profile";
import { AuthField } from "@/components/auth/AuthField";
import { FormError } from "@/components/auth/FormError";
import { Button } from "@/components/ui/Button";

const initialState: ProfileFormState = { error: null, success: false };

export function ProfileForm({ fullName }: { fullName: string }) {
  const [state, formAction, pending] = useActionState(updateProfile, initialState);

  return (
    <form action={formAction} className="flex flex-col gap-4">
      <FormError message={state.error} />
      {state.success ? (
        <p role="status" className="rounded-xl border border-brand-teal/30 bg-brand-teal/10 px-4 py-3 text-sm text-ink-700">
          Saved.
        </p>
      ) : null}
      <AuthField label="Full name" name="fullName" defaultValue={fullName} required />
      <Button type="submit" variant="primary" size="md" className="self-start" disabled={pending}>
        {pending ? "Saving…" : "Save changes"}
      </Button>
    </form>
  );
}
