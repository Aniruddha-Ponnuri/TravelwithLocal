import type { InputHTMLAttributes } from "react";

/** A labeled text input for the sign-in / sign-up forms. */
export function AuthField({
  label,
  name,
  type = "text",
  ...props
}: {
  label: string;
  name: string;
} & Omit<InputHTMLAttributes<HTMLInputElement>, "name" | "id">) {
  return (
    <label htmlFor={name} className="flex flex-col gap-1.5">
      <span className="text-sm font-medium text-ink-700">{label}</span>
      <input
        id={name}
        name={name}
        type={type}
        className="rounded-xl border border-line-soft bg-surface px-4 py-3 text-base text-ink-700 outline-none transition-colors focus:border-brand-blue"
        {...props}
      />
    </label>
  );
}
