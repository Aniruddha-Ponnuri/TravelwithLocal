export function HeartIcon({ filled, className = "" }: { filled: boolean; className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill={filled ? "currentColor" : "none"} stroke="currentColor" strokeWidth={2}>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 20.5s-7.5-4.6-10-9.3C.5 8 1.8 4.5 5.2 3.6c2.1-.6 4.3.3 5.5 2.1l1.3 1.9 1.3-1.9c1.2-1.8 3.4-2.7 5.5-2.1 3.4.9 4.7 4.4 3.2 7.6-2.5 4.7-10 9.3-10 9.3Z"
      />
    </svg>
  );
}
