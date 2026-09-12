import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { Photo } from "@/components/scenes/Photo";
import { communityStories } from "@/lib/data";

export function generateStaticParams() {
  return communityStories.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const story = communityStories.find((s) => s.slug === slug);
  if (!story) return {};
  return { title: story.title, description: story.body[0] };
}

export default async function StoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const story = communityStories.find((s) => s.slug === slug);
  if (!story) notFound();

  return (
    <>
      <SiteHeader />
      <article className="mx-auto max-w-[760px] px-6 py-12 lg:px-0">
        <Link href="/#community" className="text-sm font-medium text-brand-blue">
          ← Back to community stories
        </Link>
        <Photo
          src={`/images/stories/${story.slug}.jpg`}
          alt={story.title}
          className="mt-6 h-[280px] w-full"
          rounded="rounded-[28px]"
          sizes="(max-width: 760px) 100vw, 760px"
        />
        <h1 className="mt-6 font-display text-4xl leading-tight text-ink-700">{story.title}</h1>
        <p className="mt-2 text-sm font-medium text-ink-500">
          {story.traveler} — {story.readTime}
        </p>
        <div className="mt-6 flex flex-col gap-5">
          {story.body.map((para, i) => (
            <p key={i} className="text-lg leading-[1.6] text-ink-600">
              {para}
            </p>
          ))}
        </div>
      </article>
    </>
  );
}
