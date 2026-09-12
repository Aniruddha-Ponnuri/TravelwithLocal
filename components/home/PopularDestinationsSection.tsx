import { Photo } from "@/components/scenes/Photo";
import { CardLink } from "@/components/home/CardLink";
import { FavoriteButton } from "@/components/home/FavoriteButton";
import { popularDestinations, isBookable, favoriteKey } from "@/lib/data";

const CARD_CLASS =
  "flex h-[284px] flex-col gap-4 rounded-2xl border border-line p-4 transition-transform hover:-translate-y-1";

export function PopularDestinationsSection({ favoritedKeys }: { favoritedKeys: Set<string> }) {
  return (
    <section id="destinations" className="scroll-mt-24 px-6 py-14 lg:px-20">
      <div className="mx-auto flex max-w-[1440px] flex-col items-start gap-6">
        <h2 className="font-display text-4xl leading-tight text-ink-700">
          Places our locals keep sending travelers to
        </h2>
        <div className="grid w-full grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {popularDestinations.map((d) => {
            const bookable = isBookable(d.name);
            return (
              <div key={d.slug} className="relative">
                <FavoriteButton
                  type="destination"
                  slug={d.slug}
                  name={d.name}
                  favorited={favoritedKeys.has(favoriteKey("destination", d.slug))}
                  next="/"
                />
                <CardLink href={`/stays?city=${encodeURIComponent(d.name)}`} bookable={bookable} className={CARD_CLASS}>
                  <Photo
                    src={`/images/destinations/${d.slug}.jpg`}
                    alt={d.name}
                    className="h-[168px] w-full"
                    sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 380px"
                  />
                  <p className="font-display text-lg text-ink-700">{d.name}</p>
                  <p className="text-sm font-medium text-ink-500">
                    From {d.fromPrice}, {d.days} days{!bookable ? " — international" : ""}
                  </p>
                </CardLink>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
