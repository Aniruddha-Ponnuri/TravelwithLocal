"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Pill } from "@/components/ui/Pill";

export function MobileCtaSection() {
  const [notified, setNotified] = useState(false);

  return (
    <section className="px-6 py-14 lg:px-20">
      <div className="mx-auto flex max-w-[1440px] flex-col items-start gap-10 rounded-3xl bg-ink-900 px-6 py-12 sm:px-10 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex max-w-[480px] flex-col items-start gap-4">
          <h2 className="font-display text-4xl leading-tight text-mist-100 sm:text-5xl">
            Carry every local tip, hidden spot and community story with you
          </h2>
          <p className="text-lg leading-[1.6] text-mist-200">
            From community recommendations to bookings and day-by-day plans — all shaped by people
            who know the place.
          </p>
          {notified ? (
            <Pill tone="white">You&apos;re on the list — we&apos;ll email you at launch</Pill>
          ) : (
            <Button variant="white" size="lg" onClick={() => setNotified(true)}>
              Get the app
            </Button>
          )}
        </div>
        <div className="flex h-[200px] w-[200px] shrink-0 -rotate-3 flex-col justify-between border-2 border-dashed border-mist-300/50 bg-brand-orange p-5 text-ink-900">
          <p className="font-display text-sm">Postmarked</p>
          <div>
            <p className="font-display text-3xl leading-none">Goa</p>
            <p className="font-[family-name:var(--font-mono-ticket)] text-xs">3 DAYS · LOCAL-FIRST</p>
          </div>
        </div>
      </div>
    </section>
  );
}
