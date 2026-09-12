import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { primaryNavLinks } from "@/lib/data";

const NAV_LINKS = [...primaryNavLinks, { label: "Community", href: "/#community" }];

export function HeroNav() {
  return (
    <nav className="flex w-full items-center gap-6" aria-label="Primary">
      <Link href="/" className="shrink-0 font-display text-2xl text-mist-100">
        TravelWithLocals
      </Link>
      <div className="h-px flex-1" aria-hidden />
      <ul className="hidden items-start gap-6 text-sm font-medium tracking-[0.01em] text-mist-200 md:flex">
        {NAV_LINKS.map((link) => (
          <li key={link.href}>
            <Link href={link.href} className="transition-colors hover:text-mist-100">
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
      <div className="flex shrink-0 items-center gap-3">
        <Button href="/account" variant="ghost-dark" size="sm">
          Sign in
        </Button>
        <Button href="/account" variant="white" size="sm">
          Profile
        </Button>
      </div>
    </nav>
  );
}
