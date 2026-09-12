import { signInWithGoogle } from "@/lib/actions/auth";
import { GoogleIcon } from "@/components/auth/GoogleIcon";

export function GoogleButton({ next }: { next?: string }) {
  return (
    <form action={signInWithGoogle}>
      {next ? <input type="hidden" name="next" value={next} /> : null}
      <button
        type="submit"
        className="inline-flex h-12 w-full items-center justify-center gap-3 rounded-full border border-line bg-mist-100 text-sm font-medium text-ink-700 transition-colors hover:bg-surface-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-blue"
      >
        <GoogleIcon className="h-[18px] w-[18px]" />
        Continue with Google
      </button>
    </form>
  );
}
