import Link from "next/link";
import { Photo } from "@/components/scenes/Photo";
import { communityStories } from "@/lib/data";

export function CommunityStoriesSection() {
  return (
    <section id="community" className="scroll-mt-24 px-6 pb-14 pt-8 lg:px-20">
      <div className="mx-auto flex max-w-[1440px] flex-col items-start gap-6">
        <h2 className="font-display text-4xl leading-tight text-ink-700">
          Stories from travelers who went off the map
        </h2>
        <div className="flex w-full gap-4 overflow-x-auto pb-2">
          {communityStories.map((s) => (
            <Link
              key={s.slug}
              href={`/stories/${s.slug}`}
              className="flex h-[296px] w-[292px] shrink-0 flex-col gap-3.5 rounded-2xl border border-line p-4 transition-transform hover:-translate-y-1"
            >
              <Photo src={`/images/stories/${s.slug}.jpg`} alt={s.title} className="h-[148px] w-[260px]" sizes="260px" />
              <p className="font-display text-lg text-ink-700">{s.title}</p>
              <p className="text-sm font-medium text-ink-500">
                {s.traveler} — {s.readTime}
              </p>
              <span className="text-sm font-medium text-brand-blue">Read story</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
