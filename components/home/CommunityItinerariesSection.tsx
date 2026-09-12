import Link from "next/link";
import { TicketCode, TicketDivider } from "@/components/ui/Ticket";
import { itineraries, itineraryOrder } from "@/lib/data";

const HOME_PACES = itineraryOrder.slice(0, 3);

export function CommunityItinerariesSection() {
  return (
    <section id="trips" className="scroll-mt-24 px-6 py-14 lg:px-20">
      <div className="mx-auto flex max-w-[1440px] flex-col items-start gap-6">
        <h2 className="font-display text-4xl leading-tight text-ink-700">
          Itineraries built from real community knowledge
        </h2>
        <div className="grid w-full grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {HOME_PACES.map((pace) => {
            const it = itineraries[pace];
            return (
              <Link
                key={pace}
                href={`/itineraries/${it.pace}`}
                className="ticket flex h-[300px] rounded-2xl border border-line bg-mist-100 transition-transform hover:-translate-y-1"
              >
                <div className="flex w-[104px] shrink-0 flex-col items-start justify-between p-5">
                  <TicketCode>{it.chipLabel}</TicketCode>
                  <TicketCode className="[writing-mode:vertical-rl]">
                    NO.{String(it.days).padStart(2, "0")}
                  </TicketCode>
                </div>
                <TicketDivider className="left-[104px]" />
                <div className="flex flex-1 flex-col justify-between p-6">
                  <div>
                    <p className="font-display text-5xl text-ink-700">{it.durationLabel}</p>
                    <p className="mt-1 font-display text-2xl text-brand-blue">{it.priceLabel}</p>
                  </div>
                  <ul className="flex flex-col gap-1.5 text-sm font-medium text-ink-500">
                    {it.includes.map((inc) => (
                      <li key={inc}>{inc}</li>
                    ))}
                  </ul>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
