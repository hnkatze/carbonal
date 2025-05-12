"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { ChevronLeft, ChevronRight, Loader2 } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { News } from "../../types"
import { getNews } from "@/lib"


export default function NewsSection() {
  const [newsItems, setNewsItems] = useState<News[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [selectedNews, setSelectedNews] = useState<News | null>(null)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const news = await getNews()
        setNewsItems(news)
      } catch (error) {
        console.error("Error al cargar noticias:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchNews()
  }, [])

  const nextImage = () => {
    if (selectedNews && selectedNews.images && selectedNews.images.length > 0) {
      setCurrentImageIndex((prev) => (prev === selectedNews.images.length - 1 ? 0 : prev + 1))
    }
  }

  const prevImage = () => {
    if (selectedNews && selectedNews.images && selectedNews.images.length > 0) {
      setCurrentImageIndex((prev) => (prev === 0 ? selectedNews.images.length - 1 : prev - 1))
    }
  }

  if (isLoading) {
    return (
      <section id="noticias" className="py-16 px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-sky-800">Últimas Noticias</h2>
          <div className="flex justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-sky-600" />
          </div>
        </div>
      </section>
    )
  }

  if (newsItems.length === 0) {
    return (
      <section id="noticias" className="py-16 px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-sky-800">Últimas Noticias</h2>
          <p className="text-center text-gray-500">No hay noticias disponibles en este momento.</p>
        </div>
      </section>
    )
  }

  return (
    <section id="noticias" className="py-16 px-4">
      <div className="container mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-3xl font-bold text-center mb-12 text-sky-800"
        >
          Últimas Noticias
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {newsItems.map((news, index) => (
            <motion.div
              key={news.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white rounded-lg shadow-lg overflow-hidden"
            >
              <div className="relative h-48">
                <Image
                  src={news.images && news.images.length > 0 ? news.images[0] : "/placeholder.svg"}
                  alt={news.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <span className="text-sm text-sky-600">{news.date}</span>
                <h3 className="text-xl font-bold mt-2 mb-3">{news.title}</h3>
                <p className="text-gray-600 mb-4 line-clamp-2">{news.description}</p>
                <button
                  onClick={() => {
                    setSelectedNews(news)
                    setCurrentImageIndex(0)
                  }}
                  className="text-sky-600 font-medium hover:text-sky-800 transition-colors"
                >
                  Ver más
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Modal para ver noticia completa */}
      <Dialog open={!!selectedNews} onOpenChange={(open) => !open && setSelectedNews(null)}>
        <DialogContent className="sm:max-w-3xl">
          <DialogHeader>
            <DialogTitle className="text-2xl">{selectedNews?.title}</DialogTitle>
            <span className="text-sm text-sky-600">{selectedNews?.date}</span>
          </DialogHeader>

          {selectedNews && selectedNews.images && selectedNews.images.length > 0 && (
            <div className="relative mt-4 h-64 sm:h-80 md:h-96">
              <Image
                src={selectedNews.images[currentImageIndex] || "/placeholder.svg"}
                alt={selectedNews.title}
                fill
                className="object-cover rounded-md"
              />

              {selectedNews.images.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-1 rounded-full"
                    aria-label="Imagen anterior"
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-1 rounded-full"
                    aria-label="Imagen siguiente"
                  >
                    <ChevronRight className="h-5 w-5" />
                  </button>

                  <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
                    {selectedNews.images.map((_: string, index: number) => (
                      <button
                        key={index}
                        onClick={() => setCurrentImageIndex(index)}
                        className={`w-2 h-2 rounded-full ${index === currentImageIndex ? "bg-white" : "bg-white/50"}`}
                        aria-label={`Ir a imagen ${index + 1}`}
                      />
                    ))}
                  </div>
                </>
              )}
            </div>
          )}

          <div className="mt-4">
            <p className="text-gray-700">{selectedNews?.content}</p>
          </div>
        </DialogContent>
      </Dialog>
    </section>
  )
}
