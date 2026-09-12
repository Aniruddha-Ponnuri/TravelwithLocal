import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { Scene } from "@/components/scenes/Scene";
import { Pill } from "@/components/ui/Pill";
import { RoomSelector } from "@/components/stays/RoomSelector";
import { getStayById, stays } from "@/lib/data";

export function generateStaticParams() {
  return stays.map((s) => ({ id: s.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const stay = getStayById(id);
  if (!stay) return {};
  return { title: stay.name, description: stay.about };
}

export default async function StayDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const stay = getStayById(id);
  if (!stay) notFound();

  return (
    <>
      <SiteHeader />
      <div className="mx-auto flex max-w-[1440px] flex-col gap-8 px-6 py-8 lg:px-20">
        <div className="flex flex-col gap-4">
          <Link href="/stays" className="text-sm font-medium text-brand-blue">
            ← Back to search
          </Link>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-4">
            <Scene palette={stay.palette} className="col-span-1 h-[220px] sm:col-span-2 sm:row-span-2 sm:h-[360px]" rounded="rounded-2xl" />
            <Scene palette={stay.palette} className="h-[110px] sm:h-[176px]" rounded="rounded-2xl" />
            <Scene palette={stay.palette} className="h-[110px] sm:h-[176px]" rounded="rounded-2xl" />
            <Scene palette={stay.palette} className="h-[110px] sm:h-[176px]" rounded="rounded-2xl" />
            <Scene palette={stay.palette} className="h-[110px] sm:h-[176px]" rounded="rounded-2xl" label={`${stay.rooms.length} room types`} />
          </div>
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <h1 className="font-display text-4xl leading-tight text-ink-700">{stay.name}</h1>
              <p className="mt-1 text-sm font-medium text-ink-500">
                {stay.location}, {stay.city} — {stay.distanceKm.toFixed(1)} km from city centre
              </p>
            </div>
            <div className="flex items-center gap-2">
              <span className="rounded-full bg-brand-blue px-3 py-1.5 text-sm font-semibold text-mist-100">
                {stay.userRating.toFixed(1)} ★ user rating
              </span>
              <span className="rounded-full bg-surface-2 px-3 py-1.5 text-sm font-medium text-ink-600">
                {"★".repeat(stay.propertyRating)} {stay.propertyType}
              </span>
            </div>
          </div>
          <p className="max-w-[760px] text-lg leading-[1.6] text-ink-600">{stay.about}</p>
        </div>

        <div className="flex flex-col gap-8 lg:flex-row">
          <div className="flex flex-1 flex-col gap-8">
            <section>
              <h2 className="mb-4 font-display text-2xl text-ink-700">Available room categories</h2>
              <RoomSelector stayId={stay.id} rooms={stay.rooms} />
            </section>

            <section>
              <h2 className="mb-4 font-display text-2xl text-ink-700">Amenities</h2>
              <div className="flex flex-wrap gap-2">
                {stay.amenities.map((a) => (
                  <Pill key={a} tone="light">
                    {a}
                  </Pill>
                ))}
              </div>
            </section>

            {stay.restaurants.length > 0 ? (
              <section>
                <h2 className="mb-4 font-display text-2xl text-ink-700">Restaurants</h2>
                <div className="flex flex-col gap-3">
                  {stay.restaurants.map((r) => (
                    <div key={r.name} className="rounded-xl border border-line p-4">
                      <p className="font-medium text-ink-700">{r.name}</p>
                      <p className="text-sm text-ink-500">{r.cuisine}</p>
                    </div>
                  ))}
                </div>
              </section>
            ) : null}

            <section>
              <h2 className="mb-4 font-display text-2xl text-ink-700">User reviews</h2>
              <div className="flex flex-col gap-3">
                {stay.reviews.map((review) => (
                  <div key={review.author} className="rounded-xl border border-line p-4">
                    <div className="mb-1 flex items-center justify-between">
                      <p className="font-medium text-ink-700">{review.author}</p>
                      <span className="text-sm font-semibold text-brand-blue">{review.rating.toFixed(1)} ★</span>
                    </div>
                    <p className="text-sm text-ink-600">{review.comment}</p>
                  </div>
                ))}
              </div>
            </section>
          </div>

          <aside className="flex w-full flex-col gap-6 lg:w-[340px] lg:shrink-0">
            <div className="rounded-2xl border border-line p-5">
              <h3 className="mb-3 font-medium text-ink-700">Property rules</h3>
              <ul className="flex flex-col gap-2 text-sm text-ink-600">
                {stay.rules.map((rule) => (
                  <li key={rule}>— {rule}</li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl border border-line p-5">
              <h3 className="mb-2 font-medium text-ink-700">Cancellation policy</h3>
              <p className="text-sm text-ink-600">{stay.cancellation}</p>
            </div>
            <Link
              href="/stays"
              className="rounded-full border border-line-soft px-5 py-3 text-center text-sm font-medium text-ink-700 hover:bg-surface-2"
            >
              Back to search results
            </Link>
          </aside>
        </div>
      </div>
    </>
  );
}
