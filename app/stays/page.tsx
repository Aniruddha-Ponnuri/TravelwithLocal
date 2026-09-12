import type { Metadata } from "next";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { StaysExplorer } from "@/components/stays/StaysExplorer";
import { cities } from "@/lib/data";

export const metadata: Metadata = {
  title: "Search Stays",
  description: "Search and filter stays by price, property type, rating and amenities, sorted by distance.",
};

function isCity(value: string): value is (typeof cities)[number] {
  return (cities as readonly string[]).includes(value);
}

export default async function StaysPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const sp = await searchParams;
  const cityParam = typeof sp.city === "string" ? sp.city : cities[0];
  const city = isCity(cityParam) ? cityParam : cities[0];
  const checkIn = typeof sp.checkIn === "string" ? sp.checkIn : "2026-06-21";
  const checkOut = typeof sp.checkOut === "string" ? sp.checkOut : "2026-06-24";

  return (
    <>
      <SiteHeader />
      <div className="px-6 pt-10 lg:px-20">
        <div className="mx-auto flex max-w-[1440px] flex-col gap-2">
          <h1 className="font-display text-4xl leading-tight text-ink-700">
            Find your stay, filtered your way
          </h1>
        </div>
      </div>
      <StaysExplorer initialCity={city} initialCheckIn={checkIn} initialCheckOut={checkOut} />
    </>
  );
}
