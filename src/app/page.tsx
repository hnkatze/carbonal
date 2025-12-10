import HeroCarousel from "@/components/hero-carousel"
import AboutUs from "@/components/about-us"
import NewsSection from "@/components/news-section"
import MatchesSection from "@/components/matches-section"
import Sponsors from "@/components/sponsors"
import TeamSection from "@/components/team-section"
import Gallery from "@/components/gallery"
import { getNews, getMatchesByStatus, getPlayers, getStaff, getGalleryImages } from "@/lib"

export default async function Home() {
  // Fetch all data in parallel on the server
  const [news, liveMatches, completedMatches, upcomingMatches, players, staff, galleryImages] = await Promise.all([
    getNews(),
    getMatchesByStatus("live"),
    getMatchesByStatus("completed"),
    getMatchesByStatus("upcoming"),
    getPlayers(),
    getStaff(),
    getGalleryImages(),
  ])

  return (
    <div className="flex flex-col w-full">
      <HeroCarousel />
      <AboutUs />
      <NewsSection initialData={news} />
      <div className="bg-sky-50 py-12">
        <section id="partidos" className="container mx-auto px-4 grid grid-cols-1 lg:grid-cols-3 gap-6">
          <MatchesSection type="live" initialData={liveMatches} title="En Vivo" />
          <MatchesSection type="completed" initialData={completedMatches} title="Resultados" />
          <MatchesSection type="upcoming" initialData={upcomingMatches} title="Próximos Partidos" />
        </section>
      </div>
      <Sponsors />
      <TeamSection initialPlayers={players} initialStaff={staff} />
      <Gallery initialData={galleryImages} />
    </div>
  )
}
