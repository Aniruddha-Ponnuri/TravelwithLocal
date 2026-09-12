import Link from "next/link";
import { memo } from "react";
import { Scene } from "@/components/scenes/Scene";
import { Pill } from "@/components/ui/Pill";
import type { Stay } from "@/lib/data";

function StayCardImpl({ stay }: { stay: Stay }) {
  return (
    <Link
      href={`/stays/${stay.id}`}
      className="flex flex-col gap-4 rounded-2xl border border-line bg-mist-100 p-4 transition-transform hover:-translate-y-1 sm:flex-row sm:gap-5"
    >
      <Scene palette={stay.palette} className="h-[180px] w-full shrink-0 sm:h-auto sm:w-[220px]" />
      <div className="flex flex-1 flex-col gap-2">
        <div className="flex flex-wrap items-start justify-between gap-2">
          <div>
            <p className="text-lg font-medium text-ink-700">{stay.name}</p>
            <p className="text-sm font-medium text-ink-500">
              {stay.location}, {stay.city} — {stay.distanceKm.toFixed(1)} km away
            </p>
          </div>
          <div className="flex flex-col items-end gap-0.5">
            <Pill tone="blue" size="sm" className="font-semibold">
              {stay.userRating.toFixed(1)} ★
            </Pill>
            <span className="text-xs font-medium text-ink-500">
              {"★".repeat(stay.propertyRating)} {stay.propertyType}
            </span>
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          {stay.amenities.slice(0, 4).map((a) => (
            <Pill key={a} tone="light" size="sm">
              {a}
            </Pill>
          ))}
        </div>
        <div className="mt-auto flex items-end justify-between pt-2">
          <div>
            <p className="text-xs font-medium text-ink-500">Starts at</p>
            <p className="font-display text-2xl text-ink-700">₹{stay.startingPrice.toLocaleString("en-IN")}</p>
            <p className="text-xs font-medium text-ink-500">per night</p>
          </div>
          <span className="rounded-full bg-surface-3 px-4 py-2 text-sm font-medium text-brand-blue">
            See rooms
          </span>
        </div>
      </div>
    </Link>
  );
}

export const StayCard = memo(StayCardImpl);
