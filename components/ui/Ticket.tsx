/**
 * The boarding-pass motif: a stamped mono code plus the dashed, notched
 * divider (`.ticket` / `.ticket-divider`, defined in app/globals.css) that
 * splits a ticket stub from its main panel. Reserved for content that is
 * genuinely a priced, bookable unit — a trip tier, a pace option.
 */

/** A stamped ticket code — for a literal sequence step or booking-tier label, not decoration. */
export function TicketCode({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 font-[family-name:var(--font-mono-ticket)] text-xs tracking-[0.06em] text-ink-500 ${className}`}
    >
      {children}
    </span>
  );
}

/** The dashed, punch-notched divider between a ticket's stub and its main panel. Pass a `left-[…]` class to position the split. */
export function TicketDivider({ className = "" }: { className?: string }) {
  return <span className={`ticket-divider ${className}`} />;
}
