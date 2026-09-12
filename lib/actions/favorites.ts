"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient, getCurrentUser } from "@/lib/supabase/server";
import type { LocationType } from "@/lib/data";

const LOCATION_TYPES: readonly LocationType[] = ["destination", "getaway"];

/**
 * Adds or removes a favorite. Decides which by checking for an existing
 * row itself — deleting one if present, inserting one if not — rather
 * than trusting a client-supplied "currently favorited" flag, which can
 * go stale (a second tab, a slow network, a repeat click).
 */
export async function toggleFavorite(formData: FormData) {
  const locationType = formData.get("locationType");
  const locationSlug = String(formData.get("locationSlug") ?? "");
  const locationName = String(formData.get("locationName") ?? "");
  // Where to land the traveler back on after toggling, so the button works
  // the same from the homepage grids as from the favorites tab.
  const next = String(formData.get("next") ?? "/");

  if (typeof locationType !== "string" || !LOCATION_TYPES.includes(locationType as LocationType) || !locationSlug) {
    return;
  }

  const user = await getCurrentUser();
  if (!user) {
    redirect(`/login?next=${encodeURIComponent(next)}`);
  }

  const supabase = await createClient();
  const { data: deleted } = await supabase
    .from("favorites")
    .delete()
    .eq("user_id", user.id)
    .eq("location_type", locationType)
    .eq("location_slug", locationSlug)
    .select("id");

  if (!deleted || deleted.length === 0) {
    await supabase.from("favorites").insert({
      user_id: user.id,
      location_type: locationType,
      location_slug: locationSlug,
      location_name: locationName,
    });
  }

  revalidatePath(next);
  if (!next.startsWith("/account")) revalidatePath("/account");
}
