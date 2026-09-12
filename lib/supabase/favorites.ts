import { createClient, getCurrentUser } from "@/lib/supabase/server";
import { favoriteKey, type LocationType } from "@/lib/data";

export interface FavoriteLocation {
  type: LocationType;
  slug: string;
  name: string;
}

/** The signed-in user's saved locations, or an empty list when signed out. */
export async function listFavorites(): Promise<FavoriteLocation[]> {
  const user = await getCurrentUser();
  if (!user) return [];

  const supabase = await createClient();
  const { data } = await supabase
    .from("favorites")
    .select("location_type, location_slug, location_name")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  return (data ?? []).map((row) => ({
    type: row.location_type as LocationType,
    slug: row.location_slug,
    name: row.location_name,
  }));
}

/** Which of the signed-in user's favorites exist, as `"type:slug"` keys for O(1) lookup. */
export async function getFavoritedKeys(): Promise<Set<string>> {
  const favorites = await listFavorites();
  return new Set(favorites.map((f) => favoriteKey(f.type, f.slug)));
}
