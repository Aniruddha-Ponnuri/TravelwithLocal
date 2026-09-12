import type { Metadata } from "next";
import { SiteHeader } from "@/components/layout/SiteHeader";

export const metadata: Metadata = { title: "Support" };

export default function SupportPage() {
  return (
    <>
      <SiteHeader />
      <div className="mx-auto flex max-w-[640px] flex-col items-center gap-4 px-6 py-20 text-center">
        <h1 className="font-display text-3xl text-ink-700">Support</h1>
        <p className="text-ink-500">
          Chat support for travelers and local hosts connects here — for bookings, trip changes and payment
          questions.
        </p>
      </div>
    </>
  );
}
