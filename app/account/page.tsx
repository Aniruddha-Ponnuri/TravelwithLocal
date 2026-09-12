import type { Metadata } from "next";
import Image from "next/image";
import { redirect } from "next/navigation";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { ProfileForm } from "@/components/auth/ProfileForm";
import { SignOutButton } from "@/components/auth/SignOutButton";
import { createClient } from "@/lib/supabase/server";

export const metadata: Metadata = { title: "Your profile" };

export default async function AccountPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login?next=/account");
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("full_name, avatar_url")
    .eq("id", user.id)
    .single();

  const fullName = profile?.full_name ?? "";
  const memberSince = new Date(user.created_at).toLocaleDateString("en-IN", {
    month: "long",
    year: "numeric",
  });
  const initial = (fullName || user.email || "?").charAt(0).toUpperCase();

  return (
    <>
      <SiteHeader />
      <div className="mx-auto flex max-w-[760px] flex-col gap-8 px-6 py-12">
        <div className="flex items-center gap-4">
          {profile?.avatar_url ? (
            <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-full">
              <Image src={profile.avatar_url} alt="" fill sizes="64px" className="object-cover" />
            </div>
          ) : (
            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-brand-blue font-display text-2xl text-mist-100">
              {initial}
            </div>
          )}
          <div>
            <h1 className="font-display text-2xl text-ink-700">{fullName || "Your profile"}</h1>
            <p className="text-sm text-ink-500">Traveler since {memberSince}</p>
          </div>
        </div>

        <section className="flex flex-col gap-5 rounded-2xl border border-line p-6">
          <div>
            <h2 className="text-lg font-medium text-ink-700">Profile</h2>
            <p className="text-sm text-ink-500">This is how local hosts and other travelers will see you.</p>
          </div>
          <ProfileForm fullName={fullName} />
        </section>

        <section className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-line p-6">
          <div>
            <h2 className="text-lg font-medium text-ink-700">Account</h2>
            <p className="text-sm text-ink-500">{user.email}</p>
          </div>
          <SignOutButton />
        </section>
      </div>
    </>
  );
}
