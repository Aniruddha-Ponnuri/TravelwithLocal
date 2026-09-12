import Link from "next/link";

const COLUMNS = [
  { heading: "Discover", href: "/#discover" },
  { heading: "Trips", href: "/#trips" },
  { heading: "Experiences", href: "/#experiences" },
  { heading: "Support", href: "/support" },
  { heading: "Privacy", href: "/privacy" },
];

export function Footer() {
  return (
    <footer className="bg-ink-900 px-6 py-14 lg:px-20">
      <div className="mx-auto flex max-w-[1440px] flex-col gap-10 border-t border-navy-border pt-10 lg:flex-row lg:gap-[120px]">
        <div className="flex max-w-[320px] flex-col gap-3">
          <p className="font-display text-2xl text-mist-100">TravelWithLocals</p>
          <p className="text-lg leading-[1.6] text-mist-200">
            Community-powered travel for people who want real places, not packaged itineraries.
          </p>
        </div>
        <div className="flex flex-wrap gap-x-14 gap-y-8">
          {COLUMNS.map((col) => (
            <div key={col.heading} className="flex flex-col gap-3">
              <p className="text-lg font-medium text-mist-100">{col.heading}</p>
              <Link href={col.href} className="text-sm font-medium tracking-[0.01em] text-mist-200 hover:text-mist-100">
                Explore {col.heading.toLowerCase()}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </footer>
  );
}
