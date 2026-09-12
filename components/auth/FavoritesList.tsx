import Link from "next/link";
import { Photo } from "@/components/scenes/Photo";
import { FavoriteButton } from "@/components/home/FavoriteButton";
import { listFavorites } from "@/lib/supabase/favorites";
import { isBookable, locationImageFolder } from "@/lib/data";

const FAVORITES_TAB_PATH = "/account?tab=favorites";

export async function FavoritesList() {
  const favorites = await listFavorites();

  if (favorites.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-line-soft p-10 text-center">
        <p className="text-lg font-medium text-ink-700">No favorites yet</p>
        <p className="mt-2 text-sm text-ink-500">Tap the heart on any destination or getaway to save it here.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      {favorites.map((fav) => (
        <div key={`${fav.type}:${fav.slug}`} className="relative">
          <FavoriteButton type={fav.type} slug={fav.slug} name={fav.name} favorited next={FAVORITES_TAB_PATH} />
          <Link
            href={`/stays?city=${encodeURIComponent(fav.name)}`}
            className="flex gap-4 rounded-2xl border border-line p-3 transition-colors hover:bg-surface-2"
          >
            <Photo
              src={`/images/${locationImageFolder(fav.type)}/${fav.slug}.jpg`}
              alt={fav.name}
              className="h-20 w-20 shrink-0"
              sizes="80px"
            />
            <div>
              <p className="font-display text-lg text-ink-700">{fav.name}</p>
              <p className="text-sm text-ink-500">
                {fav.type === "destination" ? "Destination" : "Weekend getaway"}
                {!isBookable(fav.name) ? " — international" : ""}
              </p>
            </div>
          </Link>
        </div>
      ))}
    </div>
  );
}
