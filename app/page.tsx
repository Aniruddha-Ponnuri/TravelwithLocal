import { HeroSection } from "@/components/home/HeroSection";
import { PlannerSection } from "@/components/home/PlannerSection";
import { SearchSection } from "@/components/home/SearchSection";
import { WeekendGetawaysSection } from "@/components/home/WeekendGetawaysSection";
import { LocalExperiencesSection } from "@/components/home/LocalExperiencesSection";
import { PopularDestinationsSection } from "@/components/home/PopularDestinationsSection";
import { CommunityItinerariesSection } from "@/components/home/CommunityItinerariesSection";
import { CommunityStoriesSection } from "@/components/home/CommunityStoriesSection";
import { MobileCtaSection } from "@/components/home/MobileCtaSection";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <PlannerSection />
      <SearchSection />
      <WeekendGetawaysSection />
      <LocalExperiencesSection />
      <PopularDestinationsSection />
      <CommunityItinerariesSection />
      <CommunityStoriesSection />
      <MobileCtaSection />
    </>
  );
}
