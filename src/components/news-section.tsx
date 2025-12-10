"use client"

import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import { useNews } from "@/hooks"
import type { News } from "../../types"

interface NewsSectionProps {
  initialData: News[]
}

// Formatear fecha a formato legible
const formatDate = (dateStr: string): string => {
  try {
    const date = new Date(dateStr)
    return date.toLocaleDateString("es-HN", {
      day: "numeric",
      month: "long",
      year: "numeric",
    })
  } catch {
    return dateStr
  }
}

// Ordenar noticias por fecha descendente
const sortByDate = (news: News[]): News[] => {
  return [...news].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

export default function NewsSection({ initialData }: NewsSectionProps) {
  const { data: newsItems = [] } = useNews(initialData)

  // Ordenar y limitar a 5 noticias
  const sortedNews = sortByDate(newsItems).slice(0, 5)
  const [featuredNews, ...otherNews] = sortedNews

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

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Noticia destacada */}
          {featuredNews && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="lg:row-span-2"
            >
              <Link href={`/noticias/${featuredNews.id}`} className="group block h-full">
                <article className="bg-white rounded-lg shadow-lg overflow-hidden h-full flex flex-col">
                  <div className="relative aspect-video lg:aspect-auto lg:flex-1 lg:min-h-[300px]">
                    <Image
                      src={featuredNews.images?.[0] || "/placeholder.svg"}
                      alt={featuredNews.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                      <span className="text-sm text-sky-300">{formatDate(featuredNews.date)}</span>
                      <h3 className="text-2xl font-bold mt-2 group-hover:text-sky-300 transition-colors">
                        {featuredNews.title}
                      </h3>
                      <p className="mt-2 text-gray-200 line-clamp-2">{featuredNews.description}</p>
                      <span className="inline-flex items-center gap-1 mt-3 text-sky-300 font-medium">
                        Leer más <ArrowRight className="h-4 w-4" />
                      </span>
                    </div>
                  </div>
                </article>
              </Link>
            </motion.div>
          )}

          {/* Grid de noticias secundarias */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {otherNews.map((news, index) => (
              <motion.div
                key={news.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Link href={`/noticias/${news.id}`} className="group block">
                  <article className="bg-white rounded-lg shadow-lg overflow-hidden">
                    <div className="relative aspect-video">
                      <Image
                        src={news.images?.[0] || "/placeholder.svg"}
                        alt={news.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div className="p-4">
                      <span className="text-xs text-sky-600">{formatDate(news.date)}</span>
                      <h3 className="font-bold mt-1 line-clamp-2 group-hover:text-sky-600 transition-colors">
                        {news.title}
                      </h3>
                    </div>
                  </article>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Botón ver todas */}
        {newsItems.length > 5 && (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true }}
            className="text-center mt-8"
          >
            <Link
              href="/noticias"
              className="inline-flex items-center gap-2 px-6 py-3 bg-sky-600 text-white rounded-lg hover:bg-sky-700 transition-colors font-medium"
            >
              Ver todas las noticias <ArrowRight className="h-4 w-4" />
            </Link>
          </motion.div>
        )}
      </div>
    </section>
  )
}
