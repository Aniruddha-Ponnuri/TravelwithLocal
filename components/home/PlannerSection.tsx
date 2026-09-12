"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { FieldShell } from "@/components/ui/Field";

const DESTINATIONS = ["Goa or Coorg?", "Ooty or Munnar?", "Kerala backwaters?", "Pondicherry?"];
const VIBES = ["Off-beaten + food", "Adventure + trails", "Slow + local culture", "Remote work friendly"];
const DURATIONS = ["3 to 5 days", "5 to 7 days", "1 to 2 weeks"];
const STYLES = ["Local-first", "Comfort + local", "Premium + local"];

function SelectField({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: string;
  options: string[];
  onChange: (v: string) => void;
}) {
  return (
    <FieldShell label={label} className="w-full sm:w-[220px]">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full appearance-none bg-transparent text-lg font-medium text-ink-700 outline-none"
      >
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
    </FieldShell>
  );
}

export function PlannerSection() {
  const [destination, setDestination] = useState(DESTINATIONS[0]);
  const [vibe, setVibe] = useState(VIBES[0]);
  const [duration, setDuration] = useState(DURATIONS[0]);
  const [style, setStyle] = useState(STYLES[0]);
  const [result, setResult] = useState<{ destination: string; vibe: string } | null>(null);

  return (
    <section id="plan" className="scroll-mt-24 bg-surface px-6 py-16 lg:px-20">
      <div className="mx-auto flex max-w-[1040px] flex-col items-start gap-6">
        <h2 className="font-display text-4xl leading-tight text-ink-700 sm:text-5xl">
          Plan with people who have actually been there
        </h2>
        <p className="max-w-[620px] text-lg leading-[1.6] text-ink-600">
          Connect with local hosts, get honest picks on hidden spots, and turn community knowledge
          into a trip you can&apos;t find on any booking site.
        </p>
        <div className="w-full rounded-3xl border border-line bg-surface-3 p-6 sm:p-8">
          <h3 className="mb-6 font-display text-2xl text-ink-700">
            What hidden place should the community help you find?
          </h3>
          <div className="flex flex-wrap gap-4">
            <SelectField label="Destination" value={destination} options={DESTINATIONS} onChange={setDestination} />
            <SelectField label="Vibe" value={vibe} options={VIBES} onChange={setVibe} />
            <SelectField label="Duration" value={duration} options={DURATIONS} onChange={setDuration} />
            <SelectField label="Travel style" value={style} options={STYLES} onChange={setStyle} />
          </div>
          <div className="mt-6 flex flex-col items-stretch gap-4 sm:flex-row sm:items-center">
            <Button
              variant="primary"
              size="lg"
              className="w-full sm:w-[200px]"
              onClick={() => setResult({ destination, vibe })}
            >
              Find hidden spots
            </Button>
            <div className="flex flex-1 items-center justify-between gap-4 rounded-2xl border border-line-blue bg-surface px-[18px] py-4">
              <div>
                <p className="text-lg font-medium text-ink-800">
                  {result ? `${result.destination.replace(/[?]/g, "")} picks` : "North Goa local picks"}
                </p>
                <p className="text-sm font-medium text-ink-500">
                  {result
                    ? `Matched on “${result.vibe}” — 14 community tips`
                    : "14 community tips, 6 local hosts"}
                </p>
              </div>
              <Button href="/stories/finding-hidden-goa-trails" variant="primary" size="md" className="shrink-0">
                See picks
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
