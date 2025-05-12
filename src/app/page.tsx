import HeroCarousel from "@/components/hero-carousel"
import AboutUs from "@/components/about-us"
import NewsSection from "@/components/news-section"
import LiveMatches from "@/components/live-matches"
import CompletedMatches from "@/components/completed-matches"
import UpcomingMatches from "@/components/upcoming-matches"
import Sponsors from "@/components/sponsors"
import TeamSection from "@/components/team-section"
import Gallery from "@/components/gallery"

export default function Home() {
  return (
    <div className="flex flex-col w-full">
      <HeroCarousel />
      <AboutUs />
      <NewsSection />
      <div className="bg-sky-50 py-12">
        <section id="partidos" className="container mx-auto px-4">
          <LiveMatches  />
        </section>
        <CompletedMatches />
        <UpcomingMatches />
      </div>
      <Sponsors />
      <TeamSection />
      <Gallery />
    </div>
  )
}
