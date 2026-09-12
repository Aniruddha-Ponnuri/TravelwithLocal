import { Button } from "@/components/ui/Button";
import { RouteMap } from "@/components/itinerary/RouteMap";
import type { Itinerary } from "@/lib/data";

export function DetailSection({ itinerary }: { itinerary: Itinerary }) {
  return (
    <section id="booking" className="scroll-mt-24 px-6 pb-14 pt-6 lg:px-20">
      <div className="mx-auto flex max-w-[1440px] flex-col gap-8 lg:flex-row">
        <div className="flex flex-1 flex-col items-start gap-6">
          <h2 className="font-display text-3xl leading-tight text-ink-700">Day by day</h2>
          <ol className="flex w-full flex-col gap-0">
            {itinerary.itinerary.map((day, i) => (
              <li key={day.label} className="relative border-l-2 border-line pb-8 pl-8 last:pb-0">
                <span className="absolute -left-[9px] top-1 flex h-[18px] w-[18px] items-center justify-center rounded-full bg-brand-blue font-[family-name:var(--font-mono-ticket)] text-[10px] text-mist-100">
                  {i + 1}
                </span>
                <div className="flex flex-col gap-1.5">
                  <p className="text-xs font-medium tracking-[0.08em] text-brand-blue">{day.label}</p>
                  <p className="text-lg font-medium text-ink-700">{day.title}</p>
                  <p className="max-w-[640px] text-sm leading-[1.6] text-ink-500">{day.detail}</p>
                </div>
              </li>
            ))}
          </ol>
          <div className="flex w-full flex-col gap-2.5 rounded-2xl border border-line p-6">
            <p className="text-lg font-medium text-ink-700">Why this itinerary works</p>
            {itinerary.whyItWorks.map((point) => (
              <p key={point} className="text-sm leading-[1.6] text-ink-500">
                {point}
              </p>
            ))}
          </div>
        </div>

        <div className="flex w-full flex-col gap-5 lg:w-[420px] lg:shrink-0">
          <div className="flex flex-col gap-3 rounded-2xl bg-ink-900 p-6">
            <p className="text-lg font-medium text-mist-100">Booking summary</p>
            <p className="font-display text-5xl text-mist-100">
              ₹{itinerary.price.toLocaleString("en-IN")}
            </p>
            <p className="text-sm text-mist-300">
              Hotel, activities, transfers and daily recommendations included.
            </p>
            <Button
              href={`/stays?city=${encodeURIComponent(itinerary.destination)}`}
              variant="white"
              size="lg"
              className="mt-1"
            >
              Continue to booking
            </Button>
          </div>

          <div className="flex flex-col gap-4 rounded-2xl border border-line p-4">
            <RouteMap stops={itinerary.route} />
            <p className="text-sm text-ink-500">Route overview for the selected itinerary</p>
          </div>

          <div className="flex flex-col gap-3 rounded-2xl border border-line p-6">
            <p className="text-lg font-medium text-ink-700">{itinerary.stay.heading}</p>
            <p className="text-sm text-ink-500">{itinerary.stay.text}</p>
            <ul className="flex flex-col gap-2 text-sm text-ink-600">
              {itinerary.stay.perks.map((perk) => (
                <li key={perk}>— {perk}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
