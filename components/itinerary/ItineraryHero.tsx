import { Button } from "@/components/ui/Button";
import { Pill } from "@/components/ui/Pill";
import { TicketCode } from "@/components/ui/Ticket";
import { Photo } from "@/components/scenes/Photo";
import type { Itinerary } from "@/lib/data";

export function ItineraryHero({ itinerary }: { itinerary: Itinerary }) {
  return (
    <section className="bg-surface px-6 py-10 lg:px-20">
      <div className="mx-auto flex max-w-[1440px] flex-col overflow-hidden rounded-3xl border border-line bg-ink-900 lg:flex-row">
        <div className="flex flex-1 flex-col items-start gap-5 p-6 sm:p-9">
          <TicketCode className="text-mist-300">Selected itinerary — {itinerary.chipLabel}</TicketCode>
          <h1 className="font-display text-5xl leading-tight text-mist-100">{itinerary.title}</h1>
          <p className="max-w-[520px] text-lg leading-[1.6] text-mist-200">{itinerary.summary}</p>
          <div className="flex flex-wrap gap-3">
            <Pill tone="white">{itinerary.durationLabel}</Pill>
            <Pill tone="white">₹{itinerary.price.toLocaleString("en-IN")}</Pill>
            <Pill tone="white">{itinerary.vibe}</Pill>
          </div>
          <div className="flex flex-wrap gap-3">
            {itinerary.includes.map((inc) => (
              <Pill key={inc} tone="navy">
                {inc}
              </Pill>
            ))}
          </div>
          <Button href="#booking" variant="white" size="lg">
            Reserve this plan
          </Button>
        </div>

        <div className="relative h-[240px] w-full shrink-0 border-t-2 border-dashed border-navy-border lg:h-auto lg:w-[420px] lg:border-l-2 lg:border-t-0">
          <Photo
            src={`/images/itinerary/${itinerary.destination.toLowerCase()}.jpg`}
            alt={`${itinerary.destination} scenery for the ${itinerary.title} itinerary`}
            rounded="rounded-none"
            className="h-full w-full"
            sizes="(max-width: 1024px) 90vw, 420px"
          />
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink-900/90 to-transparent p-5">
            <p className="text-xs font-medium tracking-[0.08em] text-mist-300">Route snapshot</p>
            <p className="mt-1 text-sm text-mist-100">{itinerary.route.join(" — ")}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
