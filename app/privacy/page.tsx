import type { Metadata } from "next";
import { SiteHeader } from "@/components/layout/SiteHeader";

export const metadata: Metadata = { title: "Privacy" };

export default function PrivacyPage() {
  return (
    <>
      <SiteHeader />
      <div className="mx-auto flex max-w-[720px] flex-col gap-4 px-6 py-20">
        <h1 className="font-display text-3xl text-ink-700">Privacy</h1>
        <p className="text-ink-600">
          TravelWithLocals is designed for GDPR-aligned data handling: personal data is encrypted in transit and at
          rest, and only used to power bookings, recommendations and safety alerts described in this product.
        </p>
        <p className="text-ink-600">
          Full policy details will live on this page once the legal and compliance team finalizes them.
        </p>
      </div>
    </>
  );
}
