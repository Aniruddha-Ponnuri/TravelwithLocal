import Link from "next/link";

/**
 * A grid card that links to the stay search when its destination is
 * bookable, and renders as a plain (non-interactive) card otherwise —
 * shared by the getaway and destination grids on the homepage.
 */
export function CardLink({
  href,
  bookable,
  className,
  children,
}: {
  href: string;
  bookable: boolean;
  className: string;
  children: React.ReactNode;
}) {
  if (!bookable) {
    return <div className={className}>{children}</div>;
  }
  return (
    <Link href={href} className={className}>
      {children}
    </Link>
  );
}
