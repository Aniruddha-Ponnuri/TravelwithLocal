import Link from "next/link";
import { Suspense } from "react";
import { NavAuth } from "@/components/layout/NavAuth";
import { primaryNavLinks } from "@/lib/data";

const NAV_LINKS = [...primaryNavLinks, { label: "Stays", href: "/stays" }];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-surface/95 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-[1440px] items-center gap-6 px-6 lg:px-20">
        <Link href="/" className="shrink-0 font-display text-xl text-ink-700">
          TravelWithLocals
        </Link>
        <nav className="hidden items-center gap-6 text-sm font-medium text-ink-600 md:flex" aria-label="Primary">
          {NAV_LINKS.map((link) => (
            <Link key={link.href} href={link.href} className="transition-colors hover:text-ink-800">
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="ml-auto flex items-center gap-3">
          <Link
            href="/stays"
            className="hidden rounded-full bg-surface-2 px-4 py-2 text-sm font-medium text-ink-700 hover:bg-line-soft sm:inline-flex"
          >
            Book a stay
          </Link>
          <Suspense fallback={<div className="h-9 w-[92px] animate-pulse rounded-full bg-surface-2" />}>
            <NavAuth variant="light" />
          </Suspense>
        </div>
      </div>
    </header>
  );
}
