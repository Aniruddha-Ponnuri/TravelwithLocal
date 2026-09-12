import { toggleFavorite } from "@/lib/actions/favorites";
import { HeartIcon } from "@/components/home/HeartIcon";
import type { FavoriteLocation } from "@/lib/supabase/favorites";

/** A heart toggle for saving a destination/getaway. Signed-out travelers are sent to sign in first. */
export function FavoriteButton({
  type,
  slug,
  name,
  favorited,
  next,
}: FavoriteLocation & { favorited: boolean; next: string }) {
  return (
    <form action={toggleFavorite} className="absolute right-3 top-3 z-10">
      <input type="hidden" name="locationType" value={type} />
      <input type="hidden" name="locationSlug" value={slug} />
      <input type="hidden" name="locationName" value={name} />
      <input type="hidden" name="next" value={next} />
      <button
        type="submit"
        aria-label={favorited ? `Remove ${name} from favorites` : `Save ${name} to favorites`}
        aria-pressed={favorited}
        className={`flex h-8 w-8 items-center justify-center rounded-full shadow-sm backdrop-blur-sm transition-colors ${
          favorited ? "bg-brand-blue text-mist-100" : "bg-mist-100/90 text-ink-700 hover:bg-mist-100"
        }`}
      >
        <HeartIcon filled={favorited} className="h-4 w-4" />
      </button>
    </form>
  );
}
