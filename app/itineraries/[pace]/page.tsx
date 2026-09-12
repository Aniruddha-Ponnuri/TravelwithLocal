import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { ItineraryHero } from "@/components/itinerary/ItineraryHero";
import { PaceSelector } from "@/components/itinerary/PaceSelector";
import { DetailSection } from "@/components/itinerary/DetailSection";
import { itineraries, itineraryOrder, type ItineraryPace } from "@/lib/data";

export function generateStaticParams() {
  return itineraryOrder.map((pace) => ({ pace }));
}

function isPace(value: string): value is ItineraryPace {
  return (itineraryOrder as string[]).includes(value);
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ pace: string }>;
}): Promise<Metadata> {
  const { pace } = await params;
  if (!isPace(pace)) return {};
  const itinerary = itineraries[pace];
  return {
    title: itinerary.title,
    description: itinerary.summary,
  };
}

export default async function ItineraryPage({ params }: { params: Promise<{ pace: string }> }) {
  const { pace } = await params;
  if (!isPace(pace)) notFound();
  const itinerary = itineraries[pace];

  return (
    <>
      <SiteHeader />
      <ItineraryHero itinerary={itinerary} />
      <PaceSelector current={pace} />
      <DetailSection itinerary={itinerary} />
    </>
  );
}
