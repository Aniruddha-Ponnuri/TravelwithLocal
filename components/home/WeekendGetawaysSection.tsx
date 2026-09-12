import { Photo } from "@/components/scenes/Photo";
import { CardLink } from "@/components/home/CardLink";
import { FavoriteButton } from "@/components/home/FavoriteButton";
import { weekendGetaways, isBookable, favoriteKey } from "@/lib/data";

const CARD_CLASS =
  "flex h-[320px] w-[232px] shrink-0 flex-col gap-4 rounded-2xl border border-line p-4 transition-transform hover:-translate-y-1";

export function WeekendGetawaysSection({ favoritedKeys }: { favoritedKeys: Set<string> }) {
  return (
    <section id="getaways" className="scroll-mt-24 px-6 py-14 lg:px-20">
      <div className="mx-auto flex max-w-[1440px] flex-col items-start gap-6">
        <h2 className="font-display text-4xl leading-tight text-ink-700">
          Under-the-radar getaways chosen by locals
        </h2>
        <div className="flex w-full gap-4 overflow-x-auto pb-2">
          {weekendGetaways.map((g) => (
            <div key={g.slug} className="relative shrink-0">
              <FavoriteButton
                type="getaway"
                slug={g.slug}
                name={g.name}
                favorited={favoritedKeys.has(favoriteKey("getaway", g.slug))}
                next="/"
              />
              <CardLink
                href={`/stays?city=${encodeURIComponent(g.name)}`}
                bookable={isBookable(g.name)}
                className={CARD_CLASS}
              >
                <Photo
                  src={`/images/getaways/${g.slug}.jpg`}
                  alt={`${g.name} getaway`}
                  className="h-[186px] w-[200px]"
                  sizes="200px"
                />
                <p className="font-display text-2xl text-ink-700">{g.name}</p>
                <p className="text-sm font-medium text-ink-500">{g.duration}</p>
              </CardLink>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
