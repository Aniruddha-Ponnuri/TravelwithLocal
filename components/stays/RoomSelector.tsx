"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Scene } from "@/components/scenes/Scene";
import { Button } from "@/components/ui/Button";
import { Pill } from "@/components/ui/Pill";
import type { Room } from "@/lib/data";

export function RoomSelector({ stayId, rooms }: { stayId: string; rooms: Room[] }) {
  const router = useRouter();
  const [quantities, setQuantities] = useState<Record<string, number>>({});

  const total = useMemo(
    () => rooms.reduce((sum, r) => sum + (quantities[r.id] ?? 0) * r.price, 0),
    [quantities, rooms]
  );
  const roomCount = Object.values(quantities).reduce((a, b) => a + b, 0);

  function setQty(id: string, qty: number) {
    setQuantities((prev) => ({ ...prev, [id]: Math.max(0, qty) }));
  }

  function handleCheckout() {
    const params = new URLSearchParams({ total: String(total), rooms: String(roomCount) });
    router.push(`/stays/${stayId}/checkout?${params.toString()}`);
  }

  return (
    <div className="flex flex-col gap-5">
      {rooms.map((room) => (
        <div
          key={room.id}
          className="flex flex-col gap-4 rounded-2xl border border-line bg-mist-100 p-5 sm:flex-row"
        >
          <Scene palette={room.palette} className="h-[160px] w-full shrink-0 sm:h-auto sm:w-[200px]" />
          <div className="flex flex-1 flex-col gap-2">
            <p className="text-lg font-medium text-ink-700">{room.category}</p>
            <p className="text-sm font-medium text-ink-500">
              {room.sizeSqm} m², {room.view}, up to {room.maxPersons} guests
            </p>
            <div className="flex flex-wrap gap-2">
              {room.facilities.map((f) => (
                <Pill key={f} tone="light" size="sm">
                  {f}
                </Pill>
              ))}
            </div>
            <div className="mt-auto flex flex-wrap items-end justify-between gap-3 pt-2">
              <div>
                <p className="font-display text-2xl text-ink-700">₹{room.price.toLocaleString("en-IN")}</p>
                <p className="text-xs font-medium text-ink-500">per night</p>
              </div>
              <div className="flex items-center gap-3 rounded-full border border-line-soft px-2 py-1.5">
                <button
                  type="button"
                  onClick={() => setQty(room.id, (quantities[room.id] ?? 0) - 1)}
                  className="flex h-7 w-7 items-center justify-center rounded-full bg-surface-2 text-ink-700"
                  aria-label={`Decrease ${room.category} count`}
                >
                  −
                </button>
                <span className="w-4 text-center text-sm font-semibold text-ink-700">{quantities[room.id] ?? 0}</span>
                <button
                  type="button"
                  onClick={() => setQty(room.id, (quantities[room.id] ?? 0) + 1)}
                  className="flex h-7 w-7 items-center justify-center rounded-full bg-brand-blue text-mist-100"
                  aria-label={`Increase ${room.category} count`}
                >
                  +
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}

      <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl bg-ink-900 p-5">
        <div>
          <p className="text-sm font-medium text-mist-300">
            {roomCount > 0 ? `${roomCount} room${roomCount > 1 ? "s" : ""} selected` : "Select one or more rooms"}
          </p>
          <p className="font-display text-2xl text-mist-100">₹{total.toLocaleString("en-IN")} / night</p>
        </div>
        <Button variant="white" size="lg" onClick={handleCheckout} disabled={roomCount === 0} className="disabled:opacity-40">
          Continue to checkout
        </Button>
      </div>
    </div>
  );
}
