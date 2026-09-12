/** The labeled-box wrapper shared by the planner and search form fields. */
export function FieldShell({
  label,
  className = "",
  children,
}: {
  label: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <label className={`flex h-[92px] flex-col gap-2 rounded-2xl border border-line-soft bg-surface px-5 py-[18px] ${className}`}>
      <span className="text-xs font-medium text-ink-500">{label}</span>
      {children}
    </label>
  );
}
