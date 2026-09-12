"use client";

import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/Button";
import { FieldShell } from "@/components/ui/Field";
import { cities } from "@/lib/data";

type Mode = "hotels" | "flights" | "cabs";

const TABS: { id: Mode; label: string }[] = [
  { id: "hotels", label: "Hotels" },
  { id: "flights", label: "Flights" },
  { id: "cabs", label: "Cabs" },
];

export function SearchSection() {
  const router = useRouter();
  const [mode, setMode] = useState<Mode>("hotels");
  const [destination, setDestination] = useState<string>(cities[0]);
  const [checkIn, setCheckIn] = useState("2026-06-21");
  const [checkOut, setCheckOut] = useState("2026-06-24");
  const [guests, setGuests] = useState(2);

  function handleSearch(e: FormEvent) {
    e.preventDefault();
    const params = new URLSearchParams({
      city: destination,
      checkIn,
      checkOut,
      guests: String(guests),
    });
    router.push(`/stays?${params.toString()}`);
  }

  return (
    <section id="book" className="scroll-mt-24 bg-surface px-6 pb-16 pt-4 lg:px-20">
      <div className="mx-auto flex max-w-[1440px] flex-col items-start gap-6">
        <h2 className="max-w-[760px] font-display text-4xl leading-tight text-ink-700">
          Lock in stays and transport once your locals approve the route
        </h2>
        <div className="w-full rounded-3xl border border-line bg-surface-3 p-6">
          <div className="mb-6 flex flex-wrap gap-3">
            {TABS.map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setMode(tab.id)}
                className={`h-14 w-[120px] rounded-full text-sm font-medium transition-colors ${
                  mode === tab.id ? "bg-brand-blue text-mist-100" : "bg-surface text-ink-600 hover:bg-line-soft"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {mode === "hotels" ? (
            <form onSubmit={handleSearch} className="flex flex-wrap items-end gap-4">
              <FieldShell label="Destination" className="w-full sm:w-[300px]">
                <select
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  className="bg-transparent text-lg font-medium text-ink-700 outline-none"
                >
                  {cities.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </FieldShell>
              <FieldShell label="Check-in" className="w-full sm:w-[200px]">
                <input
                  type="date"
                  value={checkIn}
                  onChange={(e) => setCheckIn(e.target.value)}
                  className="bg-transparent text-lg font-medium text-ink-700 outline-none"
                />
              </FieldShell>
              <FieldShell label="Check-out" className="w-full sm:w-[200px]">
                <input
                  type="date"
                  value={checkOut}
                  onChange={(e) => setCheckOut(e.target.value)}
                  className="bg-transparent text-lg font-medium text-ink-700 outline-none"
                />
              </FieldShell>
              <FieldShell label="Guests" className="w-full sm:w-[180px]">
                <input
                  type="number"
                  min={1}
                  max={12}
                  value={guests}
                  onChange={(e) => setGuests(Number(e.target.value))}
                  className="bg-transparent text-lg font-medium text-ink-700 outline-none"
                />
              </FieldShell>
              <Button variant="orange" size="lg" className="h-14 w-full sm:w-[140px]">
                Search
              </Button>
            </form>
          ) : (
            <div className="flex flex-col items-start gap-3 rounded-2xl border border-dashed border-line-soft px-6 py-8">
              <p className="text-lg font-medium text-ink-700">
                {mode === "flights" ? "Flight search" : "Cab booking"} is coming soon
              </p>
              <p className="max-w-[520px] text-sm text-ink-500">
                {mode === "flights"
                  ? "We're rolling this out alongside our third-party fare integration. For now, book your stay and we'll help with transfers."
                  : "Local and outstation cabs will book right alongside your itinerary. In the meantime, hotel search is live."}
              </p>
            </div>
          )}

          <div className="mt-6 flex flex-wrap gap-3">
            <span className="rounded-full bg-surface px-3.5 py-2.5 text-sm font-medium text-ink-500">
              Flights: from, to, date
            </span>
            <span className="rounded-full bg-surface px-3.5 py-2.5 text-sm font-medium text-ink-500">
              Cabs: local or outstation, time
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
