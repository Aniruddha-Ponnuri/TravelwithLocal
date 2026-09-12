import { Photo } from "@/components/scenes/Photo";
import { Button } from "@/components/ui/Button";
import { localExperienceFeatures } from "@/lib/data";

export function LocalExperiencesSection() {
  return (
    <section id="experiences" className="scroll-mt-24 px-6 py-14 lg:px-20">
      <div className="mx-auto flex max-w-[1440px] flex-col items-start gap-10 lg:flex-row">
        <Photo
          src="/images/experience-visual.jpg"
          alt="Community-led café gathering — hidden spots and local hosts"
          rounded="rounded-[28px]"
          className="h-[360px] w-full shrink-0 sm:h-[440px] lg:h-[496px] lg:w-[520px]"
          sizes="(max-width: 1024px) 90vw, 520px"
        />
        <div className="flex flex-1 flex-col items-start gap-6">
          <h2 className="font-display text-4xl leading-tight text-ink-700 sm:text-5xl">
            See places through local stories
          </h2>
          <p className="max-w-[560px] text-lg leading-[1.6] text-ink-600">
            Join community-led adventures to spots that don&apos;t appear in guidebooks — hidden
            trails, family kitchens, and village walks hosted by people who know every path.
          </p>
          <Button href="/stays" variant="teal" size="lg">
            Explore experiences
          </Button>
          <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2">
            {localExperienceFeatures.map((f) => (
              <div key={f.title} className="flex flex-col gap-1.5 border-l-2 border-brand-blue py-1 pl-4">
                <p className="text-lg font-medium text-ink-700">{f.title}</p>
                <p className="text-sm font-medium text-ink-500">{f.subtitle}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
