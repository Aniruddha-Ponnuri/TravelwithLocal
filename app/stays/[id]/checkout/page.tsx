import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { getStayById } from "@/lib/data";

export const metadata: Metadata = { title: "Booking Summary" };

export default async function CheckoutPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const { id } = await params;
  const stay = getStayById(id);
  if (!stay) notFound();

  const sp = await searchParams;
  const total = Number(sp.total ?? 0);
  const roomCount = Number(sp.rooms ?? 0);

  return (
    <>
      <SiteHeader />
      <div className="mx-auto flex max-w-[640px] flex-col items-center gap-6 px-6 py-16 text-center">
        <span className="flex h-16 w-16 items-center justify-center rounded-full bg-surface-3 text-3xl">🧳</span>
        <h1 className="font-display text-3xl text-ink-700">Your stay is ready to confirm</h1>
        <p className="text-ink-500">
          {stay.name} — {roomCount} room{roomCount === 1 ? "" : "s"} — ₹{total.toLocaleString("en-IN")} per night
        </p>
        <p className="max-w-[440px] text-sm text-ink-500">
          Payment and final confirmation happen through the booking service once it&apos;s connected — this preview
          screen shows the order summary a traveler would confirm next.
        </p>
        <div className="flex gap-3">
          <Link href={`/stays/${stay.id}`} className="rounded-full border border-line-soft px-5 py-3 text-sm font-medium text-ink-700">
            Back to stay
          </Link>
          <Link href="/stays" className="rounded-full bg-brand-blue px-5 py-3 text-sm font-medium text-mist-100">
            Continue browsing
          </Link>
        </div>
      </div>
    </>
  );
}
