import { HeroNav } from "@/components/layout/HeroNav";
import { Button } from "@/components/ui/Button";
import { Photo } from "@/components/scenes/Photo";

const STATS = [
  { value: "15,000+", label: "Travelers" },
  { value: "500+", label: "Experiences" },
  { value: "50+", label: "Cities" },
];

export function HeroSection() {
  return (
    <section className="relative isolate flex min-h-[600px] flex-col overflow-hidden bg-ink-900 sm:min-h-[680px] lg:min-h-[760px]">
      <div className="absolute inset-0">
        <Photo
          src="/images/hero-visual.jpg"
          alt="Mountain valley in Meghalaya, the route a local guide walks travelers through at dawn"
          rounded="rounded-none"
          className="h-full w-full"
          sizes="100vw"
          priority
        />
      </div>
      <div
        className="absolute inset-0 bg-gradient-to-t from-ink-900 via-ink-900/55 to-ink-900/10"
        aria-hidden
      />

      <div className="relative z-10 px-6 pt-6 lg:px-20 lg:pt-8">
        <div className="mx-auto max-w-[1440px]">
          <HeroNav />
        </div>
      </div>

      <div className="relative z-10 mt-auto px-6 pb-14 lg:px-20 lg:pb-16">
        <div className="mx-auto flex max-w-[1440px] flex-col items-start gap-8">
          <div className="reveal-rise flex max-w-[640px] flex-col items-start gap-6">
            <h1 className="font-display text-[2.75rem] font-medium leading-[1.05] text-mist-100 sm:text-6xl lg:text-[4.25rem]">
              Where locals take you off the map
            </h1>
            <p className="max-w-[520px] text-lg leading-[1.6] text-mist-200">
              Skip the tourist trail. Connect with people who live there, and let a route built by a
              local — not an algorithm — decide where you go next.
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <Button href="#plan" variant="primary" size="lg">
                Plan my trip
              </Button>
              <Button href="#experiences" variant="ghost-dark" size="lg">
                See local experiences
              </Button>
            </div>
          </div>
          <div className="flex flex-wrap gap-10 border-t border-navy-border pt-6">
            {STATS.map((stat) => (
              <div key={stat.label} className="flex flex-col gap-1">
                <p className="font-display text-2xl text-mist-100">{stat.value}</p>
                <p className="text-sm font-medium tracking-[0.02em] text-mist-300">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="perforation relative z-10" aria-hidden />
    </section>
  );
}
