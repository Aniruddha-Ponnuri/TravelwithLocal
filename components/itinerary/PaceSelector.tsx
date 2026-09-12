import Link from "next/link";
import { Pill } from "@/components/ui/Pill";
import { TicketCode, TicketDivider } from "@/components/ui/Ticket";
import { itineraries, itineraryOrder, type ItineraryPace } from "@/lib/data";

export function PaceSelector({ current }: { current: ItineraryPace }) {
  return (
    <section className="px-6 py-10 lg:px-20">
      <div className="mx-auto flex max-w-[1440px] flex-col items-start gap-6">
        <h2 className="font-display text-3xl leading-tight text-ink-700">
          Multiple itineraries, one selected experience
        </h2>
        <div className="flex w-full gap-5 overflow-x-auto pb-3">
          {itineraryOrder.map((pace) => {
            const it = itineraries[pace];
            const active = pace === current;
            return (
              <Link
                key={pace}
                href={`/itineraries/${pace}`}
                className={`ticket flex h-[140px] w-[264px] shrink-0 rounded-2xl border bg-mist-100 transition-colors ${
                  active ? "border-2 border-brand-blue" : "border-line hover:border-brand-blue/50"
                }`}
              >
                <div className="flex w-[74px] shrink-0 flex-col items-center justify-center gap-2 p-3 text-center">
                  <Pill tone={active ? it.chipTone : "light"} size="sm">
                    {it.chipLabel}
                  </Pill>
                </div>
                <TicketDivider className="left-[74px]" />
                <div className="flex flex-1 flex-col justify-center gap-1 p-5">
                  <p className="font-display text-2xl text-ink-700">{it.durationLabel}</p>
                  <p className="text-sm font-medium text-ink-500">{it.priceLabel}</p>
                  <TicketCode>{it.destination.toUpperCase()}</TicketCode>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
