import Link from "next/link";
import type { ButtonHTMLAttributes } from "react";

type Variant = "primary" | "teal" | "orange" | "white" | "ghost-dark";
type Size = "sm" | "md" | "lg";

const VARIANT_CLASSES: Record<Variant, string> = {
  primary: "bg-brand-blue text-mist-100 hover:bg-brand-blue-dark",
  teal: "bg-brand-teal text-mist-100 hover:bg-brand-teal-dark",
  orange: "bg-brand-orange text-mist-100 hover:bg-brand-orange-dark",
  white: "bg-mist-100 text-ink-800 hover:bg-surface-2",
  "ghost-dark": "bg-navy-600 text-mist-100 border border-navy-border hover:bg-navy-500",
};

const SIZE_CLASSES: Record<Size, string> = {
  sm: "px-3.5 py-2.5 text-sm",
  md: "h-10 px-5 text-sm",
  lg: "h-12 px-6 text-sm",
};

interface CommonProps {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: React.ReactNode;
}

type ButtonAsButton = CommonProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, "className" | "children"> & {
    href?: undefined;
  };

type ButtonAsLink = CommonProps & {
  href: string;
};

export function Button(props: ButtonAsButton | ButtonAsLink) {
  const { variant = "primary", size = "md", className = "", children } = props;
  const base = `inline-flex items-center justify-center gap-2 rounded-full font-medium tracking-[0.2px] transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-blue ${VARIANT_CLASSES[variant]} ${SIZE_CLASSES[size]} ${className}`;

  if ("href" in props && props.href) {
    return (
      <Link href={props.href} className={base}>
        {children}
      </Link>
    );
  }

  const { href: _href, variant: _variant, size: _size, className: _className, children: _children, ...nativeProps } =
    props as ButtonAsButton;
  return (
    <button className={base} {...nativeProps}>
      {children}
    </button>
  );
}
