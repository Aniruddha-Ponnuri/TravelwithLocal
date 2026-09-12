import Link from "next/link";

const TABS = [
  { key: "profile", label: "Profile" },
  { key: "favorites", label: "Favorites" },
] as const;

export function AccountTabs({ active }: { active: string }) {
  return (
    <nav className="flex gap-6 border-b border-line" aria-label="Account sections">
      {TABS.map((tab) => {
        const isActive = tab.key === active;
        return (
          <Link
            key={tab.key}
            href={tab.key === "profile" ? "/account" : `/account?tab=${tab.key}`}
            aria-current={isActive ? "page" : undefined}
            className={`border-b-2 pb-3 text-sm font-medium transition-colors ${
              isActive ? "border-brand-blue text-ink-700" : "border-transparent text-ink-500 hover:text-ink-700"
            }`}
          >
            {tab.label}
          </Link>
        );
      })}
    </nav>
  );
}
