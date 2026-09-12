type Tone = "light" | "blue" | "teal" | "orange" | "violet" | "navy" | "white";
type Size = "sm" | "md";

const TONE_CLASSES: Record<Tone, string> = {
  light: "bg-surface-2 text-ink-600",
  blue: "bg-brand-blue text-mist-100",
  teal: "bg-brand-teal text-mist-100",
  orange: "bg-brand-orange text-ink-900",
  violet: "bg-brand-moss text-mist-100",
  navy: "bg-navy-500 text-mist-200",
  white: "bg-mist-100 text-ink-800",
};

const SIZE_CLASSES: Record<Size, string> = {
  sm: "px-2.5 py-1 text-xs",
  md: "px-3.5 py-2.5 text-sm",
};

export function Pill({
  children,
  tone = "light",
  size = "md",
  className = "",
}: {
  children: React.ReactNode;
  tone?: Tone;
  size?: Size;
  className?: string;
}) {
  return (
    <span
      className={`inline-flex items-center rounded-full font-medium tracking-[0.2px] ${TONE_CLASSES[tone]} ${SIZE_CLASSES[size]} ${className}`}
    >
      {children}
    </span>
  );
}
