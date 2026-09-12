export function FormError({ message }: { message: string | null }) {
  if (!message) return null;
  return (
    <p role="alert" className="rounded-xl border border-brand-orange/30 bg-brand-orange/10 px-4 py-3 text-sm text-ink-700">
      {message}
    </p>
  );
}
