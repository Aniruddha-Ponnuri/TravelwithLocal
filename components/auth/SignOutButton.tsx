import { signOut } from "@/lib/actions/auth";

export function SignOutButton() {
  return (
    <form action={signOut}>
      <button
        type="submit"
        className="rounded-full border border-line-soft px-5 py-3 text-sm font-medium text-ink-700 transition-colors hover:bg-surface-2"
      >
        Sign out
      </button>
    </form>
  );
}
