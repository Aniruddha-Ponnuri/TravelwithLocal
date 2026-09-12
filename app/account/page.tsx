import type { Metadata } from "next";
import { SiteHeader } from "@/components/layout/SiteHeader";

export const metadata: Metadata = { title: "Account" };

export default function AccountPage() {
  return (
    <>
      <SiteHeader />
      <div className="mx-auto flex max-w-[640px] flex-col items-center gap-4 px-6 py-20 text-center">
        <h1 className="font-display text-3xl text-ink-700">Profile &amp; account</h1>
        <p className="text-ink-500">
          Sign-in, saved trips and traveler preferences live here once the authentication service is connected.
        </p>
      </div>
    </>
  );
}
