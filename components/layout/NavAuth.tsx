import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { getNavUser } from "@/lib/supabase/session";

/** Sign in/up links, or a Profile pill once signed in — shown in both site headers. */
export async function NavAuth({ variant }: { variant: "light" | "dark" }) {
  const user = await getNavUser();

  if (!user) {
    return variant === "dark" ? (
      <>
        <Button href="/login" variant="ghost-dark" size="sm">
          Sign in
        </Button>
        <Button href="/signup" variant="white" size="sm">
          Sign up
        </Button>
      </>
    ) : (
      <>
        <Link href="/login" className="hidden text-sm font-medium text-ink-600 hover:text-ink-800 sm:inline">
          Sign in
        </Link>
        <Button href="/signup" variant="primary" size="sm">
          Sign up
        </Button>
      </>
    );
  }

  const initial = (user.fullName || user.email || "?").charAt(0).toUpperCase();
  const pillClass =
    variant === "dark" ? "bg-mist-100 text-ink-800 hover:bg-surface-2" : "bg-surface-2 text-ink-700 hover:bg-line-soft";

  return (
    <Link
      href="/account"
      className={`flex shrink-0 items-center gap-2 rounded-full py-1.5 pl-1.5 pr-4 text-sm font-medium transition-colors ${pillClass}`}
    >
      {user.avatarUrl ? (
        <span className="relative h-7 w-7 shrink-0 overflow-hidden rounded-full">
          <Image src={user.avatarUrl} alt="" fill sizes="28px" className="object-cover" />
        </span>
      ) : (
        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-brand-blue text-xs text-mist-100">
          {initial}
        </span>
      )}
      Profile
    </Link>
  );
}
